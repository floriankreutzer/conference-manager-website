# Governed font assets

This directory is reserved for production-approved self-hosted font assets.

Do not add or reference font binaries until the exact files satisfy `docs/FONT-ASSETS.md` and issue #10, including immutable provenance, OFL-1.1 license evidence, SHA-256 hashes, English/German glyph coverage and performance validation.

Current approved typography roles:

- Manrope — display / brand headlines
- Inter — body / navigation / controls / functional text

No runtime CDN or external font service is permitted by the current website architecture. Until governed binaries are accepted, CSS must retain the existing system-font fallback behavior and must not introduce `@font-face` URLs to missing assets.
