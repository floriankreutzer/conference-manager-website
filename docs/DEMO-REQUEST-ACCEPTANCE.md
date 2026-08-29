# Demo Request — Operational Acceptance

## Purpose

This runbook defines the controlled acceptance procedure for the public `Book a demo` processing endpoint from ADR 0003 / Confluence ADR-008 and GitHub issue #25.

The repository implementation is not production acceptance. Real Scaleway function, edge/rate-limit, Transactional Email, functional mailbox, privacy and logging controls must be evidenced before the public form is activated.

## GitHub environment

Create a GitHub environment named `demo-acceptance` and configure:

- variable `DEMO_REQUEST_ACCEPTANCE_ENDPOINT` — the complete public HTTPS URL of the provisioned demo-request function;
- environment protection/approval appropriate to the operational environment.

The workflow does not require and must not receive Scaleway provider credentials or the functional mailbox address. Those values belong only to the server-side function configuration.

The endpoint value must:

- use HTTPS;
- use a public hostname;
- contain no username/password credentials;
- contain no query string or fragment.

A function path is allowed.

## Default non-destructive acceptance

Run GitHub Actions → **Demo Request Acceptance** with `send_delivery_test=false`.

The workflow verifies:

1. `GET` is rejected with HTTP 405 and `method_not_allowed`;
2. JSON submission is rejected with HTTP 415 and `unsupported_media_type`;
3. incomplete form data is rejected with HTTP 400 and `invalid_request`;
4. the invalid marker is not reflected in the public response;
5. a valid-shaped request with the honeypot populated returns the generic HTTP 202 accepted response.

The default mode does **not** submit a valid request and therefore must not create an email.

If a default acceptance run creates a message in the functional mailbox, treat that as a defect in the honeypot/processing boundary.

## Explicit synthetic delivery acceptance

Only after the non-destructive checks pass, rerun **Demo Request Acceptance** with `send_delivery_test=true`.

This repeats the negative checks and then sends exactly one additional synthetic request using:

- name: `Acceptance Test`;
- email: `demo-acceptance@example.invalid`;
- company: `Conference Manager Acceptance Test`;
- controlled explanatory message stating that it is not a sales lead;
- an approved company-size enum and locale;
- privacy acknowledgement set to true for the synthetic contract test.

A 202 response proves only that the public function accepted the request. Before recording delivery acceptance, manually verify the approved functional mailbox received **exactly one** corresponding acceptance-test message.

Do not use real prospect/customer data for operational tests.

## Provider failure semantics

The server function performs one Transactional Email create request.

- explicit non-2xx provider response: failed create request;
- timeout/network error: ambiguous create outcome;
- no automatic create retry after an ambiguous outcome while no idempotency key is available;
- public failure response: generic `503 temporarily_unavailable` with bounded `Retry-After`;
- after a successful create response, Transactional Email owns its downstream delivery-attempt/status lifecycle.

Operational provider-failure testing must not expose provider response bodies, secret values or submitted personal data in public responses or retained application logs.

## Rate limiting

The repository intentionally does not implement an in-memory distributed rate limiter inside the serverless function. Function-instance memory is not a reliable cross-instance rate-limit store.

Before public activation, configure and test durable rate limiting at the accepted public edge/function layer. Record at minimum:

- configured scope/key (for example source/IP or provider-supported equivalent);
- request window and threshold;
- returned status/behavior when exceeded;
- recovery after the window;
- evidence that legitimate low-volume submissions remain usable.

Do not turn the automated acceptance workflow into a load or denial-of-service test.

## Privacy and logging evidence

Before public activation retain evidence for:

- approved processing purpose and privacy notice URL;
- approved functional mailbox ownership/access;
- email/lead retention and deletion expectations;
- Transactional Email metadata retention relevant to the configured service;
- platform/function logs contain no unnecessary submitted message body, email address or other lead content;
- no analytics, marketing tags or unrelated tracking is introduced by the demo flow.

## Activation gate

Only configure both website production variables below after all operational acceptance points are complete:

- `PUBLIC_DEMO_REQUEST_ENDPOINT`
- `PUBLIC_DEMO_PRIVACY_URL`

The Astro form is deliberately fail-closed when either value is absent or invalid.

After activation, run browser E2E against the real website/function integration and perform the manual accessibility/security release checks required by repository governance.

## Evidence to attach to issue #25

Record:

- provisioned Scaleway region and resource identifiers without secrets;
- IAM/least-privilege review result;
- non-destructive acceptance workflow run;
- explicit delivery workflow run;
- manual exactly-one-message mailbox confirmation;
- rate-limit test evidence;
- privacy/retention/access approval references;
- log-minimization evidence;
- final browser E2E / production-like acceptance evidence.
