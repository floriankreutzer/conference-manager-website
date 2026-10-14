# Release source inventory and provenance

Tracking: application issue #301. This public repository owns the shared
release-evidence command so application/API workflows can pin it after returning to private.
Its isolated package locks the existing YAML parser family to 2.9.1; install with
`npm ci --prefix scripts/release --ignore-scripts`. It processes source artifacts only; it owns no application business logic or authorization.

`scripts/release/generate.mjs generate OWNER/REPOSITORY` runs npm's native lockfile-only
CycloneDX 1.5 generator with dev/optional/peer dependencies explicitly included and lifecycle
scripts disabled. npm's checkout-directory root display name is normalized to the committed
package name after checking its package URL. Package versions, license data and dependency
relationships otherwise remain the generator's data; missing licenses are not invented.
This inventories npm dependencies, not operating-system/container packages or vulnerability freedom.

The output contains `sbom.cdx.json`, an exact `git archive` source artifact `source.tar`, and
`provenance.json`. The manifest binds source commit/tree, lockfile/source/SBOM SHA-256, actual
Node/npm versions, time, environment class and GitHub workflow/run/attempt identity where present.
Effective YAML is parsed with duplicate-key/tag/alias rejection rather than extracting refs from
comments or shell strings. Moving or unresolved paired refs fail closed. API embedded-frontend/render pins must agree; the permanent acceptance ref and application paired
API ref are extracted from the committed source, validated as immutable and recorded separately.
An API source archive contains its Gitlink, not the embedded frontend's file bytes; its separate
component inventory and exact counterpart acceptance remain required. This is not a deployed image
or an assertion that the source candidate is already running in Production.

`scripts/release/generate.mjs verify OWNER/REPOSITORY EXPECTED_COMMIT` requires the independently
chosen exact checkout commit, recreates its archive and lock digest, verifies the committed
counterpart refs and regenerates the complete inventory with the recorded npm version. Component versions, dependency graph, licenses and other inventory fields must match; only the volatile document UUID and inventory timestamp are excluded from semantic comparison. Raw-byte digests and signatures still bind those fields. Source identity, archive, lock, tree and inventory mutations are rejected. Build/time claims additionally require independent attestation or trusted GitHub run/artifact evidence. Do not take the expected identity
from the manifest being verified. The actual CLI tests exercise positive generation, wrong commit,
changed artifact bytes and a changed lock binding; additional negative cases cover metadata and refs.

The Release source evidence workflow generates an inventory on PRs/Main and retains its artifact
for three days. Generation/integrity failures fail the job. On public Main only, a separate job
uses narrowly scoped GitHub OIDC/attestation permissions and the immutable official attest Action;
it signs all three outputs and verifies them with `gh attestation verify`, the expected repository,
signer workflow and source digest. Actual tampered-byte and wrong-source signature rejection are
required. PR/fork jobs receive no signing permission. No external signing key or paid service is added.

GitHub Free/Pro/Team native attestations are unavailable for private repositories. After the planned
private-source restoration, those components still generate and verify the manifest/archive/SBOM,
but the signing job is explicitly inapplicable. Their fallback integrity depends on independently
verified GitHub run/artifact digests and exact committed source; it is not a cryptographic signature
or equivalent builder isolation. Record the achieved mode for every release; do not claim SLSA level.

Export required minimized SBOM/manifest/attestation and source/CI references before the specific
three-day artifact expiry to the approved protected evidence destination. Source archives can be
recreated from their immutable commits; do not copy private source, credentials, customer content,
deployment secrets or private operational payloads into a public inventory or report. Existing
dependency, secret, SAST, regression, branch and deployed/recovery gates remain independently required.
