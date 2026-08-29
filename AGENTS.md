# Conference Manager Website — Repository Agent Instructions

These instructions are mandatory for every human contributor and every AI coding agent that analyzes, reviews, creates, modifies, refactors, or validates work in `conference-manager-website`.

## 1. Canonical source of truth

- This root `AGENTS.md` is the mandatory entry point for repository work.
- `docs/CODING-STANDARDS.md` contains the detailed engineering standard and is mandatory.
- `docs/ARCHITECTURE.md`, `docs/SECURITY.md`, `docs/SEO-STANDARDS.md`, `docs/DESIGN-SYSTEM.md`, and `docs/CONTENT-GOVERNANCE.md` are mandatory when their scope is relevant.
- The current `main` branch is the repository implementation baseline.
- The Conference Manager Confluence product/brand documentation is the strategic source for approved positioning, website messaging, brand direction, and publication gates. Repository implementation must not contradict those approved product truths.
- The authoritative application repositories remain `floriankreutzer/conference-manager` and `floriankreutzer/conference-manager-api`. This website repository must not duplicate their product runtime or trusted backend responsibilities.

If this file or the mandatory referenced standards cannot be read, do not modify the repository.

## 2. Product boundary

This repository owns the public, unauthenticated Conference Manager marketing website.

It may own:
- public product and company pages;
- homepage and campaign content;
- SEO and structured metadata;
- public trust/security information;
- public integration information whose claims are verified;
- demo/contact conversion surfaces;
- a clear login/sign-in entry point that hands the user off to the Conference Manager web application.

It must not own:
- Conference Manager application business logic;
- Employee, Conference Manager, Tenant Admin, or Platform Operator application capabilities;
- authentication implementation;
- tenant resolution or tenant authorization;
- access/refresh token handling;
- application session management;
- Microsoft Graph or other trusted integration credentials;
- trusted backend authorization or data persistence belonging to `conference-manager-api`.

The website login control is a navigation handoff to the application origin. The website must not become an authentication or authorization boundary.

## 3. Mandatory workflow before changes

Before writing, editing, refactoring, or reviewing implementation:

1. Read this `AGENTS.md` completely.
2. Read `docs/CODING-STANDARDS.md` completely.
3. Read all additional standards relevant to the change.
4. Inspect the current version of every existing file before modifying it.
5. Confirm the current architecture/stack decision before introducing dependencies or tooling.
6. Reuse approved brand, content, accessibility, security, SEO, and component patterns.
7. Assess security, privacy, accessibility, SEO, performance, responsive, i18n/l10n, content-evidence, and regression impact.
8. Make the smallest coherent change required.

Do not introduce a framework, CMS, analytics platform, consent platform, hosting provider, form processor, authentication library, or other material platform dependency without an explicit architecture decision and documented impact assessment.

## 4. Engineering priority order

When requirements conflict, use this priority order unless a higher-priority instruction requires otherwise:

1. Security and privacy
2. Correctness and factual claim integrity
3. Accessibility
4. SEO/indexability correctness
5. Performance and resilience
6. User experience and conversion clarity
7. Maintainability
8. Visual detail

## 5. Security and privacy boundary

The public website is an untrusted public surface and must be secure by default.

Mandatory principles:
- no application secrets, credentials, tokens, session identifiers, or confidential configuration in client code;
- no authentication/session implementation in this repository unless a future explicit architecture decision changes the boundary;
- no cross-origin sharing of Conference Manager application session state;
- no embedding of the authenticated Conference Manager application in an iframe;
- validate and safely handle all untrusted input;
- prefer static rendering and minimal client JavaScript where practical;
- third-party scripts are deny-by-default and require documented purpose, privacy review, security review, consent impact, and performance impact;
- security headers, CSP, referrer policy, permissions policy, transport security, and safe form handling must be part of deployment design;
- avoid unsafe HTML injection and dynamic code execution;
- data collection must follow minimization and purpose limitation;
- analytics/marketing tracking must not be introduced silently.

## 6. Accessibility and responsive requirements

WCAG 2.2 Level AA is the implementation target.

Relevant changes must consider and test:
- semantic HTML;
- keyboard access and visible focus;
- logical focus and heading order;
- meaningful links and controls;
- accessible forms and errors;
- contrast and non-colour state communication;
- reduced motion;
- zoom/reflow;
- mobile, tablet, desktop, portrait, and landscape;
- touch-target sizing;
- screen-reader-relevant semantics.

