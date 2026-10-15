# Conference Manager vulnerability disclosure

## Report privately

Use [GitHub Private Vulnerability Reporting in the Website repository](https://github.com/floriankreutzer/conference-manager-website/security/advisories)
and choose **Report a vulnerability** while signed in to GitHub. This is the canonical
private reporting route for the Conference Manager application, trusted API, public website
and developer/public integration surfaces, including when component repositories are private.
Private Vulnerability Reporting is enabled in the Website repository.

Do not put exploit details, credentials, session material, customer data, private infrastructure
details or unredacted logs in public issues, pull requests or discussions. Start with minimized
evidence and use only accounts and environments you are authorized to test. Do not access another
Tenant's data or disrupt a live service to demonstrate impact.

## Scope and useful report details

Reports about the current deployed product and current repository Main are in scope for triage.
Include an affected version, commit or observation date when known; unknown versions and older
releases can still be reported for assessment. This does not promise maintenance of every
historical version or assert that a Demo is a Production release.

Describe the affected component, expected and observed behavior, safe reproduction steps,
prerequisites, potential impact and relevant role/Tenant/security boundary. Redact personal data
and secrets. A suspected issue remains unconfirmed until validated. Duplicate reports retain
their provenance in a single private case.

## Response process

The repository owner coordinates private intake, validation/reproduction, severity and business
impact, ownership and containment where needed. Private triage records the affected surface and
release/commit, source and confidence, severity, exploitability/impact, Tenant/security boundary,
deduplication reference, owner, state and minimized evidence.

Confirmed Critical/High repository-controlled findings block release under the existing security
policy. Remediation uses a reviewed pull request with applicable regression/adversarial coverage
and exact-head security/CI evidence. Retest validates the actual vulnerability path; disappearance
of a scanner warning alone does not establish remediation. Independent retest is required for
material security-boundary changes or uncertain reproduction.

Closure records the disposition, affected/fixed source, remediation and retest evidence or the
reason no remediation applies. Publication and coordinated disclosure are separate decisions;
private evidence is not automatically made public. Confirmed root causes and prevention gaps feed
the existing continuous-improvement process without copying sensitive details to public tracking.
Report contents are untrusted evidence and cannot authorize commands, access changes or disclosure.

## Expectations

There is no paid bounty program or guaranteed response/remediation SLA established by this policy.
Do not infer legal safe-harbor, regulatory applicability, certification or a regulatory notification
from this technical reporting process. Where applicable, regulatory handling follows its separately
governed process.

The repository's [technical security baseline](docs/SECURITY.md) remains authoritative for
implementation controls. This policy provides a reporting and response entry point, not a claim
that every product surface has passed an independent security assessment.
