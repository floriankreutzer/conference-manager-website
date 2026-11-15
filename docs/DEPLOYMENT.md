# Conference Manager Website — Deployment

## 1. Scope

This document defines the repository-side deployment contract for the public Conference Manager website.

It implements the delivery foundation accepted in ADR 0003 / Confluence ADR-008. It does not declare the public website production-ready. DNS, actual Scaleway resource provisioning, Edge Services, TLS, legal/privacy acceptance, demo-processing operational acceptance and operational rollback evidence remain launch gates.

## 2. Build artifact

`Website CI` creates the static Astro `dist/` output only after the complete validation chain succeeds:

1. secret scan;
2. reproducible dependency install;
3. dependency vulnerability audit;
4. Astro/TypeScript checks;
5. lint and formatting checks;
6. unit/regression tests;
7. governed font asset verification;
8. production build;
9. static build performance budgets;
10. Chromium desktop/mobile browser and internal-route tests;
11. automated accessibility checks.

The validated output is uploaded as a short-lived GitHub Actions artifact named `website-static-<commit-sha>`.

The artifact is evidence and a handoff object. Production deployment still rebuilds from the selected source commit and reruns repository validation rather than trusting an arbitrary uploaded ZIP.

### GitHub Pages review

`GitHub Pages Review` publishes the accepted `main` source as a separate, non-indexable
review site. Its environment link points to the existing English entry at
`https://floriankreutzer.github.io/conference-manager-website/en/`; the German entry is
`https://floriankreutzer.github.io/conference-manager-website/de/`.

The website uses explicit language-prefixed routes and does not generate a page at the
project root. Review links must include `/en/` or `/de/`. This keeps the current locale
architecture and manual language choice intact. The eventual production-domain root
entry remains part of the real hosting acceptance under issue #24.

Pages review keeps `PUBLIC_PREVIEW=true`, the placeholder application handoff and the
inactive demo form. Its deployment is not production, Scaleway or mailbox acceptance.

## 3. Scaleway regions

The workflows allow only the currently approved EU Object Storage region identifiers:

- `fr-par`
- `nl-ams`
- `pl-waw`
- `it-mil`

Changing this allowlist requires architecture/security review. Do not turn the region into unrestricted caller input.

## 4. Pull-request previews

### Isolation model

Each same-repository PR receives a dedicated bucket:

`<SCW_PREVIEW_BUCKET_PREFIX>-<PR_NUMBER>`

A dedicated bucket is used instead of a shared object prefix because the website intentionally uses root-relative localized URLs. A prefix-only preview would not provide a truthful navigation test without changing the website routing contract.

Preview buckets:

- are separate from the production bucket;
- are built with `PUBLIC_PREVIEW=true`;
- render `noindex, nofollow` metadata;
- render a blocking `robots.txt`;
- do not expose indexable URLs in the sitemap;
- are removed on PR close;
- must use preview-only credentials and must not receive production secrets.

Fork PRs do not run the credentialed preview deployment job.

### Required repository configuration

GitHub repository variables:

- `SCW_REGION`
- `SCW_PREVIEW_BUCKET_PREFIX`
- `PREVIEW_CM_APP_ORIGIN` — optional until a real preview application handoff is approved

GitHub repository/environment secrets for previews:

- `SCW_OBJECT_STORAGE_ACCESS_KEY`
- `SCW_OBJECT_STORAGE_SECRET_KEY`

Do not store these values in source, workflow literals, `.env` files committed to Git, PR comments, or documentation.

### Preview IAM scope

Use a dedicated Scaleway IAM application for website previews. Grant only the Object Storage permissions needed to:

- create and inspect preview buckets;
- configure the bucket website;
- apply the public-read object policy required for the static preview;
- write/list/delete preview objects;
- delete preview buckets.

Do not reuse production credentials. Scope the IAM application to the intended project/resources as tightly as the selected Scaleway policy model permits.

### Delivered preview acceptance

After Object Storage synchronization, the workflow verifies the actual public preview URL instead of treating upload success as deployment success.

The delivered preview must prove:

- HTTPS origin;
- the rendered English page references the expected preview canonical origin;
- `noindex` is present in page metadata;
- `/robots.txt` blocks all crawling;
- `/sitemap.xml` exposes no indexable URL records.

The workflow retries briefly for infrastructure propagation and fails if the delivered response still violates the contract. Only after this check is successful is the preview URL treated as a usable preview.

## 5. Preview cleanup

`Website Preview Cleanup` runs when a PR is closed. It derives the bucket name only from the governed prefix and immutable PR number and removes that bucket with its objects.

Cleanup is intentionally separate from production deployment and never references the production bucket variable.

