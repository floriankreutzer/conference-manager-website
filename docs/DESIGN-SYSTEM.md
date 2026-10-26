# Conference Manager Website — Design System Baseline

## 1. Design objective

The public website should express **operational precision + warm hospitality**.

It should feel:
- premium through precision rather than decoration;
- modern and lightweight;
- calm and dependable;
- warm without appearing luxurious, fashionable, or hotel-like;
- clearly connected to the Conference Manager product while remaining more expressive than the authenticated application UI.

## 2. Naming and brand state

Official product name: **Conference Manager**.

Preferred endorsed lockup where approved:

**Conference Manager**  
*by Pavurel*

`by Pavurel` is subordinate and is not part of the official product name.

Internal brand-selection alternatives and clearance status remain in private governance sources.

Do not visually or textually imply registered/legal ownership without verified publication approval.

## 3. Core palette

Current approved product/brand baseline:

| Role | Value | Use |
| --- | --- | --- |
| Bordeaux | `#7A1F3D` | primary brand/action accent |
| Bordeaux dark | `#651D32` | hover/strong emphasis |
| Camel | `#C29A6B` | warmth/hospitality accent |
| Camel dark | `#A97D4E` | deeper secondary accent |
| Ink | `#171717` | primary text/precision |
| Muted grey | `#62666B` | secondary text |
| Canvas | `#F3F2F0` | warm neutral background |
| Surface | `#FFFFFF` | primary surface |

Implementation must expose semantic design tokens rather than duplicating raw values across components.

Bordeaux is selective emphasis, not a full-page default. Camel adds warmth but must not become a metallic/luxury treatment.

## 4. Typography

Approved typography system:
- **Manrope** — brand/display headlines and selected high-impact statements;
- **Inter** — body, navigation, controls, forms, tables, dense functional text.

Principle:

> Manrope creates brand character. Inter protects interface clarity.

Use font weights deliberately. Avoid Light/ExtraLight for small text. Typography must remain readable and accessible across languages and viewport sizes.

Production font files require verified licensing/provenance before repository inclusion or deployment.

## 5. Website vs product application

The marketing website may use:
- larger editorial headlines;
- more generous whitespace;
- richer brand surfaces;
- restrained workplace/hospitality photography;
- narrative product visuals.

The authenticated Conference Manager application remains lighter, more functional, and operationally dense where required.

Do not redesign product screenshots to match the marketing site. Product visuals must faithfully represent the real application or be explicitly labelled as conceptual/target-state.

## 6. Layout principles

- generous whitespace;
- clear content hierarchy;
- restrained line length for body content;
- strong vertical rhythm;
- one obvious primary action per section;
- avoid dense multi-card grids where a simpler narrative works;
- avoid generic SaaS visual clutter;
- responsive behavior from mobile upward.

The homepage should feel curated, not like a feature catalogue.

## 7. Homepage narrative baseline

Current strategic sequence may be condensed visually, but must preserve the approved message hierarchy:
1. conference-management outcome;
2. employee and Workplace Team value;
3. one request / complete conference context;
4. room-booking integration rather than replacement;
5. PAVUREL hospitality character;
6. connected ecosystem;
7. business/technical readiness;
8. conversion.

Primary CTA: **Book a demo**.  
Secondary CTA: **See how it works**.  
Persistent utility action: **Login / Sign in**.

## 8. Photography and imagery

Prefer:
- authentic contemporary workplaces and conference environments;
- architectural/editorial quality;
- soft directional light;
- diverse international professionals presented naturally;
- tactile materials and hospitality cues;
- real Conference Manager UI where possible.

Avoid:
- generic blue-corporate stock imagery;
- forced handshakes and staged smiles;
- futuristic neon/digital-transformation clichés;
- event/concert imagery that shifts category perception toward event management;
- exaggerated luxury;
- fake product UI or fake customer branding.

## 9. Logo and signet

Use governed official assets only.

Rules:
- preserve proportions;
- preserve defined clear space;
- choose contrast-appropriate variants;
- do not recolour arbitrarily;
- do not repeat the signet decoratively across the page;
- treat the Connection & Flow signet as corporate framing rather than a UI icon set.

The current app-icon production direction uses Bordeaux `#7A1F3D` with White `#FFFFFF` and Camel `#C29A6B` signet treatment. Confirm current governed assets before implementation.

## 10. Interaction and motion

