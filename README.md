# Conference Manager Website

Public marketing website for **Conference Manager**.

## Repository responsibility

This repository owns the public, unauthenticated Conference Manager website: product information, brand presentation, SEO, trust content, demo/contact conversion, and the public entry point to the authenticated product.

It does **not** own Conference Manager application authentication, tenant authorization, application sessions, or business workflows.

Related authoritative repositories:

- `floriankreutzer/conference-manager` — authenticated Conference Manager browser application
- `floriankreutzer/conference-manager-api` — trusted backend/API

## Login boundary

The website provides a `Login` / `Sign in` action that performs a normal HTTPS handoff to the configured Conference Manager application origin.

Authentication starts in the application-owned flow. This repository must not store application tokens, share application session cookies, or implement a parallel Entra/OIDC flow.

See `docs/adr/0001-public-website-boundary.md`.

## Current status

**Governance and architecture bootstrap.**

No production website implementation stack has been approved yet. Framework, hosting/runtime, localization routing, forms, analytics/consent, and other material platform choices require explicit architecture decisions before implementation.

## Mandatory contributor/agent reading

Start with:

1. `AGENTS.md`
2. `docs/CODING-STANDARDS.md`
3. `docs/ARCHITECTURE.md`

Then read the standards relevant to the change:

- `docs/DESIGN-SYSTEM.md`
- `docs/SEO-STANDARDS.md`
- `docs/SECURITY.md`
- `docs/CONTENT-GOVERNANCE.md`
- `docs/adr/`

## Product and brand baseline

The official product name remains **Conference Manager**.

Current strategic corporate-brand state:

- **PAVUREL** — preferred candidate, legal clearance pending
- **SAVELUN** — reserve candidate, legal clearance pending

The public website must verify concrete product/security/integration claims against current authoritative product implementation and documentation before publication.

## Quality baseline

The website is expected to be:

- secure and privacy-aware by default;
- WCAG 2.2 AA-oriented;
- responsive/mobile-first;
- English/German capable from launch architecture;
- SEO/indexability-first;
- performant with minimal client JavaScript;
- evidence-based in public claims;
- governed through pull requests and CI.

Implementation/build/test commands will be documented after the web stack is selected through an ADR.
