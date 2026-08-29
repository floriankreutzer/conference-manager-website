# Conference Manager Website — Architecture

## 1. Purpose

`conference-manager-website` is the public, unauthenticated marketing and product-information surface for Conference Manager.

It is deliberately separate from:
- `floriankreutzer/conference-manager` — authenticated browser application;
- `floriankreutzer/conference-manager-api` — trusted backend/API boundary.

The website may explain the product and convert interest into a demo/contact action, but it must not become a second application runtime or authentication boundary.

## 2. System context

Current target system relationship:

```text
Public visitor
   |
   v
Conference Manager Website
Astro + TypeScript / static-first
(public, unauthenticated)
   |                  \
   | Login             \ Book a demo
   v                     v
Conference Manager App   Public demo-request function
(authenticated app)      (Scaleway Serverless Function)
                           |
                           v
                         Transactional Email
   |
   v
Conference Manager API
(trusted backend)
```

The website never sits in the trusted path between the application and API. The demo-request processing boundary is public and independently secured; it does not inherit Conference Manager application authority.

## 3. Login handoff

The website exposes a clear `Login` / `Sign in` control.

The control performs a normal HTTPS navigation to the configured Conference Manager application origin. Authentication starts only after the user reaches the application-owned authentication flow.

The website must not:
- initiate or complete Entra/OIDC authorization;
- store access or refresh tokens;
- set or read Conference Manager application session cookies;
- determine tenant authorization;
- accept arbitrary redirect origins;
- embed the authenticated application in an iframe;
- proxy authenticated application traffic.

Environment-specific app origins are configured centrally. Do not hardcode a future production domain before the domain/legal decision is final.

## 4. Website responsibility model

### Content/presentation
Owns:
- homepage;
- Product / How it works / Integrations / For Workplace Teams / Security & Trust pages or sections;
- Insights;
- public company/brand presentation when legally approved for publication;
- legal pages;
- localized public copy;
- product screenshots/visuals that accurately reflect implementation;
- SEO/social metadata.

### Conversion
Owns the public UI for `Book a demo` and the bounded public form contract.

Phase-1 processing uses a dedicated Scaleway Serverless Function and Scaleway Transactional Email. No CRM or lead database is part of the initial architecture. A future CRM must remain behind the server-side form-processing contract and requires an explicit architecture/privacy decision.

### Application handoff
Owns only the navigation contract to the Conference Manager application. It does not own application authentication.

## 5. Implementation stack and rendering

The accepted implementation stack is defined by ADR 0002:

- Astro;
- TypeScript;
- static-first output;
- progressive enhancement;
- Astro islands only for bounded interactive behavior;
- repository-owned content without CMS in the current phase;
- Astro Content Collections for suitable structured content such as Insights;
- low browser JavaScript by default.

Public indexable pages should be generated as HTML at build time wherever practical. Do not create a general SPA.

Interactive islands are appropriate for features such as:
- pricing calculator;
- enhanced demo-request behavior;
- mobile navigation where native HTML/CSS is insufficient;
- other explicitly approved bounded interactions.

## 6. Modular source architecture

The website uses responsibility-oriented modularity rather than arbitrary line-count decomposition.

Current structure:

```text
src/
├── pages/                     # Astro routing/composition roots only
│   ├── en/
│   └── de/
├── layouts/                   # page-level composition contracts
├── components/                # reusable presentation, currently navigation
├── features/                  # bounded website use cases
│   ├── demo-request/
│   └── insights/
├── domain/                    # independently testable website rules
│   ├── forms/
│   ├── insights/
│   └── seo/
├── content/                   # Astro content collection records
├── content.config.ts          # collection schemas/loaders
├── i18n/                      # localization contracts/content access
├── config/                    # typed public/runtime configuration
├── styles/                    # global tokens/foundations only
└── assets/                    # governed source assets, including font manifest

functions/
└── demo-request/              # separate public serverless trust boundary

scripts/
├── assets/                    # governed asset verification
├── deployment/                # delivered-site/function acceptance contracts
└── performance/               # deterministic build-budget gates
```

Rules:
- `pages` compose routes; significant rules do not belong there;
- `layouts` own page-level composition and may compose features/components;
- `components` are reusable presentation-oriented building blocks;
- `features` own bounded website behavior and orchestration;
- `domain` owns testable rules independent of Astro/browser rendering where practical;
- `config` centralizes application-login origin, publication and public integration configuration;
- `functions` is a separate public server-side trust boundary and follows `functions/AGENTS.md` in addition to root governance;
- operational scripts are grouped by stable responsibility instead of accumulating in a flat utility namespace;
- do not create generic `utils`, `helpers`, `misc` or `common` dumping grounds;
- shared abstractions require stable cross-feature meaning;
- no direct dependency on `conference-manager` application internals.

See `docs/REPOSITORY-STRUCTURE.md` for the repository placement and dependency-direction contract.

## 7. Language architecture

Initial customer-facing languages:
- English (`en`) — canonical content baseline;
- German (`de`) — complete DACH launch language.

Use explicit locale-prefixed routes for both languages:
- `/en/...`
- `/de/...`

