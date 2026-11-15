# Conference Manager product screenshots

These files show the implemented Conference Manager welcome screen with synthetic
sample data. They are unchanged PNG attachments from the application's repository
tests. The website hosts them as static assets; it does not import application code
or open an application session.

## Source and verification

- Repository: [floriankreutzer/conference-manager](https://github.com/floriankreutzer/conference-manager).
- Source commit: [`43118bff97298edeb2b7f97c32ebbe3067824f30`](https://github.com/floriankreutzer/conference-manager/commit/43118bff97298edeb2b7f97c32ebbe3067824f30).
- Successful [CI run 42928631726](https://github.com/floriankreutzer/conference-manager/actions/runs/42928631726), 11 November 2026.
- Source artifact: [13815783859, `playwright-report-chromium-desktop`](https://github.com/floriankreutzer/conference-manager/actions/runs/42928631726/artifacts/13815783859).
- Artifact ZIP SHA-256: `9ab8ed788791e01c1f236323f0bcf976a7e1830294c57fcb0f9ab558be2abc5f`.
- Existing test: `CO-309: Welcome uses one greeting and Administration opens its editor directly in de/en` in [production-application.spec.js](https://github.com/floriankreutzer/conference-manager/blob/43118bff97298edeb2b7f97c32ebbe3067824f30/tests/e2e/production-application.spec.js#L6925-L6946). The screenshot is attached after the welcome-screen assertions, before navigation to Administration.
- Source and image verification: 15 November 2026. Both language variants were visually inspected.

The image context records a clean checkout of the source commit, the
`chromium-desktop` project, Chromium `156.0.8078.4`, a 1280 × 900 CSS-pixel viewport
and device pixel ratio 1. The full-page PNGs are 1280 × 1242 pixels. The
[repository evidence helper](https://github.com/floriankreutzer/conference-manager/blob/43118bff97298edeb2b7f97c32ebbe3067824f30/tests/e2e/fixtures/customer-screen-evidence.js)
records the source identity and fixture boundary alongside each image.

## Files

| File | Language | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `welcome-de.png` | German | 110557 | `501775b7adc4eb8497463af4c0e976eefb6be3d5567fee1ba448a3f66de0e598` |
| `welcome-en.png` | English | 102404 | `792d595f98287ff5097990027284f99d470c6fdb8064b19b9060772f395a6c9a` |

Original archive paths:

- German: `data/ac3d42385b01e2f51bcd62ebe5d47cd930fb260c.png`.
- English: `data/6d14b7964fe2631d5022354bc3d5849206e8969b.png`.

## Evidence boundary and website use

The test renders the actual application modules and styles through the existing
`installProductionApplicationFixture` with `employee` and `conference_manager`
roles. Its API responses are test-controlled, its visible user is `Demo`, and its
booking overview is empty. The context explicitly records `apiCommit: null` and
`composition: routed-protocol-fixture`. These captures establish the illustrated
frontend state; deployed API behavior, customer adoption and production acceptance
need separate evidence.

- Label the images as product views with sample data. Suitable captions are
  “Conference Manager: Startansicht mit Beispieldaten.” and
  “Conference Manager: welcome view with sample data.”
- Preserve the genuine product UI, its proportions and its existing visual design.
  Do not retouch controls, add customer data or invent booking counts.
- Use the corresponding language variant, localized alternative text and explicit
  intrinsic dimensions. Load below-the-fold placements lazily.
- Keep these governed product assets separate from editorial brand illustrations.
  This provenance record does not grant a general third-party license.
- Retain the local image files and hashes: the upstream CI archive has limited
  retention. Record new source and verification evidence whenever images change.
