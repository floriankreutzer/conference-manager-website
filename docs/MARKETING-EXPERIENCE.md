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

1. A meeting outcome, concise explanation, existing-system fit and demo action.
2. Six descriptive icons for the request, guests, room/equipment, catering, changes and coordination.
3. Four everyday coordination problems paired with the corresponding benefit.
4. An interactive, explicitly illustrative meeting example: request, coordination and change.
5. A shared-process map for room reservations, Microsoft sign-in, caterer coordination and optional
   visitor-system assessment; separate catering spreadsheets and forms can be replaced.
6. Practical catering, catalogue, supplier response, change, team and setup details.
7. Employee, office/conference team and IT perspectives.
8. Demo, paid setup and 30 days of free software use with real customer meetings.
9. Native FAQ disclosures and a deeper security/trust link.
10. A final demo action based on the visitor's own meeting process.

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

**Book a demo / Demo anfragen** is the primary action. **See how it works / So funktioniert es**
links directly to the homepage example. **Sign in / Anmelden** is the separate, centrally
configured application handoff.

The demo form retains its existing fields, POST contract, validation limits, honeypot, privacy
acknowledgement and configuration gate. This redesign does not activate a missing endpoint or
claim successful submission when processing is unavailable.

The detail pages continue the same customer journey in both languages:

| Stable route | Customer purpose |
| --- | --- |
| `product` | Explain the meeting request, catering catalogue, supported changes and existing-system fit. |
| `how-it-works` | Follow the three request, coordination and change stages using the same illustrative workshop as the homepage. |
| `workplace-teams` | Explain the responsibilities of employees, office/conference teams, service teams and customer IT. |
| `company` | Explain how Pavurel agrees the setup, prepares the customer environment and discusses later adjustments. |
| `security-trust` | Answer buyer questions about sign-in, roles, meeting data and the requirements to assess before setup. |
| `insights` and its article | Explain why meeting preparation needs more than room reservations, with a practical example and links to the demo and integrations. |
| `demo` | Provide the separate product-demo handoff with synthetic example data and clearly distinguish it from the customer pilot. |

Product, workflow, team, company and trust pages share a presentation-only editorial layout with
a clear hero, responsive Pavurel image, primary demo action, icon-based section links and a final
next step. The workflow page reuses the existing accessible example rather than introducing a
second interaction model. The German footer and destination now consistently use `Für Ihr Team`
and `Sicherheit & Vertrauen`.

Insights preserve their published routes, bilingual pairing and original publication date. A
separate updated date records editorial revisions. Native contents links use the rendered Markdown
heading IDs; article-specific summaries do not leak into future articles.

The direct `demo` route remains intentionally noindex and outside the sales navigation. Its
existing customer and platform destinations remain fixed HTTPS handoffs. The platform link is
available in a closed native `details` disclosure for the separate platform-operations audience.
Neither the launcher nor the trust page implies that public demo-request processing is active.

## 5. Agreed introduction offer

The website may describe the following approved offer in both languages:

- One-time paid setup.
- Thirty days of free **software use**, beginning only after setup is complete.
- A configured customer environment with the customer's own real meetings.

The setup fee is disclosed next to the free-use statement, including on the homepage, pricing
and demo pages. Pricing and demo share the typed `getPricingCopy(locale).offer` content block.
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

Responsive WebP sources have intrinsic dimensions. The hero loads eagerly; supporting images
load lazily. No image CDN, tracking, external embed, UI framework or new package is introduced.
Detail pages reuse the same meeting, catering and preparation motifs and original six-icon family.
The photographs illustrate meeting preparation; they do not document customers or software UI.

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
Axe, asset loading, metadata and build budgets. Automated checks do not establish formal WCAG
conformance, real-user performance, provider acceptance or a production deployment.

## 9. Architecture and publication

The site remains Astro + TypeScript, static first, with repository-owned localized content and
the existing application and demo-request boundaries. No new hosting or architecture decision
is introduced. Existing CI, review, deployment and operational publication gates remain in force.