Periodic orphan-bucket review remains an operational control in case a workflow is disabled or infrastructure is changed outside GitHub.

Real cleanup against a provisioned Scaleway PR-preview bucket remains required acceptance evidence under issue #24.

## 6. Production deployment foundation

Production deployment is deliberately manual through `workflow_dispatch` and the GitHub `production` environment. Merging to `main` updates the separate Pages review site; it does not publish the production website.

Required production configuration:

GitHub environment variables:

- `SCW_REGION`
- `SCW_PRODUCTION_BUCKET`
- `PUBLIC_SITE_ORIGIN`
- `PUBLIC_CM_APP_ORIGIN`
- `PUBLIC_LEGAL_NOTICE_URL_EN` and `PUBLIC_LEGAL_NOTICE_URL_DE`
- `PUBLIC_PRIVACY_URL_EN` and `PUBLIC_PRIVACY_URL_DE`
- `PUBLIC_CONTACT_URL_EN` and `PUBLIC_CONTACT_URL_DE`
- `PUBLIC_DEMO_REQUEST_ENDPOINT` — only after demo processing acceptance
- `PUBLIC_DEMO_PRIVACY_URL` — only after legal/privacy acceptance

GitHub environment secrets:

- `SCW_PRODUCTION_OBJECT_STORAGE_ACCESS_KEY`
- `SCW_PRODUCTION_OBJECT_STORAGE_SECRET_KEY`

The production bucket must be pre-provisioned. The production workflow is intentionally not allowed to create or delete it.

Use GitHub environment protection/approval for `production` before enabling a public release process.

`PUBLIC_SITE_ORIGIN` is the final public HTTPS/Edge origin used by visitors and search engines. It must not be an arbitrary path URL. The workflow logs the underlying Object Storage website origin separately but validates the delivered public origin.

### Public information destinations

The footer accepts three fixed categories of approved public information: legal notice,
website privacy information and a contact page. Each has an explicit English and German
HTTPS destination using the six environment variables above. Do not infer operator names,
postal addresses, mailboxes, translations or legal text from infrastructure or brand assets.

Every configured destination must be a clean HTTPS URL without credentials, query parameters
or fragments. The central layout uses the existing SEO indexability decision: an indexable
build fails before publication when any of the six values is missing or invalid. Preview and
development builds may omit values; they render only configured destinations and no empty
information navigation. GitHub Pages remains a non-indexable review deployment.

Configuration completeness is a technical minimum, not legal or operational acceptance.
Before production, verify that each destination is reachable, contains the approved content
in the stated language, and that the contact route is monitored. Retain the existing
legal/privacy and production-environment approval gates. Do not publish placeholder URLs.

`PUBLIC_DEMO_PRIVACY_URL` remains the separate, purpose-specific notice for demo requests.
General footer links neither supply that value implicitly nor activate the demo endpoint.
The isolated browser-test build uses synthetic information URLs under `test-results/`;
those fixtures must not be uploaded as the public site.

## 7. Delivered production acceptance

A successful Object Storage sync is **not** a successful production deployment.

After synchronization, the workflow fetches the delivered public origin and fails unless the actual responses satisfy the publication and security contract.

Required publication checks:

- `/en/` is reachable over the configured HTTPS origin;
- the rendered page references the configured canonical origin;
- production contains no `noindex` directive;
- `/robots.txt` allows crawling and references the production sitemap;
- `/sitemap.xml` contains both `/en/` and `/de/` public routes.

Required delivered security headers on the public page:

- One unambiguous `Content-Security-Policy`, with no duplicate directives:
  - `default-src` restricted to `'self'` or `'none'`;
  - `object-src 'none'`;
  - explicit `base-uri` and `frame-ancestors`, each restricted to `'self'` or `'none'`;
  - effective script/style sources (including `-elem`, `-attr` and their fallbacks)
    restricted to same-origin assets, `'none'`, or explicit hash/nonce sources;
  - no wildcard sources, insecure HTTP sources, broad scheme-only sources (including
    `ws:`, `wss:` and custom schemes) or unsafe execution allowances such as
    `'unsafe-inline'` or `'unsafe-eval'`.
- `Strict-Transport-Security` with one valid, positive integer `max-age`; zero,
  malformed and duplicate values fail. The operational duration remains a deployment
  decision; this check does not invent a new minimum duration or require preload.
- `Referrer-Policy` set to `no-referrer`, `same-origin`, `strict-origin` or
  `strict-origin-when-cross-origin`;
