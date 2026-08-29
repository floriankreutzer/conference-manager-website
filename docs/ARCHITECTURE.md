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

Target structure:

```text
src/
├── pages/                     # route composition only
│   ├── en/
│   └── de/
├── layouts/                   # page-level layout contracts
├── components/                # reusable presentation
│   ├── navigation/
│   ├── hero/
│   ├── sections/
│   ├── forms/
│   ├── pricing/
│   └── shared/
├── features/                  # bounded website behavior/use cases
│   ├── demo-request/
│   ├── pricing-calculator/
│   ├── language-switcher/
│   └── login-handoff/
├── domain/                    # independently testable rules
│   ├── pricing/
│   └── forms/
├── content/                   # Astro content collections/content records
├── i18n/                      # localization contracts/access
├── config/                    # typed public/runtime configuration
├── styles/                    # global tokens/foundations only
└── assets/                    # governed source assets
```

Rules:
- `pages` compose routes; significant business rules do not belong there;
- `components` are presentation-oriented;
- `features` own bounded website behavior and orchestration;
- `domain` owns testable rules independent of Astro/browser rendering where practical;
- `config` centralizes application-login origin, route and brand configuration;
- do not create generic `utils`, `helpers`, `misc` or `common` dumping grounds;
- shared abstractions require stable cross-feature meaning;
- no direct dependency on `conference-manager` application internals.

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

The stack must support:
- static HTML for indexable content;
- unique page metadata;
- canonical URLs;
- hreflang/localized metadata;
- sitemap generation;
- robots controls;
- structured data where truthful and eligible;
- Open Graph/social metadata;
- redirects without unnecessary client-side hops;
- strong Core Web Vitals.

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

At minimum:
- local development;
- isolated PR preview;
- non-production/staging;
- production.

GitHub Actions is the delivery control plane for the website repository.

PR previews must:
- use isolated bucket paths/buckets;
- be derived from PR/commit identity;
- not overwrite production;
- use least-privilege credentials;
- be `noindex, nofollow`;
- avoid production secrets/integration recipients where possible;
- be cleaned up after PR close/merge.

Environment configuration separates:
- public site origin;
- Conference Manager application handoff origin;
- demo-request endpoint;
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

The implementation bootstrap must establish:
- strict TypeScript/static validation;
- Astro build validation;
- unit tests for domain rules;
- E2E for navigation, language switching, Login handoff, mobile navigation and demo flow;
- accessibility automation plus manual release checks;
- link/route and SEO metadata validation;
- dependency audit;
- secret scanning;
- working JavaScript/TypeScript CodeQL;
- performance budgets;
- preview deployment verification.

Hosting/form production readiness additionally requires executed evidence for TLS, CSP/security headers, EU-region placement, preview isolation, malformed/abusive form handling, email failure behavior and rollback/redeployment.

## 20. Current status

Accepted architecture baseline:
- separate public website boundary — ADR 0001;
- Astro + TypeScript, static-first, modular architecture — ADR 0002;
- `/en/...` and `/de/...` localized route strategy — ADR 0002;
- no CMS and no tracking at launch — ADRs 0002/0003;
- Scaleway EU hosting, PR preview direction and first-party demo-request processing — ADR 0003.

The architecture is accepted, but production readiness is **not** yet claimed. The next implementation step is to bootstrap the Astro repository, CI/security gates, preview deployment automation, core bilingual shell, login handoff, Insights content foundation and form contract with regression/progression tests.
