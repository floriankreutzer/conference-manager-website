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
_by Pavurel_

`by Pavurel` is subordinate and is not part of the official product name.

Current governance status:

- PAVUREL is the preferred corporate-brand candidate;
- SAVELUN is the reserve candidate;
- legal/domain/trademark clearance remains pending.

Do not visually or textually imply registered/legal ownership that has not been cleared.

## 3. Core palette

Current approved product/brand baseline:

| Role          | Value     | Use                         |
| ------------- | --------- | --------------------------- |
| Bordeaux      | `#7A1F3D` | primary brand/action accent |
| Bordeaux dark | `#651D32` | hover/strong emphasis       |
| Camel         | `#C29A6B` | warmth/hospitality accent   |
| Camel dark    | `#A97D4E` | deeper secondary accent     |
| Ink           | `#171717` | primary text/precision      |
| Muted grey    | `#62666B` | secondary text              |
| Canvas        | `#F3F2F0` | warm neutral background     |
| Surface       | `#FFFFFF` | primary surface             |

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

## 12. Canonical strategic sources

Current Confluence sources include:

- `01 – Product Positioning & Brand Playbook`
- `01.1.1 – PAVUREL Product & Commercial Messaging`
- `01.1.2 – PAVUREL Website & Homepage Positioning`
- `01.1.6 – PAVUREL Brand Applications`
- `05.2 – UX & Design Principles`

Before a material brand change, verify those sources and the current product repository design tokens rather than relying on old screenshots or copied values.
