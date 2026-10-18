# Conference Manager Website

Public marketing website for Conference Manager, with English and German product pages, demo information and an application sign-in handoff.

## Technology

- Astro and TypeScript.
- Static rendering with limited client-side JavaScript.
- Localized content, responsive layouts and self-hosted fonts.

The website provides public information. Application authentication, sessions and booking workflows belong to the Conference Manager application and API.

## Requirements

- Node.js 22.22.3 or a compatible Node.js 22 release within the range declared in `package.json`.
- npm.

## Local development

```bash
git clone https://github.com/floriankreutzer/conference-manager-website.git
cd conference-manager-website
npm ci --ignore-scripts
PUBLIC_PREVIEW=true PUBLIC_CM_APP_ORIGIN=https://app.example.invalid npm run dev
```

Use the local URL printed by Astro. The example application origin is deliberately nonfunctional; replace it only with an approved development destination. Preview mode keeps the site non-indexable.

To build and inspect a static preview:

```bash
PUBLIC_PREVIEW=true PUBLIC_CM_APP_ORIGIN=https://app.example.invalid npm run build
npm run preview
```

The generated site is written to `dist/`. A production build requires valid public site and application origins. The demo-request endpoint and privacy URL are optional: leave them unset until demo processing is accepted. Without both values, the demo-request form remains disabled.

## Project layout

| Directory | Responsibility |
| --- | --- |
| `src/` | Routes, components, content and localization |
| `public/` | Static public assets |
| `functions/` | Server-side demo-request processing |
| `e2e/` | Browser journey tests |
| `scripts/` | Asset, performance and validation tools |

## Validation

```bash
npm run check
npm run lint
npm run format:check
npm test
npm audit --audit-level=high
npm run test:fonts
PUBLIC_PREVIEW=true PUBLIC_CM_APP_ORIGIN=https://app.example.invalid npm run build
npm run test:performance
npx playwright install chromium
PUBLIC_PREVIEW=true PUBLIC_CM_APP_ORIGIN=https://app.example.invalid npm run test:e2e
```

These checks cover different parts of the website. They do not by themselves establish production deployment, legal approval or formal accessibility conformance.

## Contributing

Read [AGENTS.md](AGENTS.md), the [coding standards](docs/CODING-STANDARDS.md) and the guidance relevant to your change. Keep public product claims accurate, preserve both languages and use the existing design system.

## Security

Do not publish application credentials, customer data or private operational material. Use the private reporting route in [SECURITY.md](SECURITY.md) for suspected vulnerabilities.

## License

No project-level license file is currently included. Refer to the corresponding notices for third-party fonts, assets and dependencies.