Canonical and hreflang relationships must be generated consistently.

Do not use geo-IP routing. A visitor must always be able to select language manually. Browser-language detection may only be used in a predictable SEO-safe way and must not make one locale inaccessible.

## 8. Content architecture

There is no CMS in the current phase.

Repository-owned content is reviewed and published through GitHub pull requests. Use Astro Content Collections where schema-validated structured content adds value, especially for Insights and integration/resource content.

Do not bury strategic product copy in complex component logic. Localized content and metadata must remain identifiable and reviewable.

A future CMS requires an ADR and must preserve localization, schema validation, preview, security and publication governance.

## 9. Pricing architecture

The website may implement a modular, testable pricing calculator.

Separate:
- pricing domain/model;
- locale/currency formatting;
- calculator UI;
- publication/feature configuration.

Concrete public prices must not be published until the pricing model is explicitly approved and validated. No implementation may infer or invent commercial prices from incomplete planning material.

## 10. Brand architecture

Official product name: `Conference Manager`.

Current strategic corporate-brand state:
- PAVUREL — preferred candidate, legal clearance pending;
- SAVELUN — reserve candidate, legal clearance pending.

The website may implement the approved PAVUREL candidate art direction while the project is not publicly launched, but public release gates must prevent unqualified representation of PAVUREL as a legally adopted or registered corporate brand before clearance.

Brand assets and tokens must remain isolated enough that a corporate-brand decision can be changed without rewriting product content architecture.

Approved Manrope/Inter typography roles are represented by CSS tokens and governed self-hosted WOFF2 assets. `src/assets/fonts/manifest.json` is fail-closed: accepted assets require immutable provenance, retained license evidence and matching SHA-256 hashes. The current Manrope and Inter files satisfy that repository gate and are activated through same-origin `@font-face` declarations with system fallbacks and `font-display: swap`; replacement font binaries must pass the same provenance/hash gate before activation.

## 11. Security architecture

The website is a public attack surface with no trusted browser authority.

Required deployment/security design includes:
- HTTPS;
- restrictive Content Security Policy;
- appropriate clickjacking protection / `frame-ancestors` policy;
- Referrer Policy;
- Permissions Policy;
- HSTS where hosting permits correct production configuration;
- safe cross-origin behavior;
- dependency and supply-chain controls;
- no secrets in shipped client assets;
- safe form-processing boundary;
- explicit third-party script governance.

See `docs/SECURITY.md`.

## 12. Demo-request processing

The phase-1 `Book a demo` flow is defined by ADR 0003.

Initial public fields:
- first name;
- last name;
- business email;
- company;
- company size/range;
- optional message;
- privacy acknowledgement/consent UI as legally appropriate to the final processing purpose.

Do not collect a telephone number initially.

Processing requirements:
- HTTPS POST to the dedicated public function;
- positive server-side validation and field-length limits;
- bounded request size and content type;
- rate limiting / proportionate anti-automation controls;
- no privileged credentials in the browser;
- generic error responses;
- no unsafe reflection of submitted content;
- no unnecessary personal data in operational logs;
- email delivery through Scaleway Transactional Email;
- no lead database/CRM in phase 1.

The repository already contains the bounded function implementation, independent provider/configuration modules, failure/timeout tests and a manually triggered endpoint-acceptance workflow. Durable rate limiting, real endpoint provisioning, verified mailbox delivery, privacy/retention ownership and platform-log evidence remain operational acceptance requirements; repository code does not substitute for those controls.

See `functions/demo-request/README.md` and `docs/DEMO-REQUEST-ACCEPTANCE.md`.

## 13. Privacy architecture

No analytics, marketing tags, session replay, chat widgets, or non-essential embeds are loaded at launch.

Any future integration requires a documented decision covering:
- purpose;
- data categories;
- recipients/processors;
- consent/legal-basis implications;
- security and supply-chain risk;
- retention;
- performance impact.

Before the demo form becomes public, define the privacy notice, approved recipient mailbox, mailbox/lead-email retention expectation and access/deletion ownership.

## 14. SEO architecture

SEO is part of the core architecture rather than a post-launch plugin.

The stack supports:
- static HTML for indexable content;
- unique page metadata;
- canonical URLs;
- hreflang/localized metadata;
- sitemap generation;
- robots controls;
- Open Graph/social metadata foundations;
- descriptive internal routes/links;
- preview `noindex` publication behavior;
- strong static-first performance characteristics.

Structured data must only be introduced when accurate and eligible. Social-preview imagery remains subject to governed asset provenance rather than fabricated placeholder assets.

See `docs/SEO-STANDARDS.md`.

## 15. Hosting and delivery

ADR 0003 selects Scaleway as the initial EU hosting platform, subject to actual provisioning and operational acceptance.

Target production delivery:

```text
Public visitor
   |
   v
Scaleway Edge Services
TLS / custom domain / cache / approved security controls
   |
   v
Scaleway Object Storage
Astro static build output
```

Production resources must use approved EU regions. Strict EU-only interpretation must be revalidated for every enabled service and future edge/integration feature.

