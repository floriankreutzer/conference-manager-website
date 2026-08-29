# Conference Manager Website — Deployment

## 1. Scope

This document defines the repository-side deployment contract for the public Conference Manager website.

It implements the delivery foundation accepted in ADR 0003. It does not declare the public website production-ready. DNS, Edge Services, TLS, security headers, legal/privacy acceptance, demo-processing acceptance, and operational rollback evidence remain launch gates.

## 2. Build artifact

`Website CI` creates the static Astro `dist/` output only after the complete validation chain succeeds:

1. secret scan;
2. reproducible dependency install;
3. dependency vulnerability audit;
4. Astro/TypeScript checks;
5. unit/regression tests;
6. production build;
7. Chromium desktop/mobile browser tests;
8. automated accessibility checks.

The validated output is uploaded as a short-lived GitHub Actions artifact named `website-static-<commit-sha>`.

The artifact is evidence and a handoff object. Production deployment still rebuilds from the selected source commit and reruns repository validation rather than trusting an arbitrary uploaded ZIP.

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

The preview URL is written to the GitHub Actions job summary after a configured deployment.

## 5. Preview cleanup

`Website Preview Cleanup` runs when a PR is closed. It derives the bucket name only from the governed prefix and immutable PR number and removes that bucket with its objects.

Cleanup is intentionally separate from production deployment and never references the production bucket variable.

Periodic orphan-bucket review remains an operational control in case a workflow is disabled or infrastructure is changed outside GitHub.

## 6. Production deployment foundation

Production deployment is deliberately manual through `workflow_dispatch` and the GitHub `production` environment. Merging to `main` does not publish the website.

Required production configuration:

GitHub environment variables:

- `SCW_REGION`
- `SCW_PRODUCTION_BUCKET`
- `PUBLIC_SITE_ORIGIN`
- `PUBLIC_CM_APP_ORIGIN`
- `PUBLIC_DEMO_REQUEST_ENDPOINT` — only after demo processing acceptance
- `PUBLIC_DEMO_PRIVACY_URL` — only after legal/privacy acceptance

GitHub environment secrets:

- `SCW_PRODUCTION_OBJECT_STORAGE_ACCESS_KEY`
- `SCW_PRODUCTION_OBJECT_STORAGE_SECRET_KEY`

The production bucket must be pre-provisioned. The production workflow is intentionally not allowed to create or delete it.

Use GitHub environment protection/approval for `production` before enabling a public release process.

## 7. Demo-request boundary

The browser may only receive the public HTTPS demo-processing endpoint and public privacy URL.

The following remain server-side/deployment secrets and must never be committed to this repository or exposed to browser code:

- functional mailbox recipient;
- transactional-email credentials;
- server-side anti-abuse configuration where sensitive;
- provider API secrets.

The form remains fail-closed until both public endpoint and privacy URL are configured.

## 8. Production launch acceptance

A successful Object Storage sync is not production acceptance.

Before public launch, verify and retain evidence for:

- approved EU resource locations;
- final domain ownership and DNS;
- Edge Services/custom-domain/TLS behavior;
- CSP and required HTTP security headers at the delivered edge;
- cache behavior and invalidation/redeployment;
- preview credentials cannot overwrite production;
- preview cleanup works against an actual PR;
- production environment approval/protection;
- rollback/redeployment procedure;
- demo request validation, rate limiting, logging and email-delivery failure behavior;
- no analytics/tracking unless separately approved;
- privacy notice and retention/access ownership;
- self-hosted font provenance and licensing;
- manual accessibility acceptance in addition to automated Axe checks.

## 9. Operational rollback

Until a versioned release strategy is introduced, rollback is a controlled redeployment of a known-good repository commit through the same production workflow. Do not manually edit production objects as a substitute for source-controlled rollback.

A future deployment mechanism may replace Object Storage sync only through an architecture decision that preserves EU hosting, preview isolation, least privilege, noindex behavior, auditability, and the application/website security boundary.
