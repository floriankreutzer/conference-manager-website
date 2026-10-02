# Public Repository Boundary

## Status

`conference-manager-website` is intentionally public. SaaS 3.9 issue #253 hardens this public-content boundary and #252 moves the supported public Demo landing surface out of the application source repository.

This document records the approved target boundary; implementation and cutover evidence remain owned by the milestone issues.

## Allowed content

This repository may contain:
- public website implementation and assets;
- approved public product, company, trust and integration content;
- public SEO/metadata and localized content;
- public Demo/contact conversion surfaces;
- the implemented static public Demo landing surface;
- public deployment configuration that contains no secret or confidential values.

## Prohibited content

Do not store:
- application/backend source that belongs to `conference-manager` or `conference-manager-api`;
- credentials, tokens, private keys, connection strings or production secrets;
- customer/Tenant data or production payloads;
- internal security findings or incident material;
- internal operational runbooks;
- private-only architecture/topology information not required for public operation;
- provider/commercial research or internal product planning that has not been approved for publication.

## Demo landing boundary

The public Demo landing surface is implemented as a static navigation surface only. Final cutover from the legacy application-repository launchpad remains gated by #252/#254 acceptance. It must not become an application runtime, identity/session boundary, API proxy, persistence layer or authorization layer. Customer and Platform Demo applications continue to use their separately hosted, separately authenticated runtime boundaries.

## Publication controls

Public content must follow `docs/CONTENT-GOVERNANCE.md`. Repository CI should enforce secret/content controls where practical. Server-side public functions require least privilege, positive input validation, abuse/rate controls where appropriate, safe logging and data minimization.

Changing application repository visibility must not be used as a reason to move trusted application logic into this public repository.
