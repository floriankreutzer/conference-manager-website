# Conference Manager Website — Marketing Experience

## 1. Purpose

This document records the implemented customer-facing marketing hierarchy for the public Conference Manager website. It complements `CONTENT-GOVERNANCE.md`, `DESIGN-SYSTEM.md`, `SEO-STANDARDS.md` and the repository architecture; it does not create a new runtime or trust-boundary decision.

The public website is a B2B product-marketing surface. It should help a potential buyer understand the workplace problem, product value, operating fit and next step before asking them to evaluate technical architecture.

## 2. Audience and market frame

Primary audience:
- Workplace Managers and Workplace Teams;
- meeting/conference service owners;
- Corporate Services and Office Management;
- Facility/Workplace-adjacent teams involved in professional conference delivery.

Initial commercial focus remains DACH with an English/German experience that is international by design. German public marketing copy uses professional `Sie` address rather than informal consumer-style language.

## 3. Product and brand hierarchy

- **Conference Manager** is the product.
- **by Pavurel** is the subordinate corporate endorsement.
- PAVUREL provides the visual/emotional framing; it does not replace the product name.
- The documented PAVUREL brand idea is **operational precision + warm hospitality**.
- The supporting documented phrase is **Workplace hospitality, thoughtfully managed.**

The website explains this relationship briefly after the core product, audience, integration and trust story. The brand explanation must support product confidence rather than become the hero category.

PAVUREL trademark/company-name/domain clearance remains a separate legal gate. The website must not describe the endorsement as registered or legally cleared without evidence.

## 4. Homepage narrative

Implemented order:
1. category + outcome-led Hero;
2. recognisable coordination problem after room booking;
3. one-request value proposition;
4. simple request-to-ready flow;
5. room-booking integration boundary;
6. employee / Workplace Team dual value;
7. workplace-hospitality quality layer;
8. connected ecosystem / Microsoft qualification;
9. enterprise readiness and evaluation path;
10. PAVUREL endorsement explanation;
11. differentiators;
12. demo conversion.

This order intentionally follows **problem → benefit → experience → existing-system fit → trust → conversion** rather than technology → architecture → feature list.

## 5. Information architecture

Primary navigation is deliberately compact:
- Product;
- How it works;
- For Workplace Teams;
- Integrations;
- Security & Trust.

`Book a demo` is the primary conversion action. `Login` remains a utility handoff for existing users and must not compete visually with the primary conversion.

Pricing and Insights remain normal crawlable destinations but move to the footer/evaluation layer rather than occupying primary navigation. This preserves evaluation depth without overloading the first customer journey.

## 6. Content hierarchy

### Marketing content
Homepage and top-level buyer narratives lead with customer problem, operational outcome and workplace experience.

### Product content
Product / How it works / Workplace Teams explain verified request, room-context, service, catering, lifecycle and management capabilities through buyer outcomes.

### Evaluation content
Integrations, Security & Trust and Pricing retain necessary qualifications and boundaries for IT/procurement evaluation. Technical implementation details are used only where they materially explain risk, authority or availability.

### Brand content
PAVUREL is explained as the corporate endorsement and quality/design principle after the product story is established.

## 7. Visual system alignment with the application

The marketing site keeps a more editorial rhythm than the authenticated application but uses the same product-family geometry:
- standard controls use a 4px radius;
- small shape tokens are 2px / 3px / 4px;
- large editorial surfaces may use an 8px radius where hierarchy benefits;
- pill-shaped primary buttons are prohibited;
- cards use restrained borders/elevation rather than generic floating SaaS panels;
- control height aligns to the application baseline of 44px.

The colour and type system remains PAVUREL Bordeaux/Camel/Ink/Canvas with Manrope for display and Inter for functional/body copy.

## 8. Governed brand assets

The website uses the exact PAVUREL Connection & Flow signet copied from the reviewed Conference Manager application brand package. Provenance is recorded in `src/assets/brand/README.md`.

Do not substitute text-drawn logo geometry or reconstruct the signet from screenshots/brand boards.

The Corporate Master and Confluence Visual Identity System define a premium contemporary workplace/hospitality photography direction. The retained master layouts explicitly contain replaceable image areas; they are not by themselves production-photography provenance. Until an approved production photograph is available as a governed repository asset, the website must not fabricate an "official PAVUREL" photograph or use a composite identity-board mockup as customer evidence.

## 9. Claim discipline

Retain the approved truths:
- Conference Manager is not another room-booking system;
- existing room-booking capability remains authoritative for the reservation;
- Microsoft 365 / Entra are the current enterprise integration focus, subject to configuration/acceptance;
- future providers are not current product claims;
- no public price before commercial approval;
- no unsupported certification/compliance/security assurance;
- no invented customers, testimonials, ROI or usage numbers.

## 10. Conversion

Primary CTA: **Book a demo / Demo anfragen**.

Secondary CTA: **See how it works / So funktioniert es**.

The demo story asks the buyer to bring one real conference journey and discuss where information currently moves between people, room booking and workplace services. It should not default to a generic feature tour.

## 11. Accessibility, responsive design and performance

The refactor preserves the existing WCAG-oriented automated gates and adds regression coverage for the customer narrative, brand identity and product-family control geometry. Navigation wraps deliberately on narrower screens rather than relying on a desktop-only horizontal navigation strip.

The governed SVG signet has intrinsic dimensions and is bundled with the static site. No tracking, remote brand asset, image CDN or new runtime dependency is introduced.

Photography added later must follow the repository image-performance and provenance requirements, including responsive dimensions, optimized formats, intrinsic sizing and appropriate lazy/eager loading.

## 12. Architecture decision status

No ADR is introduced by this marketing refactor. The implementation remains inside the existing Astro/static-first architecture, repository-owned content model, login handoff, demo-request boundary and PAVUREL candidate publication governance.
