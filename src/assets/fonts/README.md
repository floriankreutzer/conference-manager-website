# Governed font assets

This directory is reserved for production-approved self-hosted font assets.

Do not add or reference font binaries until the exact files satisfy `docs/FONT-ASSETS.md` and issue #10, including immutable provenance, OFL-1.1 license evidence, SHA-256 hashes, English/German glyph coverage and performance validation.

Current approved typography roles:

- Manrope — display / brand headlines
- Inter — body / navigation / controls / functional text

No runtime CDN or external font service is permitted by the current website architecture. Until governed binaries are accepted, CSS must retain the existing system-font fallback behavior and must not introduce `@font-face` URLs to missing assets.

## Manifest gate

`manifest.json` is the machine-readable acceptance record checked by `npm run test:fonts`.

While `status` is `pending`:

- `assets` must remain empty;
- no `.woff2` file may exist in this directory.

When the exact binaries are ready for approval, change the status to `accepted` only in the same pull request that adds the files, their OFL license files and complete provenance records. Every WOFF2 file must be declared exactly once and its SHA-256 must match the committed bytes. The accepted manifest must contain both approved families and complete English/German coverage evidence.

CI and production deployment both execute the manifest verifier. A font binary cannot therefore be introduced merely by copying it into this directory.
