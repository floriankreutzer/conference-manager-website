# ADR 0002 — Astro + TypeScript, Static-First Website Architecture

- **Status:** Accepted
- **Date:** 2026-08-29

## Context

The public Conference Manager website is primarily a marketing, SEO, trust, product-information, Insights and conversion surface. It must support German and English, strong first-load indexability, low JavaScript cost, future interactive pricing, a demo-request form, and modular long-term evolution without becoming a second SaaS application.

The user requirements confirmed for this decision are:

- static-first public website;
- no CMS for the current phase;
- balanced emphasis on SEO/performance and future flexibility;
- complete German and English support;
- future public demo-request form;
- future Insights section;
- future interactive pricing calculator;
- no analytics/tracking at launch;
- EU-only hosting requirement;
- pull-request preview environments;
- modern technology stack;
- explicit modular architecture.

The repository governance requires static/server-rendered content, progressive enhancement, low client-JavaScript cost, explicit dependency ownership and an ADR before selecting a framework.

## Decision

Use **Astro with TypeScript** as the website implementation stack.

The website is **static-first**. Public indexable pages are generated as HTML at build time wherever practical. Client-side JavaScript is introduced only for bounded interactive features that require it.

Use Astro's island architecture for interactive features such as:

- pricing calculator;
- mobile navigation where native HTML/CSS is insufficient;
- enhanced demo-request form behavior;
- other deliberately approved interactive components.

Do not turn the website into a general SPA.

### Language routing

Use explicit locale-prefixed routes for both launch languages:

- `/en/...`
- `/de/...`

The default locale is also prefixed. This keeps locale routing deterministic and makes canonical/hreflang relationships explicit.

Do not implement geo-IP redirects. Browser-language detection may be used only as a non-destructive first-visit suggestion or redirect policy if it remains predictable, accessible and SEO-safe. Manual language selection must always remain available.

### Content model

Use repository-owned content for the current phase; no CMS is introduced.

Use Astro Content Collections where structured content provides value, especially for:

- Insights;
- integration pages;
- reusable content records with metadata/schema validation;
- future resource content.

Strategic homepage/product copy may remain in typed/localized content modules when that is clearer than forcing all content into collections.

### Modular source architecture

Adopt responsibility-oriented modules rather than arbitrary file-size decomposition.

Target structure:

```text
src/
├── pages/                     # route composition only
│   ├── en/
│   └── de/
├── layouts/                   # page-level layout contracts
├── components/                # reusable presentation components
│   ├── navigation/
│   ├── hero/
│   ├── sections/
│   ├── forms/
│   ├── pricing/
│   └── shared/
├── features/                  # bounded interactive/use-case features
│   ├── demo-request/
│   ├── pricing-calculator/
│   ├── language-switcher/
│   └── login-handoff/
├── domain/                    # independently testable business/domain rules
│   ├── pricing/
│   └── forms/
├── content/                   # Astro content collections/content records
├── i18n/                      # locale contracts and translation/content access
├── config/                    # typed public/runtime configuration
│   ├── application.ts
│   ├── brand.ts
│   ├── locales.ts
│   └── routes.ts
├── styles/                    # global tokens/foundations only
│   ├── tokens.css
│   └── global.css
└── assets/                    # governed source assets where appropriate
```

Rules:

- `pages` compose routes; significant business rules do not belong there.
- `components` are presentation-oriented and do not become application-service containers.
- `features` own bounded website behavior and may compose presentation + domain contracts.
- `domain` contains testable rules independent of Astro/browser rendering where practical.
- `config` centralizes approved public configuration such as application login origin and route definitions.
- do not create generic `utils`, `helpers`, `misc` or `common` dumping grounds;
- cross-feature reuse requires a stable shared meaning before promotion to shared components/contracts;
- no direct dependency on `conference-manager` application internals.

### Pricing architecture

The website architecture may implement a testable pricing-calculation domain and interactive calculator UI.

However, public monetary values must remain disabled/unpublished until the pricing model is explicitly approved and validated. The architecture must separate:

- pricing rules/model;
- locale/currency formatting;
- calculator presentation;
- publication/feature configuration.

Do not invent or infer commercial prices from incomplete Confluence material.

### Login handoff

The login feature remains ordinary HTTPS navigation to a centrally configured, allowlisted application origin as defined by ADR 0001. Astro does not own authentication.

## Alternatives considered

### Next.js

Rejected for the current public-site boundary because it introduces a React/full-stack application model that is broader than required for a primarily static marketing/content surface. It remains technically capable, but would increase runtime/framework surface and encourage application-style client/server patterns that belong in `conference-manager` / `conference-manager-api`.

### Plain static HTML/CSS/JavaScript

Rejected as the primary architecture because the website requires structured bilingual routing, growing Insights/content, reusable layouts/components, typed content and future bounded interactive features. A modern static-site framework provides these capabilities with better maintainability while retaining static output.

### CMS-first architecture

Rejected for the current phase. Content is maintained through GitHub and pull requests. A future CMS requires a separate ADR and must preserve content validation, localization, security, preview and publication governance.

## Consequences

### Positive

- strong static HTML / SEO baseline;
- low default browser JavaScript;
- modern TypeScript development model;
- bounded interactivity through islands;
- good fit for bilingual content and Insights;
- clear modular ownership;
- no permanent server runtime required for core website delivery;
- easier deployment portability than a platform-coupled full-stack site.

### Costs / constraints

- interactive/server-side requirements need explicit endpoints or serverless functions rather than being hidden inside the page framework;
- language/content discipline must be maintained across DE/EN;
- Astro-specific build knowledge becomes part of repository maintenance;
- preview/deployment automation must be implemented separately.

## Validation requirements

The implementation bootstrap following this ADR must establish at least:

- TypeScript strict checking;
- Astro build validation;
- formatting/lint/static validation;
- unit tests for domain rules;
- browser E2E for navigation, language switching, Login handoff and demo flow;
- accessibility automation plus manual release review;
- link/route and SEO metadata checks;
- dependency audit;
- secret scanning;
- working CodeQL configuration for JavaScript/TypeScript;
- performance budgets appropriate to a static marketing site.

## Related

- ADR 0001 — Separate Public Website and Application Boundary
- ADR 0003 — EU Hosting, Preview and Demo-Request Processing
- root `AGENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/CODING-STANDARDS.md`
