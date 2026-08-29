# ADR 0001 — Separate Public Website and Application Boundary

- **Status:** Accepted
- **Date:** 2026-08-29

## Context

Conference Manager requires a public marketing website for product discovery, SEO, brand communication, trust information, and demo conversion. Existing users must also be able to start the login journey from that public website.

The authenticated Conference Manager product already has separate frontend and backend repositories with explicit application/session/security boundaries. Combining public marketing and authenticated application concerns would couple different release, SEO, content, security, and UX responsibilities.

## Decision

The public website is implemented in the dedicated repository:

`floriankreutzer/conference-manager-website`

The authenticated application remains in:

`floriankreutzer/conference-manager`

The trusted backend remains in:

`floriankreutzer/conference-manager-api`

The public website is an unauthenticated surface. Its `Login` / `Sign in` control performs a standard HTTPS navigation to a centrally configured Conference Manager application origin.

Authentication begins only within the application-owned authentication flow. The public website does not own OIDC/Entra logic, tenant authorization, access/refresh tokens, application session cookies, or trusted API authorization.

## Consequences

### Positive

- clear security/trust boundary;
- independent marketing and application release cycles;
- website can optimize for SEO, performance, content, and conversion without changing app runtime architecture;
- application can remain optimized for authenticated operational workflows;
- public website failure does not become part of the trusted app/API path;
- corporate-brand implementation can evolve without coupling authenticated product internals.

### Costs

- separate repository and CI/deployment lifecycle;
- brand/design alignment must be governed across repositories;
- cross-origin login handoff and future deep-link contracts require explicit coordination;
- duplicated raw brand assets must be avoided or intentionally governed.

## Security constraints

The website must not:

- store application authentication tokens;
- read/write application session state across origins;
- proxy authenticated application/API traffic;
- embed the authenticated application in an iframe;
- accept arbitrary redirect origins for login handoff;
- expose secrets in public client configuration.

## Domain note

No production domain or subdomain is fixed by this ADR. The future site/application domain model must be documented separately once legal/domain/hosting decisions are complete.

## Related governance

- root `AGENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/SECURITY.md`
- `docs/CONTENT-GOVERNANCE.md`
