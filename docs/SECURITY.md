# Conference Manager Website — Security Baseline

## 1. Trust model

The public website is an unauthenticated, internet-facing surface. Browser state in this repository is never trusted authority for Conference Manager application access.

The authenticated trust boundary remains:

- Conference Manager application for application UX/session initiation;
- Conference Manager API / identity infrastructure for authoritative authentication and authorization.

The website must not weaken or duplicate those boundaries.

## 2. Login handoff

`Login` / `Sign in` is a normal HTTPS navigation to a centrally configured, allowlisted Conference Manager application origin.

Prohibited:

- implementing OIDC/Entra authorization here by default;
- storing access/refresh tokens;
- sharing application session cookies;
- placing tokens/secrets in query strings or fragments;
- accepting arbitrary redirect origins;
- embedding the authenticated application in an iframe;
- proxying authenticated app/API traffic through the marketing site.

Any future deep-link or locale/campaign handoff parameters require a documented cross-repository contract and validation.

## 3. Security headers

Production deployment must define and test appropriate headers, including as applicable:

- `Content-Security-Policy`;
- `Strict-Transport-Security`;
- `Referrer-Policy`;
- `Permissions-Policy`;
- `X-Content-Type-Options: nosniff`;
- clickjacking protection through CSP `frame-ancestors` and compatible deployment settings.

Prefer a restrictive CSP. Do not weaken it broadly to accommodate a third-party script without documenting the trade-off.

## 4. Content Security Policy direction

Start from deny-by-default and add only required sources.

Prefer:

- same-origin scripts/styles/assets;
- nonces/hashes or framework-supported safe CSP patterns where inline execution cannot be removed;
- `object-src 'none'`;
- restrictive `base-uri`;
- restrictive `frame-ancestors`;
- explicit `connect-src`, `img-src`, `font-src`, `form-action`, and `frame-src` based on approved integrations.

Do not use broad wildcard hosts or `unsafe-eval`. Avoid `unsafe-inline` unless a documented implementation constraint and safer mitigation justify it.

## 5. Third-party scripts and embeds

Third-party browser code is deny-by-default.

Before adding analytics, tag managers, video embeds, chat, maps, A/B testing, session replay, social widgets, consent tools, or similar services, document:

- business purpose;
- exact domains/resources loaded;
- data collected/transmitted;
- consent/privacy requirements;
- CSP changes;
- supply-chain exposure;
- performance cost;
- failure behavior;
- removal strategy.

Prefer privacy-enhanced/static placeholders and user-initiated loading for non-essential embeds.

## 6. Forms and public APIs

Public forms are hostile-input boundaries.

Requirements:

- server-side validation at the trusted processing endpoint;
- strict input length/type validation;
- output encoding;
- anti-automation/rate limiting proportionate to risk;
- CSRF assessment based on the selected submission architecture;
- avoid reflecting submitted content unsafely;
- generic user-facing errors without internal implementation leakage;
- no privileged static API keys in browser code;
- explicit data minimization and retention ownership.

Client-side validation is UX only, never a security control.

## 7. XSS and injection prevention

- Treat CMS, form, query-string, API, and external content as untrusted.
- Prefer framework/template escaping and safe DOM APIs.
- Do not inject untrusted strings into HTML, script, style, URL, or attribute contexts without correct contextual handling.
- Avoid dynamic code execution.
- Sanitize rich text only through an approved, well-maintained approach if rich content becomes necessary.

## 8. URL and redirect safety

- Use a fixed/allowlisted Conference Manager application origin for login handoff.
- Never navigate to an arbitrary `returnUrl`, `redirect`, or host supplied by a visitor without strict validation.
- Avoid open redirects.
- Normalize internal URLs through the selected routing/build system.
- Ensure external links do not accidentally leak sensitive query data.

## 9. Secrets and configuration

Public/browser-exposed configuration is not secret.

Never ship:

- API secrets;
- private keys;
- OAuth client secrets;
- service credentials;
- privileged tokens;
- internal-only credentials.

Use deployment/secret stores for server-side secret material. Enable secret scanning in CI/repository security settings.

## 10. Dependency and supply-chain security

Once a stack exists:

- commit the ecosystem lockfile;
- use reproducible installs where supported;
- review new dependencies for necessity, maintenance, license, and vulnerabilities;
- enable dependency update/security alerts where available;
- run dependency audit in CI;
- keep CodeQL/SAST appropriate to the selected languages;
- do not blindly suppress security findings.

## 11. File and asset handling

If uploads are ever introduced, design them as a separate hostile-input boundary with file type/size validation, malware considerations, non-executable storage, randomized identifiers, and safe serving headers.

The initial public website should not require user file uploads.

## 12. Privacy and logging

Collect and log the minimum necessary information.

Do not log:

- access tokens;
- secrets;
- session identifiers;
- unnecessary personal form content;
- authentication artifacts from the application handoff.

Define retention and access control for lead/contact data before launch.

## 13. Environment separation

Development/preview/staging/production configuration must not silently reuse production secrets or endpoints.

Preview/staging environments must:

- avoid accidental search indexing;
- not expose confidential content;
- use safe non-production integration configuration where possible.

## 14. Security testing

Applicable checks should include:

- CodeQL/SAST;
- dependency vulnerability scanning;
- secret scanning;
- CSP/security-header validation;
- automated tests for redirect/login handoff allowlisting;
- negative form/input tests;
- XSS/open-redirect regression tests where relevant;
- browser E2E for security-relevant navigation contracts.

Before production launch perform a targeted manual security review of the public surface and deployment headers.

## 15. Incident readiness

Before public production launch document:

- responsible contact for security issues;
- dependency/security update path;
- rollback/deployment process;
- handling of compromised third-party integrations;
- whether a public `security.txt` is appropriate and what verified contact it may contain.

Do not publish placeholder security contacts.