The broader Conference Manager application/cloud-provider decision remains separate; the public website does not force the SaaS application/API to use Scaleway.

## 16. Deployment environments

Target environment model:
- local development;
- isolated PR preview;
- non-production/staging where required for release acceptance;
- production.

GitHub Actions is the delivery control plane for the website repository. Preview, cleanup, production, delivered-experience and demo-endpoint acceptance workflows are implemented, but successful real infrastructure acceptance still depends on provisioned Scaleway resources and GitHub environment configuration.

PR previews must:
- use isolated buckets;
- be derived from PR identity;
- not overwrite production;
- use least-privilege credentials;
- be `noindex, nofollow`;
- avoid production secrets/integration recipients where possible;
- be cleaned up after PR close/merge.

Environment configuration separates:
- public site origin;
- Conference Manager application handoff origin;
- demo-request endpoint;
- privacy URL;
- environment publication/indexing state.

Secrets remain server/deployment-side and are never serialized into public browser bundles.

## 17. Cross-repository contracts

### Website -> application
Current contract: secure navigation to the configured application origin.

Any future query parameters, deep links, locale propagation, campaign attribution, or return-path semantics require an explicit documented contract with `conference-manager` and security review.

### Website -> Conference Manager API
There is no default direct authenticated application API contract.

The demo-request function is a separate public unauthenticated processing boundary; it must not reuse authenticated application authority merely for convenience.

## 18. Material architecture decisions requiring ADRs

Create/update an ADR before materially changing:
- framework/static-site generator;
- hosting/runtime provider;
- CMS/content platform;
- form processing;
- analytics/tag management;
- consent management;
- localization URL strategy;
- shared design-system package across repositories;
- direct public application API integrations;
- authentication boundary;
- major third-party embeds.

## 19. Validation and release gates

The repository implementation currently enforces:
- strict Astro/TypeScript validation;
- ESLint and Prettier checks;
- dependency vulnerability audit;
- secret scanning;
- unit/regression tests for domain, deployment, demo-processing and asset-governance contracts;
- Astro production build validation;
- deterministic static performance budgets;
- browser E2E for navigation, language switching, Login handoff, mobile behavior and demo publication state;
- internal route/link checks;
- automated Axe accessibility checks;
- SEO/indexability/preview publication checks;
- JavaScript/TypeScript CodeQL plus GitHub's Actions analysis;
- governed font provenance/hash verification plus same-origin, German-glyph, fallback, controlled CLS and 200% reflow browser regression;
- build-artifact upload;
- preview/production delivered-response acceptance contracts;
- controlled manual acceptance for the real production origin, including lab LCP/CLS, same-origin font delivery, 200% reflow and screenshot evidence;
- controlled manual acceptance for the real demo-request endpoint.

Automated checks do not replace manual accessibility/release acceptance, representative screen-reader review, field Core Web Vitals or real infrastructure evidence.

Hosting/form production readiness additionally requires executed evidence for TLS, CSP/security headers, EU-region placement, preview isolation/cleanup, IAM separation, durable rate limiting, real malformed/abusive form handling, provider/mailbox behavior, privacy/log minimization and rollback/redeployment.

## 20. Current status

Accepted and implemented repository baseline:
- separate public website boundary — ADR 0001;
- Astro + TypeScript, static-first, responsibility-oriented modular architecture — ADR 0002;
- `/en/...` and `/de/...` localized route strategy — ADR 0002;
- bilingual PAVUREL website shell/homepage and publication-governed public pages;
- Insights Content Collection foundation with bilingual publication gates;
- no CMS and no tracking at launch — ADRs 0002/0003;
- secure configurable Login handoff to the authenticated application;
- fail-closed public demo form plus bounded serverless processing implementation;
- provider failure/idempotency semantics and controlled endpoint-acceptance tooling;
- SEO/canonical/hreflang/robots/sitemap publication controls;
- required CI, CodeQL, accessibility, route and performance gates;
- protected `main` branch with required `validate` and JavaScript/TypeScript CodeQL checks;
- Scaleway preview/production deployment and delivered-response verification workflows;
- governed self-hosted Manrope/Inter assets with immutable provenance, retained OFL-1.1 licenses, accepted SHA-256 manifest entries and same-origin runtime activation;
- controlled local typography CLS/200% reflow regression plus a manual real-origin delivered-experience acceptance workflow.

Production readiness is **not** yet claimed. Remaining launch evidence is operational/external rather than an Astro bootstrap task:

1. provision and accept real Scaleway preview/production resources, IAM separation, DNS/Edge/TLS/security headers and preview cleanup/rollback evidence — GitHub #24;
2. provision and accept the real demo-request function, durable rate limiting, Transactional Email domain/functional mailbox, privacy/retention/logging controls and execute controlled endpoint/mailbox acceptance — GitHub #25;
3. once the real production origin exists, execute `Delivered Experience Acceptance` and retain the controlled lab/screenshot evidence, then complete final human typography/visual and representative screen-reader review — GitHub #10, dependent in part on #24;
4. complete final targeted manual release accessibility, keyboard and security review before public launch.
