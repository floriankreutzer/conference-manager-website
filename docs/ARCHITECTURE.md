# Conference Manager Website — Architecture

## 1. Purpose

`conference-manager-website` is the public, unauthenticated marketing and product-information surface for Conference Manager.

It is deliberately separate from:
- `floriankreutzer/conference-manager` — authenticated browser application;
- `floriankreutzer/conference-manager-api` — trusted backend/API boundary.

The website may explain the product and convert interest into a demo/contact action, but it must not become a second application runtime or authentication boundary.

## 2. System context

Target system relationship:

```text
Public visitor
   |
   v
Conference Manager Website
(public, unauthenticated)
   |                  \
   | Login             \ Book a demo / contact
   v                     v
Conference Manager App   Governed lead/contact processing
(authenticated app)      (future decision / separate trusted endpoint or provider)
   |
   v
Conference Manager API
(trusted backend)
```

The website never sits in the trusted path between the application and API.

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

Environment-specific app origins must be configured centrally through the selected deployment/runtime configuration approach. Do not hardcode a future production domain before the domain decision is final.

## 4. Website responsibility model

### Content/presentation
Owns:
- homepage;
- Product / How it works / Integrations / For Workplace Teams / Security & Trust pages or sections;
- public company/brand presentation when legally approved for publication;
- legal pages;
- localized public copy;
- product screenshots/visuals that accurately reflect implementation;
- SEO/social metadata.

### Conversion
May own public UI for:
- `Book a demo`;
- contact requests;
- newsletter or campaign forms only if explicitly approved later.

Processing of personal data must occur through a documented trusted processing boundary. A static website must never contain privileged API credentials.

### Application handoff
Owns only the navigation contract to the Conference Manager application. It does not own application authentication.

## 5. Rendering principle

The preferred architectural direction is:
- static generation or server-rendered HTML for public content;
- progressive enhancement;
- minimal client JavaScript;
- stable semantic URLs;
- strong first-load indexability;
- low dependency and third-party-script cost.

The exact implementation stack is intentionally not selected in this bootstrap. Record the decision in an ADR before introducing a production framework/build architecture.

## 6. Content architecture

The implementation must maintain a clear separation between:
- reusable layout/components;
- brand/design tokens;
- localized content;
- metadata/SEO configuration;
- public integrations/forms;
- deployment/environment configuration.

Do not bury strategic product copy in complex component logic. Content that changes by locale or campaign must remain identifiable and reviewable.

## 7. Language architecture

Initial customer-facing languages:
- English (`en`) — canonical content baseline;
- German (`de`) — complete DACH launch language.

Before launch, the implementation must define one consistent localized URL strategy and corresponding canonical/hreflang rules. The routing strategy is a material SEO decision and must be documented before publication.

## 8. Brand architecture

Official product name: `Conference Manager`.

Current strategic corporate-brand state:
- PAVUREL — preferred candidate, legal clearance pending;
- SAVELUN — reserve candidate, legal clearance pending.

The website may implement the approved PAVUREL candidate art direction while the project is not publicly launched, but public release gates must prevent unqualified representation of PAVUREL as a legally adopted or registered corporate brand before clearance.

Brand assets and tokens must remain isolated enough that a corporate-brand decision can be changed without rewriting product content architecture.

## 9. Security architecture

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

## 10. Privacy architecture

No analytics, marketing tags, session replay, chat widgets, or non-essential embeds are assumed by default.

Any such integration requires a documented decision covering:
- purpose;
- data categories;
- recipients/processors;
- consent/legal basis implications;
- security and supply-chain risk;
- retention;
- performance impact.

## 11. SEO architecture

SEO is part of the core architecture rather than a post-launch plugin.

The stack must support:
- server/static HTML for indexable content;
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

## 12. Deployment environments

At minimum plan for:
- local development;
- preview/PR environment where practical;
- non-production/demo or staging environment;
- production.

Environment configuration must separate:
- public site origin;
- Conference Manager application handoff origin;
- future trusted form endpoint/provider configuration;
- optional approved analytics/consent configuration.

Secrets must remain server/deployment-side and never be serialized into public browser bundles.

## 13. Cross-repository contracts

### Website -> application
Current contract: secure navigation to the configured application origin.

Any future query parameters, deep links, locale propagation, campaign attribution, or return-path semantics require an explicit documented contract with `conference-manager` and security review.

### Website -> API
There is no default direct authenticated application API contract.

If a future public endpoint is required for demo/contact processing, it must be explicitly designed as a public unauthenticated API surface with validation, rate limiting/anti-abuse controls, privacy handling, and no dependency on browser authority.

## 14. Material architecture decisions requiring ADRs

Create/update an ADR before materially changing:
- framework/static-site generator;
- hosting/runtime provider;
- CMS/content platform;
- form processing;
- analytics/tag management;
- consent management;
- localization URL strategy;
- shared design-system package across repositories;
- direct public API integrations;
- authentication boundary;
- major third-party embeds.

## 15. Current status

Governance bootstrap only. No production website implementation stack has yet been approved in this repository.
