# Conference Manager Website — Performance Budgets

## Purpose

Performance is a release gate for the public website. The current architecture is static-first Astro with minimal browser JavaScript, so the first enforceable budgets focus on deterministic build output rather than noisy CI timing measurements.

These budgets protect the static delivery baseline and complement, but do not replace, real-user Core Web Vitals monitoring after production launch.

## Enforced static build budgets

`npm run test:performance` validates the generated `dist/` directory after `npm run build`.

Current limits:

- maximum HTML file: 180 KiB
- total CSS: 160 KiB
- total JavaScript: 80 KiB
- maximum individual image: 750 KiB
- total images: 1.5 MiB
- total static build: 3 MiB

The gate prints the largest generated files to make regressions visible in CI.

## Why these limits exist

The limits are intentionally conservative for a mostly static marketing site. They leave room for governed product imagery and bounded progressive enhancement without normalizing a large client bundle or oversized unoptimized assets.

A budget increase is not a routine fix for a failing build. Any increase must be justified in the pull request with the user-facing reason, measured impact, alternatives considered, and resulting performance trade-off.

## Route integrity

Playwright discovers internal links from both localized homepages and requests each internal route. Broken internal navigation therefore fails the browser test suite rather than being deferred to manual launch review.

## Core Web Vitals

Before public production readiness is claimed, representative production-like measurement must cover at least:

- Largest Contentful Paint (LCP)
- Interaction to Next Paint (INP) where meaningful interaction exists
- Cumulative Layout Shift (CLS)

After public launch, real-user or field data should be preferred for operational Core Web Vitals decisions. Introducing a third-party monitoring or analytics product requires the privacy, security and architecture review mandated by `AGENTS.md`.

## Font and image implications

Issue #10 remains the governance gate for self-hosted Pavurel font files. Font assets must be measured against these budgets and tested for CLS/LCP impact before release.

Meaningful images require intrinsic dimensions, correct loading strategy and governed provenance. Adding a large image is not sufficient reason to relax the overall budget without evidence.
