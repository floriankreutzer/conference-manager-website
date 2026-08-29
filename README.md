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

## Current implementation

The accepted implementation baseline is:

- Astro + TypeScript;
- static-first rendering with minimal browser JavaScript;
- complete English/German route architecture;
- repository-owned content and Astro Content Collections for Insights;
- Scaleway-oriented preview/production delivery automation;
- a separate server-side demo-request function boundary;
- required CI, dependency audit, secret scanning, CodeQL, browser/accessibility and performance gates.

Production readiness is **not** yet claimed. Real Scaleway infrastructure, final Edge/TLS/DNS evidence, demo-processing operational acceptance, privacy/retention acceptance and governed production font assets remain external release gates.

## Repository structure

The repository is organized by responsibility and trust boundary:

- `src/pages/` — filesystem routes and route composition only;
- `src/layouts/` — page-level composition/layout contracts;
- `src/components/` — reusable presentation components;
- `src/features/` — bounded website use cases;
- `src/domain/` — framework-independent rules;
- `src/config/` and `src/i18n/` — configuration and localized content contracts;
- `functions/` — public server-side trust boundaries with additional local agent instructions;
- `scripts/deployment/` — delivered-site acceptance tooling;
- `scripts/performance/` — deterministic performance tooling;
- `e2e/` — browser-level public journey tests.

See `docs/REPOSITORY-STRUCTURE.md` for placement and dependency-direction rules.

## Mandatory contributor/agent reading

Start with:
1. `AGENTS.md`
2. `docs/CODING-STANDARDS.md`
3. `docs/ARCHITECTURE.md`

Then read the standards relevant to the change:
- `docs/REPOSITORY-STRUCTURE.md`
- `docs/DESIGN-SYSTEM.md`
- `docs/SEO-STANDARDS.md`
- `docs/SECURITY.md`
- `docs/CONTENT-GOVERNANCE.md`
- `docs/adr/`
- the nearest nested `AGENTS.md`, if present

## Development and validation

```bash
npm ci --ignore-scripts
npm run check
npm run lint
npm run format:check
npm test
npm run build
npm run test:performance
npm run test:e2e
```

CI additionally performs secret scanning, dependency vulnerability review and CodeQL/security analysis.

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
