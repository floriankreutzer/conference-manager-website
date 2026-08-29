# Demo request serverless function

This directory is the trusted public-processing boundary for the `Book a demo` form defined by ADR 0003 / Confluence ADR-008.

## Runtime contract

- Target runtime: Scaleway Serverless Functions, Node.js.
- Handler: `functions/demo-request/handler.handle` when packaged with this directory structure, or `handler.handle` when this directory is the function package root.
- HTTP method: `POST` only.
- Content type: `application/x-www-form-urlencoded` only, matching the static HTML form without requiring browser JavaScript.
- Success response: `202 Accepted` with a generic JSON body.
- Validation/user errors are generic and do not reflect submitted content.
- Provider/configuration failures return `503` with a generic body and `Retry-After: 60` without exposing infrastructure details.

Scaleway's function event contract provides `httpMethod`, `headers`, `body` and `isBase64Encoded`; the implementation parses only the fields needed by the approved form.

## Secret/environment configuration

All values below are server-side function secrets/environment values. None belongs in Astro public configuration or browser bundles.

Required:

- `SCW_SECRET_KEY` — least-privilege credential permitted to send Transactional Email only as required.
- `SCW_PROJECT_ID` — Scaleway project containing the accepted Transactional Email domain.
- `DEMO_REQUEST_SENDER_EMAIL` — sender on a checked/approved Transactional Email domain.
- `DEMO_REQUEST_RECIPIENT_EMAIL` — approved functional mailbox, never a hardcoded personal address.

Optional:

- `SCW_TEM_REGION` — defaults to `fr-par`; values outside the currently supported allowlist fail closed.
- `DEMO_REQUEST_SENDER_NAME` — defaults to `Conference Manager`.
- `DEMO_REQUEST_RECIPIENT_NAME` — defaults to `Conference Manager Demo`.

Do not log these values.

## Input contract

Accepted fields:

- `firstName`
- `lastName`
- `email`
- `company`
- `companySize`
- optional `message`
- `locale` (`en` or `de`)
- `privacyAcknowledged=true`
- `website` honeypot; must remain empty for humans

Server-side limits are intentionally authoritative even though the browser has UX `maxlength` attributes.

## Email handling

The function sends **plain text only** through Scaleway Transactional Email. Submitted markup is never rendered as HTML. The submitter's validated email is used as `Reply-To`; it is not used as the sender identity.

The provider transport is separated from the HTTP handler so provider response, timeout and network-failure behavior can be tested independently. An explicit non-2xx provider response is treated as a failed create request. A timeout or network failure is classified as **ambiguous** because the remote service may have accepted the create-email POST before the connection failed.

The function therefore does **not automatically retry the create-email POST**. The current Scaleway Transactional Email send API does not expose an idempotency key for this operation, so an automatic retry after an ambiguous failure could create duplicate demo-request emails. After a successful create-email response, Transactional Email owns its own downstream delivery attempts/status lifecycle. A future automatic create retry requires a provider-supported or application-owned idempotency mechanism and an explicit review.

No lead database or CRM is created by this function.

## Anti-abuse

The in-function baseline includes strict method/content-type/schema/size validation and a honeypot. Durable rate limiting must be enforced at the accepted Scaleway public edge/function layer because function-instance memory is not a reliable distributed rate-limit store. Public activation is blocked until that infrastructure control is evidenced under issue #25.

Do not add a third-party CAPTCHA without separate privacy/security review.

## Logging and privacy

The function currently emits no application logs containing submitted field values. Platform operational logs must be configured/minimized during infrastructure acceptance. The launch owner must separately approve:

- processing purpose and privacy notice;
- functional-mailbox access ownership;
- mailbox/email retention and deletion expectations;
- relevant Transactional Email metadata retention.

## Required operational acceptance

Before enabling the Astro form endpoint:

1. provision the function in an approved EU region;
2. configure secrets with least privilege;
3. verify the sending domain (SPF/DKIM/DMARC as applicable);
4. configure edge/function rate limiting;
5. exercise valid, invalid, oversized, honeypot, explicit provider-rejection and ambiguous timeout/network-failure paths;
6. confirm logs contain no unnecessary personal form content;
7. confirm the functional mailbox receives the expected plain-text message;
8. configure the approved privacy URL;
9. run browser E2E against the real endpoint before public activation.
