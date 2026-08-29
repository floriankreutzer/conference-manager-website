# Conference Manager Website — Coding Standards

These standards are mandatory for implementation and review in `conference-manager-website`. Read root `AGENTS.md` first.

## 1. Scope and architecture discipline

This repository implements the public Conference Manager marketing website. It must not duplicate the authenticated Conference Manager application or backend.

Before implementation:
- confirm the current architecture decision in `docs/ARCHITECTURE.md` and relevant ADRs;
- inspect existing components, tokens, content patterns, tests, and deployment configuration;
- do not introduce a framework, CMS, analytics platform, form processor, authentication library, or hosting-specific runtime without an explicit ADR when the choice is material.

Prefer static/server-rendered content and progressive enhancement. Do not create an SPA merely because a framework supports one.

## 2. Web standards and semantic HTML

Use valid modern HTML and CSS according to current WHATWG/W3C standards.

Mandatory rules:
- use semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`) according to purpose;
- use native `a`, `button`, `form`, `input`, `select`, `textarea`, `details`, and `dialog` behavior before custom abstractions;
- use one meaningful page-level `h1` and a logical heading hierarchy;
- never use clickable generic containers as substitutes for links or buttons;
- preserve useful behavior without JavaScript wherever practical;
- links that navigate to the Conference Manager application must be ordinary secure HTTPS links, not scripted authentication flows.

## 3. Accessibility

WCAG 2.2 Level AA is the target baseline.

Relevant implementation must provide:
- keyboard operability;
- visible `:focus-visible` treatment;
- logical focus order;
- no keyboard traps;
- semantic landmarks and headings;
- descriptive link/button names;
- accessible navigation menus;
- accessible form labels, instructions, errors, and success states;
- text alternatives for meaningful images and empty alt text for decorative images;
- sufficient contrast;
- no information conveyed by colour alone;
- touch targets suitable for mobile use;
- zoom/reflow support to at least 200% without loss of content or functionality;
- `prefers-reduced-motion` support where motion exists.

Use ARIA only when native semantics are insufficient. Keep ARIA state synchronized with actual UI state.

## 4. Internationalization and localization

English is the canonical content baseline and German is a complete launch language.

Mandatory rules:
- do not scatter user-visible strings through implementation files if the selected content architecture provides a central content/i18n layer;
- translate complete semantic units, not sentence fragments;
- keep metadata, navigation, CTAs, forms, validation, alt text, and accessibility text localizable;
- support longer German text without clipping or layout failure;
- use locale-aware formatting APIs for dates, numbers, percentages, and currencies if they are introduced;
- do not manually concatenate localized sentences;
- route structure, canonical URLs, and hreflang strategy must remain internally consistent.

## 5. Responsive design

Use mobile-first responsive design.

Mandatory rules:
- no page-level horizontal overflow;
- no desktop-only interaction assumptions;
- use flexible Grid/Flexbox and intrinsic sizing;
- prefer relative units and `clamp()`, `min()`, `max()` where appropriate;
- introduce breakpoints based on content needs rather than device brands;
- preserve readable line lengths and useful hierarchy on large screens;
- test phone, tablet, desktop, portrait, landscape, and browser zoom.

## 6. CSS and design system

Follow `docs/DESIGN-SYSTEM.md`.

Mandatory rules:
- centralize brand colours, typography, spacing, radii, shadows, and layout values as semantic tokens;
- do not repeatedly hardcode approved brand values across components;
- avoid unnecessary inline styles, `!important`, and high-specificity selectors;
- keep component styles locally understandable and prevent unintended global leakage;
- use logical CSS properties where practical;
- preserve the distinction between the warmer marketing expression and the lighter, more functional product UI shown in screenshots.

## 7. JavaScript and client behavior

Keep client JavaScript minimal and purposeful.

Use JavaScript for genuine interaction or progressive enhancement, not to reproduce capabilities available in HTML/CSS.

Mandatory rules:
- no dynamic code execution from untrusted data;
- no unsafe HTML injection;
- prefer safe DOM/text APIs;
- no application tokens, tenant identifiers, or session material in website JavaScript;
- no client-side authentication implementation;
- no cross-origin session synchronization with the Conference Manager application;
- no global event/listener proliferation without clear lifecycle ownership;
- clean up observers/listeners where component lifecycle requires it.

## 8. Login/application handoff

The public site's `Login` / `Sign in` control must navigate to an explicitly configured, allowlisted HTTPS Conference Manager application origin.

Rules:
- do not implement Entra/OIDC flows here;
- do not embed the authenticated app in an iframe;
- do not proxy application credentials through the marketing site;
- do not append secrets or session data to the URL;
- do not accept arbitrary user-provided redirect origins;
- environment-specific application origins must be deployment configuration, not duplicated ad hoc across components;
- any locale or return-path parameter must be documented, allowlisted, and supported by the application contract before use.

## 9. Images, fonts, and assets

- Use official governed brand assets only.
- Preserve original proportions and defined clear space for logos/signets.
- Record asset provenance/licensing for production assets.
- Prefer modern image formats and responsive source sets where supported.
- Always provide intrinsic dimensions to reduce layout shift.
- Lazy-load below-the-fold non-critical images.
- Do not lazy-load the primary LCP image if that would delay it.
- Self-host fonts only when licensing/provenance permits it; use appropriate preload/subset strategy after measurement.
- Do not fabricate product UI screenshots. Product visuals must represent implemented or explicitly labelled target-state behavior.

## 10. SEO implementation

Follow `docs/SEO-STANDARDS.md`.

Every indexable page must have, as applicable:
- unique title and meta description;
- one clear canonical URL;
- correct language metadata;
- correct canonical/hreflang relationships;
- semantic headings;
- useful internal links;
- Open Graph/social metadata;
- indexability consistent with robots policy;
- structured data only when accurate and permitted by search-engine guidelines.

SEO must not override factual accuracy or accessibility.

## 11. Performance

Performance is a feature.

Prefer:
- minimal JavaScript;
- static/server rendering;
- optimized images and fonts;
- critical CSS discipline appropriate to the selected stack;
- caching and immutable fingerprinted assets where deployment supports it;
- lazy loading only where it improves user-perceived performance;
- limited third-party requests.

Track Core Web Vitals and set enforceable performance budgets once the implementation stack exists. Avoid avoidable layout shifts and render-blocking dependencies.

## 12. Security

Follow `docs/SECURITY.md` and OWASP-aligned secure defaults.

Mandatory rules:
- never store secrets in source control;
- treat all external/form data as untrusted;
- validate at trust boundaries;
- encode output for context;
- use safe form submission endpoints with anti-abuse controls;
- use HTTPS only in production;
- implement a restrictive CSP and relevant security headers at deployment;
- deny unnecessary browser capabilities through Permissions Policy;
- third-party scripts require explicit review;
- dependencies require vulnerability review and controlled updates;
- no confidential or personal data in logs unless strictly necessary and protected.

## 13. Privacy and tracking

Tracking is opt-in architecture, not a default implementation detail.

Before introducing analytics, marketing tags, session replay, chat widgets, A/B testing, or external embeds:
1. document the purpose;
2. document data collected and destinations;
3. assess legal/consent requirements;
4. assess security and supply-chain risk;
5. assess performance impact;
6. record the decision in an ADR or equivalent governed decision.

Do not load non-essential tracking before required consent.

## 14. Forms and conversion flows

`Book a demo`, contact, and similar forms are public attack surfaces.

If/when introduced:
- collect only necessary fields;
- validate client-side for UX and server-side at the trusted processing boundary;
- protect against spam/automation using proportionate controls;
- provide accessible errors and confirmation;
- do not expose internal errors;
- define retention and recipient/processor ownership;
- never use a static client secret to call a privileged API.

## 15. Error handling

- Fail visibly and safely for critical user actions.
- Do not expose stack traces, internal identifiers, credentials, or infrastructure details.
- External-service failures must not break basic website navigation.
- User-facing errors must be localized and accessible.

## 16. Dependencies

Keep dependencies few and justified.

For every new material dependency consider:
- necessity versus platform-native capability;
- maintenance health;
- license;
- bundle/runtime impact;
- security history;
- transitive dependency footprint;
- browser/server exposure;
- replacement cost.

Pin and update dependencies using the selected ecosystem's standard lockfile/process. Do not suppress vulnerability findings without documented risk acceptance.

## 17. Testing

New functionality requires progression tests; changed behavior requires regression protection.

After stack selection, standardized repository scripts must cover at least:
- static/lint validation;
- unit/component tests where applicable;
- build/render validation;
- E2E for critical navigation and conversion journeys;
- automated accessibility checks;
- broken-link/route checks;
- SEO metadata checks where practical;
- dependency audit and secret scanning.

Critical E2E journeys include:
- homepage navigation;
- language switching;
- `Book a demo` path;
- `Login` handoff to the configured application origin;
- mobile navigation.

Automated accessibility checks do not replace manual keyboard and representative screen-reader review for material releases.

## 18. Content and claim integrity

Follow `docs/CONTENT-GOVERNANCE.md`.

Never publish:
- invented customer names/logos/testimonials;
- unsupported rankings, awards, ratings, usage metrics, ROI, or time-saved claims;
- target-state features as current functionality;
- unsupported security/compliance certifications;
- legally unverified statements about PAVUREL brand ownership/registration;
- claims that Conference Manager replaces room-booking infrastructure when the approved positioning states the opposite.

## 19. Definition of Done

A change is complete only when, for its scope:
- behavior is correct;
- repository boundaries are preserved;
- content claims are verified;
- accessibility and responsive behavior are addressed;
- i18n/l10n remains coherent;
- SEO/indexability is correct;
- security/privacy impacts are addressed;
- performance impact is acceptable;
- relevant tests and checks pass;
- documentation is updated when architecture, content policy, configuration, or operation changes.

Do not claim formal WCAG, security, privacy, or performance compliance without the required evidence.