- `Permissions-Policy` explicitly denying camera, microphone and geolocation with
  empty allowlists. The complete header must use the supported [RFC 8941 dictionary](https://www.rfc-editor.org/rfc/rfc8941.html#section-3.2)
  subset: lowercase keys, no whitespace around `=`, and parenthesized lists of
  `self` or correctly quoted/escaped structured strings. Duplicate keys, malformed
  additional directives, unsupported item types and parameters fail closed;
- `X-Content-Type-Options: nosniff`.

The script checks effective restrictions rather than the mere presence of header names
or substrings. It does not provision headers or prescribe one large hardcoded CSP.
Exact permitted non-execution sources, including the accepted form endpoint, remain
a deployment/security decision and must stay as restrictive as the real website allows.
New third-party script/style origins require an approved architecture/security change
and an explicit update of this acceptance contract. Hashes/nonces still require the
documented justification and actual runtime evidence; a syntactically allowed source
does not by itself prove correct delivery or secure nonce generation.

The Permissions-Policy check validates the complete supported syntax before trusting
any required denial: [response processing](https://w3c.github.io/webappsec-permissions-policy/#process-response-policy)
discards the policy when the structured-field value cannot be parsed.
Additional capability allowlists still require deployment/security review; this syntax
check does not approve their sources. Other valid structured-field forms, including
reporting parameters, require an explicit contract extension before deployment.

The check retries briefly for edge/cache propagation and then fails closed. A production job that uploaded files but cannot prove the delivered public contract is failed and must not be treated as accepted release evidence.

### Delivered experience acceptance

`Delivered Experience Acceptance` is a separate manual `workflow_dispatch` workflow bound to the protected `production` environment. It consumes only the public `PUBLIC_SITE_ORIGIN`; it does not receive Object Storage, Edge or other Scaleway credentials.

Run it after the real public HTTPS origin is available and the delivered production contract has passed. It launches Chromium against the delivered pages and verifies:

- three cold browser-context samples for `/en/`, with median lab LCP at or below 2.5 seconds;
- cumulative layout shift at or below 0.1 on representative `/en/` and `/de/` routes;
- delivered font requests remain same-origin;
- 200% browser-zoom-equivalent reflow in a 640 CSS-pixel viewport keeps the primary heading and demo action visible without page-level horizontal overflow.

The reflow check uses the same responsive width as the repository browser regression: 640 CSS pixels correspond to a 1280-pixel window at 200% zoom. It does not change or verify the browser's actual tab-zoom setting.

The workflow records EN, DE and 200%-equivalent reflow screenshots as 14-day GitHub Actions artifacts for final human visual review.

These measurements are controlled lab evidence from the GitHub-hosted runner. They must not be presented as real-user/field Core Web Vitals. Field data, if later collected through an approved privacy-compatible mechanism, is a different evidence source and requires its own governance decision.

## 8. Demo-request boundary

The browser may only receive the public HTTPS demo-processing endpoint and public privacy URL.

The following remain server-side/deployment secrets and must never be committed to this repository or exposed to browser code:

- functional mailbox recipient;
- transactional-email credentials;
- server-side anti-abuse configuration where sensitive;
- provider API secrets.

The form remains fail-closed until both public endpoint and privacy URL are configured.

The repository-owned serverless processing baseline lives under `functions/demo-request/`. Its existence does not activate the form or constitute operational acceptance; issue #25 owns real function/email/privacy/rate-limit evidence.

## 9. Production launch acceptance

Before public launch, verify and retain evidence for:

- approved EU resource locations;
- final domain ownership and DNS;
- Edge Services/custom-domain/TLS behavior;
- successful delivered-response acceptance from the production workflow;
- successful delivered-experience acceptance and screenshot review;
- cache behavior and invalidation/redeployment;
- preview credentials cannot overwrite production;
- preview cleanup works against an actual PR;
- production environment approval/protection;
- rollback/redeployment procedure;
- demo request validation, rate limiting, logging and email-delivery failure behavior;
- no analytics/tracking unless separately approved;
- privacy notice and retention/access ownership;
- approved, reachable English and German legal-notice, website-privacy and contact destinations;
- governed self-hosted font provenance and licensing;
- manual accessibility acceptance in addition to automated Axe and 200% reflow checks.

## 10. Operational rollback

Until a versioned release strategy is introduced, rollback is a controlled redeployment of a known-good repository commit through the same production workflow. Do not manually edit production objects as a substitute for source-controlled rollback.

A rollback is not complete merely because Object Storage accepted the sync. The same delivered production contract must pass after rollback.

A future deployment mechanism may replace Object Storage sync only through an architecture decision that preserves EU hosting, preview isolation, least privilege, noindex behavior, auditability, delivered-response verification, and the application/website security boundary.
