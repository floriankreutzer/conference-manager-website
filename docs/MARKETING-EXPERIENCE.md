# Conference Manager Website — Marketing Experience

## 1. Purpose and audience

This document records the implemented public website experience. It complements the content,
design, SEO and architecture standards; it does not create another application runtime.

The primary audience is **office and conference teams in mid-sized companies**. Employees and IT
are supporting audiences. The launch experience is complete in English and German; German copy
uses professional `Sie` address.

The website explains four recognisable problems: repeated emails and follow-up questions,
missing guest/catering/equipment information, unclear changes or progress, and coordination
between teams. Benefits are qualitative; no unsupported time saving or customer metric is used.

## 2. Product and brand hierarchy

- **Conference Manager** is the product; **by Pavurel** is the subordinate endorsement.
- Pavurel combines operational precision with warm workplace hospitality.
- Existing room reservation systems retain responsibility for reservations. Supported connections
  and customer setup determine the available scope.
- Microsoft work accounts and configured application roles are explained after the meeting value.

Legal, trademark and domain status remains governed outside this public repository. Visual use
does not imply registration or legal ownership.

## 3. Homepage narrative

The implemented order is:

1. A meeting outcome, a concise explanation of the software and its relationship to the
   existing room-booking system, and a link to the example further down the page.
2. Six descriptive icons for the request, guests, room/equipment, catering, changes and coordination.
3. Four everyday coordination problems paired with the corresponding benefit.
4. An interactive, explicitly illustrative meeting example: request, coordination and change.
5. A shared-process map for room reservations, Microsoft sign-in, caterer coordination and optional
   visitor-system assessment; separate catering spreadsheets and forms can be replaced.
6. Short employee, office/conference and service-team responsibilities, linked to the team page.
7. One compact, qualified setup-and-pilot offer, linked to its full detail page.
8. A deeper security/trust link for IT questions.
9. A final demo action based on the visitor's own meeting process.

The homepage does not repeat the six-item overview as a second feature grid, reproduce the
complete introduction timeline, or repeat detail-page explanations as an additional FAQ.

The example is an explanatory website component, not a live application or a screenshot. Its
three states retain the same workshop. The final state changes both participant count and
catering quantity; it does not claim that all participant changes require review, or that only
cost, service or deadline effects can trigger review. All three sections remain readable without
JavaScript. With JavaScript, native buttons gain synchronized tab semantics and keyboard controls.

## 4. Information architecture and conversion

Primary navigation has four destinations:

- How it works / So funktioniert es;
- For your team / Für Ihr Team;
- Integrations / Integrationen;
- Setup & pilot / Einführung & Pilot.

Existing localized routes remain stable. Product, company, security/trust and Insights remain
crawlable in the footer. The mobile menu is progressively enhanced; the complete navigation is
available without JavaScript.

**Book a demo / Demo anfragen** remains the primary conversion. Its placement is deliberately
limited: one link in the global header and one additional closing action on the homepage and
setup/pilot page only. The demo-request page omits the redundant header self-link; its form remains
the action. No hero, inline feature section, other page closing or footer repeats the demo-request
link. A different label pointing to the same request route is still a demo CTA.

**See how it works / So funktioniert es** in the homepage hero links to the single interactive
example further down that page. Detail pages use descriptive links to the next relevant content.
**Sign in / Anmelden** is the separate, centrally configured application handoff.

The demo form retains its existing fields, POST contract, validation limits, honeypot, privacy
acknowledgement and configuration gate. This redesign does not activate a missing endpoint or
claim successful submission when processing is unavailable.

The detail pages continue the same customer journey in both languages:

| Stable route              | Customer purpose                                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Homepage                  | Introduce the outcome and four pains, show the single illustrative meeting example, and signpost detail pages.  |
| `product`                 | Explain the request information, catering catalogue and supported changes; link to integration details.         |
| `how-it-works`            | Explain information hand-offs, preparation responsibilities and change decisions; link to the homepage example. |
| `workplace-teams`         | Explain the responsibilities of employees, office/conference teams, service teams and customer IT.              |
| `integrations`            | Explain existing-system ownership, available connections, prerequisites and separately assessed paths.          |
| `pricing`                 | Own the complete setup/pilot offer and the introduction steps, with one final demo invitation.                  |
| `company`                 | Explain Pavurel's work, the customer's contribution and later adjustments.                                      |
| `security-trust`          | Address access, meeting data, data exchange and the evidence to assess before setup.                            |
| `insights`                | Help the reader choose an article, without an additional sales panel.                                           |
| Existing Insights article | Provide a practical meeting-preparation checklist and link to the workflow for product detail.                  |
| `demo`                    | Open the separate product demo with synthetic data and distinguish it from a customer pilot.                    |
| `book-a-demo`             | Collect the request and prepare the conversation; retain only a compact qualified offer note.                   |

Product, workflow, team, company and trust pages share a presentation-only editorial layout with
a clear hero, responsive Pavurel image, icon-based section links and a compact, light next-reading
section. The shared layout does not insert hero actions. Only the homepage renders the interactive
meeting example; workflow and article pages add information instead of replaying its 12-to-18-person
story. Brief context for direct page arrivals is useful, but detailed explanations have one primary
home and are linked from elsewhere. The German footer and destination use `Für Ihr Team` and
`Sicherheit & Vertrauen`.

