# ADR 0003 — EU Hosting, Preview Environments and Demo-Request Processing

- **Status:** Accepted
- **Date:** 2026-08-29

## Context

The public website requires:

- EU-only hosting as a hard requirement;
- static Astro delivery;
- pull-request preview environments;
- TLS, custom domains and security headers;
- no analytics/tracking at launch;
- a first-party `Book a demo` form;
- no CMS and no CRM in the current phase;
- future CRM extensibility without changing the public form contract;
- strict separation from the authenticated Conference Manager application/API boundary.

Current vendor evaluation focused on Scaleway, OVHcloud and Hetzner. Scaleway currently provides a directly documented combination of static website hosting on Object Storage, Astro deployment through GitHub Actions, Edge Services for custom-domain/TLS/cache/WAF, EU Serverless Functions, and Transactional Email. This reduces platform sprawl for the initial website while keeping the application/API repositories independent.

## Decision

Use **Scaleway as the initial EU hosting platform for the public website**, subject to actual environment provisioning and operational acceptance before public launch.

### Production website

Target delivery path:

```text
Public visitor
   |
   v
Scaleway Edge Services
TLS / custom domain / cache / security edge controls
   |
   v
Scaleway Object Storage
Astro static build output
```

The production bucket must be located in an approved EU Scaleway region.

The public domain remains configurable and must not hardcode an uncleared corporate brand into application logic. The expected long-term shape may be `www.<approved-brand-domain>` for the public site and `app.<approved-brand-domain>` for the product application, but final domain activation remains a legal/domain decision.

### Pull-request previews

GitHub Actions creates isolated preview deployments for pull requests.

Preview design requirements:

- deterministic preview identifier derived from PR number and/or immutable commit SHA;
- isolated object path or bucket so preview changes cannot overwrite production;
- no production secrets;
- no production demo-recipient address where avoidable;
- `noindex, nofollow` and equivalent robots controls;
- visible non-production indication where useful;
- cleanup after PR close/merge;
- preview URL published to the PR when automation supports it;
- deployment credentials scoped to the minimum required resources.

A later dedicated preview platform may replace this mechanism only through a new architecture decision.

### Demo-request form

The website owns the public form presentation but not privileged processing in browser code.

Target processing path:

```text
Astro public form
   |
   | HTTPS POST
   v
Scaleway Serverless Function
public unauthenticated processing boundary
   |
   +-- server-side schema validation
   +-- normalization / length limits
   +-- anti-abuse / rate controls
   +-- safe logging / correlation
   +-- privacy minimization
   |
   v
Scaleway Transactional Email
   |
   v
Approved business recipient mailbox
```

No lead database or CRM is introduced in phase 1.

A future CRM integration must sit behind the server-side demo-request processing contract so the browser form does not become coupled to a CRM vendor.

### Initial form fields

Collect only:

- first name;
- last name;
- business email;
- company;
- company size/range;
- optional message;
- explicit privacy acknowledgement/consent UI as legally appropriate for the final processing purpose.

Do not collect a telephone number in the initial form.

### Form security

The processing function must implement, at minimum:

- explicit allowlisted HTTP method;
- strict content type and maximum request size;
- positive schema validation;
- per-field length and format limits;
- email normalization/validation appropriate to lead processing;
- generic public error responses;
- no reflection of untrusted submitted HTML;
- no secrets in browser code;
- rate limiting/anti-automation proportionate to the real launch threat model;
- honeypot or equivalent low-friction bot signal where appropriate;
- no third-party CAPTCHA by default;
- safe timeout/retry semantics for email delivery;
- structured operational logs without unnecessary message/body or personal-data logging.

A third-party anti-bot service requires a separate privacy/security review and must not be introduced silently.

### Data retention

The initial implementation does not create a separate application database for demo leads.

Before public launch, document:

- approved recipient mailbox;
- processing purpose and privacy notice;
- retention expectation for received lead emails;
- access ownership;
- handling/deletion process;
- Transactional Email metadata/log retention relevant to the chosen configuration.

### Analytics and tracking

No analytics, tag manager, session replay, advertising pixel or equivalent tracking is loaded at initial launch.

Operational infrastructure logs needed for security/reliability are not product analytics and must follow data-minimization rules.

## Alternatives considered

### OVHcloud

OVHcloud remains a credible EU infrastructure provider and may remain relevant to the broader Conference Manager cloud decision. For this public-site decision, the currently verified documentation was less direct for the complete static-Astro + preview + first-party serverless-email workflow. Avoid selecting it merely to force website/application provider uniformity before the broader cloud ADR is final.

### Hetzner Object Storage

Not selected for the initial website architecture. Hetzner explicitly positions Object Storage primarily as storage and recommends a separate CDN for large public static delivery, which would add another provider/integration layer for the public site.

### Vercel / Netlify / Cloudflare Pages

Not selected because the user requires EU-only hosting and the current architecture should not depend on a globally distributed platform whose processing/cache/control-plane implications would need a separate sovereignty assessment.

### External form SaaS / CRM form

Not selected for phase 1 because it adds tracking/privacy/supply-chain/vendor coupling that is unnecessary for the initial demo-request requirement.

## Consequences

### Positive

- EU-focused public website platform;
- static hosting and form compute remain separated but within one provider;
- low operational footprint;
- no CMS/CRM/tracking vendor required at launch;
- first-party form contract remains portable;
- preview environments fit the GitHub PR workflow;
- authenticated Conference Manager application/API remain untouched.

### Costs / risks

- PR previews require custom GitHub Actions automation rather than a turnkey Vercel-style preview service;
- Edge/WAF/header capabilities must be verified in the actually provisioned Scaleway plan before launch;
- strict EU-only interpretation must be revalidated for every enabled Scaleway service/region and any future edge feature;
- transactional email and public function abuse controls require operational monitoring;
- provider credentials and cleanup automation become deployment responsibilities.

## Operational acceptance before launch

Do not mark hosting production-ready until evidence confirms:

- resources are deployed in approved EU regions;
- TLS/custom-domain behavior works;
- security headers/CSP are actually delivered and tested;
- production bucket cannot be overwritten by preview credentials;
- preview URLs are noindex and cleaned up;
- GitHub Actions use least-privilege credentials;
- form endpoint rejects malformed/oversized/automated abuse cases as designed;
- email delivery and failure behavior are tested;
- no tracking scripts are present;
- logs do not expose unnecessary personal data;
- rollback/redeployment procedure is documented and tested.

## Related

- ADR 0001 — Separate Public Website and Application Boundary
- ADR 0002 — Astro + TypeScript, Static-First Website Architecture
- `docs/SECURITY.md`
- `docs/ARCHITECTURE.md`
