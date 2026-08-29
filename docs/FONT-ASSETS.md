# Conference Manager Website — Font Asset Governance

## Purpose

This document defines the acceptance contract for production font assets used by the public Conference Manager website.

The approved typography roles remain:

- **Manrope** — display and brand headlines
- **Inter** — body copy, navigation, controls, forms and other functional text

The repository currently uses these names only as preferred CSS family tokens with system-font fallbacks. Production self-hosted font files must not be referenced by `@font-face` until the exact files have passed the provenance checks below and are committed as governed assets.

## License baseline

Both approved families are distributed under the **SIL Open Font License 1.1 (OFL-1.1)** by their upstream projects/distributions.

### Inter

Authoritative project/distribution references:

- upstream project: `https://github.com/rsms/inter`
- project site: `https://rsms.me/inter/`
- Google Fonts metadata: `https://github.com/google/fonts/tree/main/ofl/inter`
- license: SIL Open Font License 1.1

Google Fonts records the family as Inter, designer Rasmus Andersson, license `OFL`, and points to the `rsms/inter` source repository. The production asset record must pin the exact Inter release or source commit from which the self-hosted files were obtained.

### Manrope

Authoritative project/distribution references:

- Google Fonts family: `https://github.com/google/fonts/tree/main/ofl/manrope`
- verified active upstream documented by Google Fonts: `https://github.com/aaronbell/manrope`
- license: SIL Open Font License 1.1

The historical copyright/source reference `https://github.com/sharanda/manrope` is no longer an active repository. Do not use that deleted location as the sole provenance reference. Google Fonts documents the active `aaronbell/manrope` fork and a byte-level match for the Manrope variable-font source used in its distribution.

## Required production asset record

Before any font binary is committed, record all of the following for each file:

| Field | Required evidence |
| --- | --- |
| Family | `Manrope` or `Inter` |
| Exact filename | Final repository filename |
| Format | Prefer `WOFF2` for web delivery |
| Style | Normal / italic as applicable |
| Weight or variable axis | Exact supported weight range / axes |
| Upstream source | Canonical project or approved distribution |
| Version | Upstream release/version when available |
| Source commit | Immutable commit SHA when source is Git-based |
| Acquisition date | ISO date |
| SHA-256 | Hash of the exact binary committed |
| License | `OFL-1.1` |
| License file | Exact license text/source accompanying the asset set |
| Language coverage | Evidence that required English and German glyphs are present |
| Modification state | Unmodified or description of permitted derivative work |
| Reviewer | Person/role accepting provenance for production use |

Do not accept a binary based only on a filename, a browser download, a design-tool export, a CDN URL, or an unpinned third-party package.

## Repository layout after approval

When the exact assets are accepted, use a dedicated governed directory such as:

```text
src/assets/fonts/
├── README.md
├── LICENSE-INTER.txt
├── LICENSE-MANROPE.txt
├── <approved Inter WOFF2 files>
└── <approved Manrope WOFF2 files>
```

The actual filenames must be taken from the accepted binaries; do not invent names in advance.

## Loading policy

After assets are approved and committed:

1. Add explicit `@font-face` declarations with local repository URLs only.
2. Use `font-display: swap` unless measured evidence supports another accessible strategy.
3. Declare only the weights/styles actually used by the site.
4. Prefer variable fonts when they reduce total transfer cost without browser or rendering regressions.
5. Do not load Google Fonts, rsms.me, a CDN, or another external font service at runtime.
6. Do not preload every font. Preload only a measured critical asset when LCP/CLS evidence shows benefit.
7. Keep the existing system fallback chain so the site remains usable if a font request fails.
8. Preserve complete English and German glyph coverage. Subsetting requires explicit evidence that required punctuation, symbols and extended Latin glyphs remain available.

## Validation required with the font PR

The pull request that introduces the real binaries must provide:

- SHA-256 verification against the recorded asset manifest;
- license/provenance review;
- `npm run check`;
- `npm run lint`;
- `npm run format:check`;
- `npm test`;
- `npm run build`;
- `npm run test:performance`;
- `npm run test:e2e`;
- browser verification that no external font request occurs;
- fallback-font verification with font requests blocked;
- visual review for English and German;
- CLS/LCP comparison before and after font activation;
- accessibility review at 200% zoom and representative mobile/desktop widths.

Any font files that push the build over the repository performance budget must be optimized or the budget change separately justified with evidence. A font addition is not by itself justification to relax a budget.

## Current status

Repository preparation: **complete**.

Production font activation: **blocked pending exact governed font binaries, immutable version/source evidence, hashes and final asset review**.

Until that acceptance is complete, the existing CSS tokens intentionally fall back to locally available/system sans-serif fonts and must not reference missing font files.
