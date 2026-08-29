# Serverless Functions — Agent Instructions

These instructions apply in addition to the repository root `AGENTS.md` for every file under `functions/`.

## Boundary

Functions in this directory are public server-side trust boundaries owned by the marketing website. They must not become a substitute for `conference-manager-api` and must not inherit authenticated application authority.

## Mandatory security rules

- Treat every request field, header, body and provider response as untrusted.
- Validate method, content type, request size, field names, field types, lengths and allowlisted values server-side.
- Fail closed on missing or invalid server configuration.
- Keep provider credentials, recipient addresses and other secret configuration server-side only.
- Never log submitted personal form content, credentials, secrets, tokens or provider authorization headers.
- Return generic public errors; do not expose stack traces, provider payloads or infrastructure identifiers.
- Do not render submitted content as HTML. Prefer plain text for outbound email unless a reviewed requirement changes this.
- Keep anti-abuse and rate limiting proportionate to an unauthenticated internet-facing endpoint.
- Do not add persistence, CRM integration, analytics or tracking without the architecture/privacy decision required by root governance.
- Do not call authenticated Conference Manager application APIs with privileged authority for convenience.

## Design and dependency rules

- Keep handlers thin. Separate validation/domain rules and provider transport where practical.
- Prefer platform/runtime capabilities before adding dependencies.
- New runtime dependencies require explicit security, maintenance, license and supply-chain review.
- Environment-specific values belong in deployment configuration, not source literals.

## Testing

Every behavior change requires regression/progression tests covering applicable positive and negative cases, including malformed input, oversized input, unsupported method/content type, missing configuration and provider failure.

Relevant repository validation, secret scanning and CodeQL must pass before merge.
