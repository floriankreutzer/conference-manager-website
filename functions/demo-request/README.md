# Demo request serverless function

This directory is the trusted public-processing boundary for the `Book a demo` form defined by ADR 0003 / Confluence ADR-008.

## Runtime contract

- Target runtime: Scaleway Serverless Functions, Node.js.
- Handler: `functions/demo-request/handler.handle` when packaged with this directory structure, or `handler.handle` when this directory is the function package root.
- HTTP method: `POST` only.
- Content type: `application/x-www-form-urlencoded` only, matching the static HTML form without requiring browser JavaScript.
- Success response: `202 Accepted` with a generic result. Native browser navigation can receive localized HTML; JSON remains the default representation.
- Validation/user errors are generic and do not reflect submitted content.
- Provider/configuration failures return `503` with a generic body and `Retry-After: 60` without exposing infrastructure details.

Scaleway's function event contract provides `httpMethod`, `headers`, `body` and `isBase64Encoded`; the implementation parses only the fields needed by the approved form.

## Native browser completion

The form continues to submit a normal URL-encoded POST without client JavaScript or CORS. When the request's `Accept` header explicitly prefers `text/html` over JSON, the function returns a complete HTML result document. Missing headers, wildcards alone, equal preferences, JSON preference and malformed negotiation retain the JSON response. Specific media ranges take precedence over wildcards.

The document uses the allowlisted `en` or `de` locale from the bounded form body, with English as the fallback. A single function-owned bilingual catalogue supplies the result title and next-step instructions; it contains no submitted values or operational details. The function remains independently packageable.

- `202` confirms acceptance for processing, not mailbox delivery or a booked appointment. Honeypot rejection retains the same generic accepted result without sending mail.
- `400` asks the visitor to check the form using the browser's Back navigation.
- `405` and `415` direct the visitor to the normal demo form.
- `503` says that processing cannot be confirmed and asks the visitor not to immediately resubmit. The existing `Retry-After: 60` and no-automatic-retry semantics remain unchanged.

Result pages contain no scripts, resubmit controls, automatic refresh, external assets, redirects or request-derived navigation URLs. The native browser's Back navigation provides the return path. HTML responses are non-cacheable and non-indexable, suppress referrers and MIME sniffing, and use a deny-by-default CSP with a SHA-256 allowance only for the constant layout stylesheet. This standalone response uses the website's native system-font fallback without introducing a second brand palette or loading font assets from another origin.

The existing JSON status codes and bodies remain unchanged. `Vary: Accept` identifies the representation choice; no provider configuration or form data is exposed in either representation.

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
5. exercise valid, invalid, oversized, honeypot, explicit provider-rejection and ambiguous timeout/network-failure paths, including the existing JSON and localized browser results;
6. confirm logs contain no unnecessary personal form content;
7. confirm the functional mailbox receives the expected plain-text message;
8. configure the approved privacy URL;
9. run browser E2E against the real endpoint before public activation, including the localized completion and recovery instructions. Do not add an unapproved valid submission to the explicit single-delivery acceptance procedure.

## Repository regression evidence

`npm run test:e2e` retains the existing disabled-form website suite and also exercises a separately built, actively configured form. The active suite uses a synthetic HTTPS endpoint intercepted by Playwright and passes the native POST to this handler with a mocked email transport. It checks the JavaScript-free document transition and localized success/error results without sending real email. The active test build is isolated from the normal `dist/` deployment artifact.

Unit tests cover content negotiation, language selection, constant output and security headers alongside the existing validation, honeypot, JSON and provider-failure contracts. These fixtures do not prove real Scaleway, rate-limit, privacy, provider or mailbox acceptance; issue #25 remains the operational gate.