Insights preserve their published routes, bilingual pairing and original publication date. A
separate updated date records editorial revisions. Native contents links use the rendered Markdown
heading IDs and continue with relevant reading links.

The direct `demo` route remains intentionally noindex and outside the sales navigation. Its
existing customer and platform destinations remain fixed HTTPS handoffs. The platform link is
available in a closed native `details` disclosure for the separate platform-operations audience.
Neither the launcher nor the trust page implies that public demo-request processing is active.

## 5. Agreed introduction offer

The website may describe the following approved offer in both languages:

- One-time paid setup.
- Thirty days of free **software use**, beginning only after setup is complete.
- A configured customer environment with the customer's own real meetings.

The setup fee and completed-setup start condition are disclosed next to every free-use statement.
The pricing page owns the full offer; the homepage and demo-request page use a compact qualified
summary with a link to that page. Other detail pages do not repeat the complete commercial journey.
No monetary amount, billing formula, tier, automatic renewal, refund term, payment due date or
setup duration is inferred. Prices and terms for continued use are discussed separately.

## 6. Capability and integration language

Public copy describes implemented request and catalogue capabilities and qualifies setup and
integration dependencies. The integrations page explains the existing room/Microsoft context,
manual supplier communication recorded by the office team, and separately assessed supplier or
visitor-system connections.

A customer's desired integration is not evidence that a connector exists. Supplier access,
confirmation links, automatic exchanges and visitor registration/check-in are included only after
availability and scope are confirmed. Role wording does not promise automatic company-group
mapping. Participating service teams and responsibilities are agreed during setup.

Pavurel offers setup and later rule adjustments on request. The possible adjustments are agreed
with the customer; this wording does not promise arbitrary workflow configuration or change the
application's authorization model.

Customer examples remain illustrative. No invented customers, logos, testimonials, ROI,
certifications or formal compliance assurances are added.

## 7. Visual system and assets

The implementation keeps the existing Bordeaux, Camel, Ink, Canvas and white tokens, Manrope
headings, Inter body text and 4px control geometry. Editorial photos, restrained borders and
purposeful spacing establish the Pavurel character.

The original signet is preserved. Existing approved AI key visuals and the additional meeting
preparation visual are recorded in the asset READMEs. They are brand illustrations, not evidence
of a real customer site or deployment. Six original SVG icons describe tasks and do not modify
or repurpose the signet.

The English brand tagline keeps its wording and carries an explicit English language
attribute in both locales. The language switch declares the language of its accessible
label separately from the target page's `hreflang`.

Responsive WebP sources have intrinsic dimensions. The hero loads eagerly; supporting images
load lazily. No image CDN, tracking, external embed, UI framework or new package is introduced.
All 24 public localized routes share the `PageIntro` hierarchy. The homepage uses a
full-width photo hero with text over a dark scrim in both locales; detail pages retain
the common `page-hero` spacing and image-height contract.
Image-led heroes share top alignment, responsive image height and an unframed image treatment;
text-led and functional destinations use the same title/lead system. The authoritative
presentation contract is in `docs/DESIGN-SYSTEM.md` and the semantic hero tokens.
Detail pages reuse the same meeting, catering and preparation motifs and original six-icon family.
The photographs illustrate meeting preparation; they do not document customers or software UI.

New or changed functional icons reuse the [canonical Pavurel family](https://github.com/floriankreutzer/conference-manager/blob/main/docs/ICON-SYSTEM.md), whose versioned source assets are maintained in the [product brand asset area](https://github.com/floriankreutzer/conference-manager/tree/main/assets/brand). The current website still renders the six originals described above. The shared working draft and its previews do not establish that the website or application has already adopted every motif.

Social metadata uses the existing approved 1440 × 810 meeting-room image as a shared
fallback, with an absolute URL that includes the configured site base path. English and
German image descriptions are owned by the central site-metadata copy. This is editorial
brand imagery, not a product screenshot or customer proof.

## 8. Accessibility, performance and validation

Native links, buttons and `details` retain browser behavior. Menu state and tab state are
synchronized with actual visibility. Focus remains visible, changes have text labels, the
example can be operated with arrow keys, Home, End and Tab, and layout reflows to narrow screens.
Reduced-motion preferences remain respected.

The navigation and example controllers are external modules. Vite's `assetsInlineLimit: 0`
prevents small controllers from being inlined in the built HTML. The production output must be
checked against the existing restrictive CSP; no unsafe inline exception is introduced.

Regression coverage includes the new offer, qualified integration copy, navigation and language
handoffs, three example states, keyboard behavior, no-JavaScript content, responsive reflow,
Axe, asset loading, metadata and build budgets. An explicit route-wide check protects the allowed
demo-link count and placement in both languages, including the absence of a self-link on the request
form. Automated checks do not establish formal WCAG
conformance, real-user performance, provider acceptance or a production deployment.

## 9. Architecture and publication

The site remains Astro + TypeScript, static first, with repository-owned localized content and
the existing application and demo-request boundaries. No new hosting or architecture decision
is introduced. Existing CI, review, deployment and operational publication gates remain in force.