Accessibility is a functional requirement, not a visual audit item.

## 7. Internationalization and content

The website is international by design. English is the canonical product-language baseline and German must be supported as a complete customer-facing language for the DACH launch scope.

Do not hardcode a second parallel content system inside arbitrary components. Content architecture must support:
- complete translated semantic units;
- locale-aware metadata and canonical/hreflang strategy where applicable;
- longer translated text;
- locale-aware dates/numbers when used;
- future expansion without route or layout assumptions that make additional languages impractical.

Public claims must follow `docs/CONTENT-GOVERNANCE.md`. Target-state capabilities, unsupported customer proof, invented statistics, unsupported superiority claims, and unverified legal/security claims are prohibited.

## 8. Brand and naming governance

The official product name remains `Conference Manager`.

The current strategic brand baseline identifies PAVUREL as the preferred corporate-brand candidate and SAVELUN as the reserve candidate, with legal clearance pending. Until the documented clearance gate is completed:
- do not represent PAVUREL as a legally adopted or registered company/trademark;
- do not silently rename the product;
- `by Pavurel` remains a subordinate corporate endorsement where approved for the current publication context;
- implementation must be easy to revise if the corporate-brand decision changes.

Brand implementation must follow `docs/DESIGN-SYSTEM.md` and the current approved Confluence brand sources.

## 9. SEO and performance are product requirements

Public pages must follow `docs/SEO-STANDARDS.md`.

At minimum consider:
- crawlability and intentional indexability;
- canonical URLs;
- localized metadata/hreflang as applicable;
- semantic heading structure;
- structured data only when accurate and eligible;
- sitemap and robots policy;
- Open Graph/social metadata;
- descriptive internal links;
- image dimensions, formats, alt text, and loading strategy;
- Core Web Vitals and rendering performance;
- avoidance of client-side rendering dependencies that unnecessarily weaken first-load content or indexability.

## 10. Architecture and dependency governance

`docs/ARCHITECTURE.md` describes the website boundary and current architecture decisions.

Before a production implementation stack is selected, do not assume or introduce a framework by convention. Record material decisions as ADRs under `docs/adr/`.

Prefer:
- static or server-rendered public content;
- progressive enhancement;
- low JavaScript cost;
- explicit dependency ownership;
- clear separation between content, presentation, integrations, and deployment configuration;
- platform-native web capabilities before custom abstractions where practical.

Avoid:
- a second copy of Conference Manager application logic;
- unnecessary SPA architecture for primarily public content;
- shared runtime coupling to the authenticated app;
- hidden vendor lock-in without an ADR;
- uncontrolled third-party script proliferation.

## 11. Testing and validation

Every implementation change requires regression/progression validation appropriate to its scope.

Once the implementation stack is selected, CI must provide explicit commands for at least:
- formatting/lint/static validation;
- dependency vulnerability review;
- secret scanning;
- build/render validation;
- automated tests;
- accessibility checks;
- link/route integrity;
- SEO/metadata validation where automatable;
- browser E2E for critical journeys such as primary navigation, `Book a demo`, language switching, and `Login` handoff;
- performance budget checks where practical.

Do not weaken or remove valid checks merely to make a change pass.

If required validation cannot be executed, report the limitation explicitly.

## 12. Git and pull-request discipline

- Use pull requests for repository changes; do not treat direct-to-`main` writes as the normal workflow even if branch protection is not yet configured.
- Keep changes scoped and reviewable.
- Read the current file before modifying it and preserve unrelated work.
- Do not merge while required checks fail or material review findings remain unresolved.
- Architecture, dependency, security, tracking, brand-governance, or publication-policy changes must be explicit in the PR description.

## 13. Required compliance checklist

Every implementation creation, modification, refactoring, or code-review response must end with an evidence-based checklist using only:
- ✅ fulfilled
- ⚠️ partial / not fully verifiable
- ➖ not applicable
- ❌ not fulfilled

Cover at least:
- semantic HTML/web standards
- WCAG 2.2 AA/accessibility
- keyboard/focus behavior
- i18n/l10n
- responsive behavior
- brand/design-system consistency
- SEO/indexability
- performance impact
- OWASP/security
- privacy/tracking
- factual/publication claim integrity
- Clean Code/separation of concerns
- regression impact
- tests/validation

Only mark an item fulfilled when implementation and executed verification support the claim.
