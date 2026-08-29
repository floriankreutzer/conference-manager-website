# Governed font assets

This directory contains the production-approved self-hosted font assets for the public Conference Manager website.

Approved typography roles:

- Manrope — display / brand headlines
- Inter — body / navigation / controls / functional text

No runtime CDN or external font service is permitted by the current website architecture. The CSS keeps system-font fallback chains so content remains usable if a local font request fails.

## Accepted sources

The binaries are unmodified upstream WOFF2 assets pinned to immutable Git commits:

- Manrope 4.504 — `aaronbell/manrope` commit `6f81ebecdf65e4463b798cc07b16a4f8d5216917`
  - `Manrope-Regular.woff2`
  - `Manrope-Bold.woff2`
  - `Manrope-ExtraBold.woff2`
  - exact upstream `OFL.txt` retained as `LICENSE-MANROPE.txt`
- Inter 4.1 — `rsms/inter` commit `66647c0bbbe41a850d79d9c76fb13add3378940f`
  - `InterVariable.woff2` with normal weight axis 100–900
  - exact upstream `LICENSE.txt` retained as `LICENSE-INTER.txt`

Google Fonts source metadata identifies these upstream commits and records Latin/Latin Extended coverage. The Manrope upstream README also explicitly lists German support. Exact SHA-256 values, source URLs and acquisition metadata are recorded in `manifest.json`.

## Manifest gate

`manifest.json` is the machine-readable acceptance record checked by `npm run test:fonts`.

With `status: accepted`:

- every WOFF2 file must be declared exactly once;
- each file must have an approved family and complete provenance metadata;
- the committed license file must exist;
- English and German coverage evidence must be declared;
- SHA-256 is recalculated from the repository bytes and must match the manifest;
- both approved families must remain represented.

CI and production deployment both execute the manifest verifier. Replacing, adding or deleting a binary without updating and re-validating its provenance fails closed.

## Loading policy

`src/styles/fonts.css` contains local-only `@font-face` declarations with `font-display: swap`. No font is preloaded by default; preload may only be introduced after measured evidence shows a net benefit. Browser regression tests verify same-origin loading, German glyph readiness and usable fallback behavior when all WOFF2 requests fail.
