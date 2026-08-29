# Conference Manager Website — Font Asset Governance

## Purpose

This document defines the acceptance contract for production font assets used by the public Conference Manager website.

The approved typography roles remain:

- **Manrope** — display and brand headlines
- **Inter** — body copy, navigation, controls, forms and other functional text

Production font assets are self-hosted, provenance-governed WOFF2 files. System-font fallbacks remain part of the runtime contract.

## License baseline

Both approved families are distributed under the **SIL Open Font License 1.1 (OFL-1.1)** by their upstream projects/distributions.

### Inter

Authoritative project/distribution references:

- upstream project: `https://github.com/rsms/inter`
- project site: `https://rsms.me/inter/`
- Google Fonts metadata: `https://github.com/google/fonts/tree/main/ofl/inter`
- license: SIL Open Font License 1.1

The accepted website asset is the upstream `InterVariable.woff2` from Inter 4.1 at immutable commit `66647c0bbbe41a850d79d9c76fb13add3378940f`. Google Fonts source metadata points to this upstream and records Latin/Latin Extended coverage. The exact upstream license text is retained in `src/assets/fonts/LICENSE-INTER.txt`.

### Manrope

Authoritative project/distribution references:

- Google Fonts family: `https://github.com/google/fonts/tree/main/ofl/manrope`
- verified active upstream documented by Google Fonts: `https://github.com/aaronbell/manrope`
- license: SIL Open Font License 1.1

The historical copyright/source reference `https://github.com/sharanda/manrope` is no longer an active repository. Google Fonts documents the active `aaronbell/manrope` source and identifies commit `6f81ebecdf65e4463b798cc07b16a4f8d5216917` as the verified source snapshot. The accepted website assets are the unmodified Regular, Bold and ExtraBold WOFF2 webfonts from Manrope 4.504 at that commit. The upstream README explicitly lists German among supported languages. The exact upstream license text is retained in `src/assets/fonts/LICENSE-MANROPE.txt`.

## Required production asset record

Every accepted file records all of the following in `src/assets/fonts/manifest.json`:

| Field | Required evidence |
| --- | --- |
| Family | `Manrope` or `Inter` |
| Exact filename | Final repository filename |
| Format | `WOFF2` |
| Style | Normal / italic as applicable |
| Weight or variable axis | Exact supported weight/range |
| Upstream source | Canonical project file at immutable commit |
| Version | Upstream release/version |
| Source commit | Full immutable Git commit SHA |
| Acquisition date | ISO date |
| SHA-256 | Hash of the exact binary committed |
| License | `OFL-1.1` |
| License file | Exact upstream license text accompanying the asset set |
| Language coverage | English and German evidence |
| Modification state | Whether bytes are unmodified or derived |
| Reviewer | Review role accepting provenance for repository use |

Do not accept a binary based only on a filename, a browser download, a design-tool export, a CDN URL, or an unpinned third-party package.

## Accepted repository layout

```text
src/assets/fonts/
├── README.md
├── manifest.json
├── LICENSE-INTER.txt
├── LICENSE-MANROPE.txt
├── InterVariable.woff2
├── Manrope-Regular.woff2
├── Manrope-Bold.woff2
└── Manrope-ExtraBold.woff2
```

The selected files match actual website weight requirements without shipping every upstream static weight. Inter's variable normal face covers the functional UI/body weight range; Manrope ships only the display weights used by the current website.

## Loading policy

1. `src/styles/fonts.css` contains explicit `@font-face` declarations with local repository URLs only.
2. `font-display: swap` is used.
3. Only weights/styles currently required by the site are declared.
4. No Google Fonts, rsms.me, CDN or another external font service is loaded at runtime.
5. No font is preloaded by default. Preload requires measured evidence of benefit.
6. Existing system fallback chains remain so the site remains usable if a font request fails.
7. English and German glyph coverage must remain complete. Any future subsetting requires renewed evidence.

## Automated validation

The font implementation is covered by:

- immutable source Git-blob and file-size verification during the governed import;
- SHA-256 verification against `manifest.json` through `npm run test:fonts`;
- exact upstream OFL-1.1 license files;
- `npm run check`;
- `npm run lint`;
- `npm run format:check`;
- `npm test`;
- `npm run build`;
- `npm run test:performance` without relaxing the existing build budget;
- `npm run test:e2e`;
- browser verification that font requests remain same-origin;
- browser `FontFaceSet` checks for Inter/Manrope including German `ÄÖÜäöüß` probes;
- fallback verification with all WOFF2 requests deliberately aborted;
- existing desktop/mobile responsive and automated WCAG A/AA tests.

## Manual release acceptance

Automation does not fully replace human visual/accessibility review. Before the public production launch, retain evidence for:

- English and German visual typography review;
- representative mobile and desktop rendering;
- 200% zoom/reflow review;
- keyboard and screen-reader release checks;
- production-like Core Web Vitals review after the actual delivery stack, cache and Edge configuration exist.

These are release-environment acceptance items and must not be inferred from a local static build.

## Current status

Repository font provenance and activation: **implemented and automated**.

The accepted assets are pinned, licensed, hashed, locally loaded and protected by CI and production deployment verification. No external font runtime request is introduced.

Final public-launch acceptance remains **partial** until the manual visual/accessibility checks and production-like performance evidence listed above are executed in the real delivery environment.
