# Conference Manager Website — Repository Structure

## Purpose

The repository is organized by responsibility and trust boundary. The structure intentionally separates public page composition, reusable presentation, website features, pure domain rules, serverless processing, delivery tooling and tests.

## Top-level structure

```text
conference-manager-website/
├── .github/                  # PR template and governed CI/deployment workflows
├── docs/                     # architecture, engineering and operating documentation
│   ├── adr/                  # architecture decision records
│   └── github/               # GitHub governance artefacts
├── e2e/                      # Playwright public-journey regression tests
├── functions/                # public server-side trust boundaries
│   └── demo-request/         # bounded demo-request processing function
├── scripts/                  # repository/CI tooling grouped by responsibility
│   ├── deployment/           # delivered-site deployment contract and verifier
│   └── performance/          # deterministic static-build performance gates
├── src/                      # Astro website source
├── AGENTS.md                 # repository-wide mandatory contributor instructions
└── package.json              # standardized developer/CI commands
```

## `src/` responsibilities

```text
src/
├── assets/                   # governed source assets
├── components/               # reusable presentation components
│   ├── editorial/            # shared editorial-story presentation only
│   └── navigation/           # site navigation presentation
├── config/                   # typed public/runtime configuration
├── content/                  # Astro content collection records
├── domain/                   # independently testable rules
├── features/                 # bounded website use cases/orchestration
│   ├── demo-request/
│   ├── insights/
│   ├── integrations/         # qualified integration narrative
│   ├── pricing/              # governed pre-pricing narrative
│   ├── product-story/        # Product / How it works editorial narrative
│   ├── security-trust/       # evidence-led public trust narrative
│   └── workplace-teams/      # Workplace Team buyer narrative
├── i18n/                     # localized customer-facing content/contracts
├── layouts/                  # page-level composition and layout contracts
├── pages/                    # Astro filesystem routes; route composition only
└── styles/                   # global design tokens/foundations
```

## Placement rules

Use these rules when adding code:

- `pages/` owns routing, static-path selection and high-level route composition. Do not put substantial presentation or domain logic there.
- `layouts/` owns page-level composition/templates that are reused by locale routes or route variants.
- `components/` owns reusable presentation pieces. `components/editorial/` may own presentation shared by multiple editorial features, but it must not own buyer/product/security/integration/pricing content or feature orchestration. Do not create `components/pages`, `components/misc`, `components/common` or generic dumping grounds.
- `features/` owns bounded user-facing use cases that combine presentation and orchestration. `product-story/` owns Product / How it works content composition; `workplace-teams/` owns the Workplace Team buyer destination; `security-trust/` owns the evidence-led public trust destination; `integrations/` owns qualified public integration content; `pricing/` owns governed pre-pricing content while commercial approval remains external to the website. Their localized content remains separate even when they reuse the same editorial presentation component.
- `domain/` owns framework-independent rules where practical.
- `config/` owns typed environment/public configuration contracts.
- `functions/` is a separate server-side trust boundary and follows `functions/AGENTS.md` in addition to the root instructions.
- `scripts/` contains repository tooling only and must be grouped by a stable responsibility such as `deployment/` or `performance/`; do not accumulate unrelated scripts at its root.
- `e2e/` contains cross-route/browser acceptance tests rather than unit-level rules.

## Dependency direction

Preferred direction:

```text
pages -> layouts/features -> components
                 |             |
                 v             v
              domain/config/i18n

functions -> function-local validation/transport
scripts   -> repository/build/deployment artefacts
```

Avoid reverse coupling from domain/config into Astro page components, and avoid importing `functions/` into browser-facing `src/` code.

## When to introduce another directory

Create a new directory only when it represents a stable responsibility with multiple related artefacts or a materially distinct trust/operational boundary. Do not create directories solely to reduce line counts.

Material platform or boundary changes still require the ADR process defined by root `AGENTS.md` and `docs/ARCHITECTURE.md`.
