# Conference Manager Website — SEO Standards

## 1. Purpose

SEO is a product requirement for the public Conference Manager website. It must improve discoverability without weakening factual accuracy, accessibility, performance, or brand clarity.

Primary semantic territory:
- conference management software;
- conference management for workplaces;
- workplace conference management;
- conference coordination;
- Workplace Teams;
- conference services and guest coordination.

Do not optimize the homepage as if Conference Manager were primarily room-booking, desk-booking, event-management, visitor-management, facility-management, or IWMS software.

## 2. Rendering and crawlability

Indexable content should be available as static or server-rendered HTML. Avoid making core page content depend on client-side JavaScript execution.

Every public route must intentionally be either:
- indexable; or
- non-indexable for a documented reason.

Do not accidentally expose preview/staging/campaign/test routes to indexing.

## 3. URL architecture

URLs must be:
- stable;
- human-readable;
- lowercase where practical;
- free of unnecessary query parameters for canonical content;
- consistent across languages.

The localized URL strategy must be explicitly decided before launch. Whichever strategy is selected must keep canonical URLs, hreflang links, sitemap entries, navigation, and redirects aligned.

## 4. Titles and descriptions

Every indexable page requires:
- a unique, descriptive `<title>`;
- a unique meta description appropriate to the page intent;
- metadata in the page language;
- no keyword stuffing or misleading clickbait.

Lead with category/customer language before underlying technology.

## 5. Canonical URLs

Every indexable page must expose one correct canonical URL.

Rules:
- canonical URLs must use the intended production origin;
- do not canonicalize distinct translated pages to one language;
- prevent duplicate URL variants caused by trailing slash, index files, protocol/host variants, or marketing parameters;
- campaign parameters must not create competing canonical content.

## 6. International SEO

For translated equivalents:
- provide valid reciprocal `hreflang` relationships;
- use correct language/region codes;
- ensure the canonical points to the same-language canonical page;
- avoid automatic locale redirects that prevent crawlers/users from reaching other languages;
- allow explicit language switching.

Use `x-default` only when the chosen locale architecture has a genuine default/global landing experience.

## 7. Semantic content structure

Every page should have:
- one clear `h1`;
- logical `h2`/`h3` hierarchy;
- descriptive internal links;
- meaningful page landmarks;
- copy written for humans first.

Avoid hiding important indexable copy in carousels, accordions, or client-only states without a valid UX reason.

## 8. Structured data

Structured data may be used only when:
- it accurately describes visible/current content;
- the entity/type is appropriate;
- required properties are truthful;
- it does not invent ratings, reviews, customers, prices, events, or organization status.

Validate structured data in CI or release checks where practical.

## 9. Sitemap and robots

Production must provide:
- a generated/maintained XML sitemap containing canonical indexable routes;
- a deliberate `robots.txt` policy;
- no staging/preview URLs in the production sitemap.

Staging/preview environments should be protected against accidental indexing using appropriate environment controls, not only a fragile robots file.

## 10. Redirects

Use server/edge redirects where possible.

- permanent URL changes should use an appropriate permanent redirect;
- temporary campaign/maintenance changes should use a temporary redirect;
- avoid redirect chains and loops;
- do not use JavaScript redirects for ordinary canonical routing.

## 11. Social metadata

Indexable marketing pages should define appropriate:
- Open Graph title;
- description;
- canonical URL;
- image;
- image alt text where supported;
- card metadata for relevant social platforms.

Social preview imagery must follow governed brand assets and must not imply unsupported capabilities/customer proof.

## 12. Images

For meaningful images:
- use descriptive alt text aligned with the actual image purpose;
- use descriptive filenames where practical;
- define width/height or aspect ratio;
- optimize file size/format;
- use responsive image sources when useful;
- do not turn key textual content into images.

Decorative imagery uses empty alt text.

## 13. Internal linking and information architecture

The website should make core journeys crawlable through normal links.

Strategic top-level destinations currently include:
- Product;
- How it works;
- Integrations;
- For Workplace Teams;
- Security & Trust;
- Book a demo.

`Login` is a utility/application handoff and is not an SEO landing-page strategy.

## 14. Performance and Core Web Vitals

SEO implementation must protect user-perceived performance.

Prioritize:
- LCP image/font strategy;
- minimal render-blocking resources;
- low JavaScript execution cost;
- low CLS through intrinsic dimensions and stable layout;
- responsive images;
- efficient caching;
- minimal third-party requests.

Once implementation exists, establish measurable performance budgets and automated checks where practical.

## 15. Content quality and evidence

Search visibility does not justify unsupported claims.

Do not publish:
- fabricated statistics/testimonials;
- unsupported “best/leading/#1” language;
- target-state features as live;
- unsupported compliance certifications;
- misleading Microsoft or room-booking category claims.

Follow `docs/CONTENT-GOVERNANCE.md`.

## 16. Release checklist

Before public launch verify at minimum:
- production origin and canonical host;
- index/noindex intent per route;
- titles/descriptions;
- canonical URLs;
- localized route/hreflang integrity;
- sitemap;
- robots policy;
- redirects;
- internal links / 404s;
- structured data validity;
- social previews;
- mobile rendering;
- Core Web Vitals/performance baseline;
- no staging URLs or placeholder content.