Motion must be restrained and purposeful.

- use motion to clarify hierarchy/state, not as decoration;
- respect `prefers-reduced-motion`;
- avoid autoplay video or large decorative animation as a default hero dependency;
- preserve keyboard/focus behavior;
- avoid scroll-jacking and interaction patterns that interfere with native browser navigation.

## 11. Accessibility

Colour, typography, imagery, and interaction must meet the WCAG 2.2 AA target defined by repository standards.

Do not use colour as the only state indicator. Ensure text contrast, link distinction, focus visibility, readable line height, and responsive text scaling.

## 12. Current development sources and supplementary profile

For implementation, read the current root `AGENTS.md`, `docs/CODING-STANDARDS.md`, `docs/CONTENT-GOVERNANCE.md`, `docs/MARKETING-EXPERIENCE.md` and `src/styles/tokens.css` together with this document from the target website repository. Representations of implemented application UI must also follow the current application repository's design system and tokens.

Confluence retains product/brand rationale and historical documentation. It does not override current GitHub development requirements. Reconcile a missing or conflicting approved decision in the owning GitHub repository before implementing the affected material brand change; do not copy private documentation into this public repository.

The optional [Pavurel Web Design profile](https://github.com/floriankreutzer/automatic-engineering-design-skills/blob/1e812a0f0f82cdd2669b5e2d3e5411ea79a5dd1d/skills/pavurel-web-design/SKILL.md) in [skills PR #1](https://github.com/floriankreutzer/automatic-engineering-design-skills/pull/1) helps apply these current sources to an authorized website task. This pinned candidate's acceptance state is recorded in that PR, and the reference does not install it. It must defer to the current repository requirements and tokens, preserve the existing website architecture and avoid a second design specification. Do not apply marketing-site defaults to the authenticated application.


## 13. Shared public-page heroes

All localized public pages use `PageIntro.astro` for the eyebrow, single page title,
lead and optional reading/action metadata. Use the shared `page-hero` layout for the
space below navigation and before the following content. `page-hero--split` places
an image, offer or form beside the intro when there is enough space; both columns
start at the same top edge. Content can grow without a fixed hero/text height.

The semantic `--page-title-*` and `--page-hero-*` tokens in `src/styles/tokens.css`
own the responsive type scale, readable widths, spacing and image height. All detail-page hero
photographs use `page-hero__media`, the same height at the same viewport and the
existing BrandVisual geometry without additional padded frames. Image width and
motif may vary. Below the shared breakpoint, copy precedes the media in normal flow.
Page titles remain complete, selectable text with natural wrapping in both locales.

Text-led destinations (Insights index, demo access) and functional side panels
(setup/pilot, demo request) share the intro hierarchy without decorative hero images.
The article's back link and publication dates are metadata below its lead, preserving
the shared title position. Homepage emphasis and its labelled illustrative preview
remain specific to that page. The photo-led homepage exception below keeps the title
scale but deliberately uses its own full-width image geometry.

`src/styles/page-hero.css` owns shared geometry and media sizing. It is deliberately
unlayered. BrandVisual's intrinsic defaults are in the components cascade layer,
so the shared hero media contract wins over its scoped aspect-ratio/height rules.
Layering and Astro's generated scope selectors must be checked in the rendered CSS,
rather than assuming that a more descriptive selector wins. Keep the scope limited to the hero media wrapper;
supporting images elsewhere retain their existing aspect ratios.

Protect actual rendered relationships with `e2e/hero-consistency.spec.ts`: every
localized route, comparison with the same-width product page, shared intro top edge,
image height, containment, narrow reflow, zoom-equivalent width and static/no-JS
content. Token/source checks alone do not establish visual consistency. Preserve the
existing critical journey, font, accessibility, security and publication checks.


### Homepage photo hero exception

The EN/DE homepage intentionally uses a viewport-wide photograph with the existing
localized title, lead and action over it. Shared Manrope/Inter typography remains;
`home-hero.css` owns its full-width geometry and tokenized dark scrim. The text sits
in normal flow so long German copy and zoom expand the hero rather than clip it.
The image is an absolute background sibling, never the source of content height.
White text and the pale warm outcome accent require a dark scrim; keyboard focus
remains white and visible. Below 72rem the illustrative preparation card is hidden
to avoid competing with the text. Other sections retain the content-width container;
all detail-page heroes retain their common height and alignment contract.
