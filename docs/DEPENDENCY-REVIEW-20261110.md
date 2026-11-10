# CO-320: bounded development-tool dependency correction

## Source and advisory

Reviewed baseline: Website Main
`482cb3dec0bc31587f2bd0631c7b1d525befbe01`, tree
`8db5d0c3fb51b817c9d416cb64e238af7425e695` (10 November 2026).

The lock resolves one development-only `minimatch@10.2.6`.
[GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)
covers versions from 7.0.0 through versions below 11.0.1. It describes excessive
pattern expansion when optimization level 2 receives attacker-controlled patterns.
The finding is retained; this review does not claim an observed website exploit
or browser-runtime exposure.

## Published parent versions and upstream development

| Consumer in the current lock | Reviewed published update | Published minimatch range |
| --- | --- | --- |
| `eslint@10.9.1` | [10.14.0](https://github.com/eslint/eslint/blob/v10.14.0/package.json) | `^10.2.6` |
| `@eslint/config-array@0.23.5` | [0.23.5](https://github.com/eslint/rewrite/blob/config-array-v0.23.5/packages/config-array/package.json) | `^10.2.4` |
| `@typescript-eslint/typescript-estree@8.68.0` | [8.72.2](https://github.com/typescript-eslint/typescript-eslint/blob/v8.72.2/packages/typescript-estree/package.json) | `^10.2.2` |

Those published releases do not remove this advisory. Upstream development has
already migrated the dependency in
[ESLint](https://github.com/eslint/eslint/commit/7c7292ef4433c3291a5f2defefe3e1cfa32cc063),
[config-array](https://github.com/eslint/rewrite/commit/52ab336d273aa070af271a749057fc9845a92377)
and [typescript-estree](https://github.com/typescript-eslint/typescript-eslint/commit/837401e92d7379a8623ccf6a0883250f4e706ad7).
A development commit is not a published compatible parent release.

The bounded candidate keeps all direct dependency versions and the existing
`devalue` override. It overrides minimatch to exactly `11.0.5` only beneath
the three exact current parent versions above; there is no global minimatch
override, audit ignore, forced downgrade or manually constructed lock integrity.

## Compatibility, license and footprint

[Minimatch 11.0.5](https://github.com/isaacs/minimatch/blob/v11.0.5/package.json)
supports Node 20 or >=22, including the unchanged Website Node 22.22.3.
Its BlueOak-1.0.0 license is unchanged from the current locked minimatch.
Its [changelog](https://github.com/isaacs/minimatch/blob/v11.0.5/changelog.md)
documents API removals and further bounded expansion corrections; this is a
reviewed major transitive update, not an assumed patch-compatible substitution.

The exact consumers use retained APIs:

- [ESLint 10.9.1](https://github.com/eslint/eslint/blob/v10.9.1/lib/eslint/eslint-helpers.js):
  `Minimatch`, `pattern`, `match`, including partial directory matching.
- [config-array 0.23.5](https://github.com/eslint/rewrite/blob/config-array-v0.23.5/packages/config-array/src/config-array.js):
  `Minimatch.match` with `dot` and `flipNegate`.
- [typescript-estree 8.68.0](https://github.com/typescript-eslint/typescript-eslint/blob/v8.68.0/packages/typescript-estree/src/useProgramFromProjectService.ts):
  `minimatch(path, pattern, { dot: true })`.

These paths do not call removed `makeRe`, `AST`, `regexp` or `matchOne`.
Source inspection does not replace execution. The one-shot tests exercise
actual modules resolved from all three parents before and after installation,
including rejected paths, dotfiles, brace patterns, negation and partial matches.
Actual ESLint file coverage must remain identical.

The only accepted new lock entry is
[`@isaacs/nonrecursive-glob-match@1.1.0`](https://github.com/isaacs/nonrecursive-glob-match/blob/v1.1.0/package.json):
development-only, BlueOak-1.0.0, no dependencies or install lifecycle.
The existing `brace-expansion@5.0.12` and `balanced-match@4.0.4` are MIT licensed
and must remain byte-for-byte unchanged as lock records. No public runtime,
framework, hosting, tracking or provider dependency is introduced.

## One-shot resolution and remaining publication gates

The dedicated push-only `CO-320-minimatch-resolution` workflow uses a standard
public hosted runner, read-only repository permissions, the existing Node version,
no persisted checkout credential, no shared npm cache and no application secrets.
It does not create commits, refs, PRs, deployments or provider configuration.

npm generates the lock with lifecycle scripts disabled. A guard accepts only
the reviewed minimatch replacement plus the one new matcher record; every other
lock record, dependency pin and manifest field must remain unchanged.
Unexpected registry output, extra packages, new versions, install scripts,
changed licenses or findings fail the run for review.

After a clean locked reinstall, the workflow requires zero audit findings,
the unchanged Website check/lint/format/unit/font/build/performance commands
and both existing browser suites. Original package and lock bytes are emitted
only after these steps and final source/delta verification, with SHA-256,
file-size limits and ordered base64 chunks. The artifact retains only those
public files and the source-bound receipt.

This preparation is not an executed result. The normal scoped dependency PR,
its existing Website CI, secret scan, CodeQL, authentic review and subsequent
Main verification remain required after the generated bytes are reviewed.
The one-shot diagnostic workflow itself is not intended for merging into Main.

Remove each temporary parent-specific override when a reviewed published parent
natively resolves a fixed minimatch version, then regenerate the lock through npm
and run the same relevant gates. Preserve this dated finding and the native
resolution evidence rather than treating a future package release as already tested.

## Workflow bootstrap correction

The initial native [run 42763867172](https://github.com/floriankreutzer/conference-manager-website/actions/runs/42763867172)
on `8d194cc3b2f3cd5ea7b45ca34b1969efae69d5ea` failed before any job was
created. No npm resolution, dependency test, audit or browser gate executed.
The source placed `runner.temp` in the job-level environment, where GitHub's
[context availability contract](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#context-availability)
does not permit the runner context. The correction initializes the two private
temporary npm paths inside the first shell step from `RUNNER_TEMP`, then passes
only those paths through `GITHUB_ENV`. It preserves the failed run and uses a
normal child commit; the immutable source guard now requires that exact original
parent and its original Main parent. All resolution, audit and acceptance gates
remain unchanged and unexecuted until a later successful native run.

## Native formatter receipt

The corrected bootstrap [run 42764861561](https://github.com/floriankreutzer/conference-manager-website/actions/runs/42764861561)
on `05c1134f631cac0c47114ec5056537e7082e9e2e` passed the source boundary,
18 resolution tests, the bounded npm-generated dependency change, clean reinstall,
three installed consumer contracts, identical 128-file lint coverage, a zero-finding
audit, Astro/TypeScript and lint. Its format gate failed on the new resolution
helper; the subsequent unit, build, browser and candidate-byte emission gates did
not execute.

A temporary read-only step immediately after the unchanged baseline install uses
the locked Prettier 3.9.6 and repository configuration to report only that exact
helper's original and formatted bytes. The receipt binds the source, regular-file
Git blobs, byte limits, UTF-8, SHA-256 and formatter idempotence, checks rejected
boundary cases, and verifies that no tracked file changed. It writes no source
file and still fails when formatting differs. A later reviewed source correction
must pass all original gates before dependency bytes can be accepted. The exact
published chain `05c1134 -> 8d194cc -> 482cb3d` remains required.

The read-only [formatter run 42765851621](https://github.com/floriankreutzer/conference-manager-website/actions/runs/42765851621)
on `2dffae3c6a84a617a16271299b624b94cace1b38` reached all five negative
boundary checks, both positive bounds, the locked formatter and unchanged-source
checks, then correctly failed because the bytes differed. Its complete receipt
binds the original 14,350 bytes to SHA-256
`eab30b01e58f01f2a5692ac1880ea06f1769aa5f2d20bd252391debefe1c5242`
and the formatted 14,376 bytes to
`2d067a96ac1f846a3075115971b904a6d0e39dd16052c0edeb43c7eaa6623668`.
The source correction adopts only the two formatter-produced multiline assertions
in lint inventory and updates the exact parent/receipt bindings for a normal child
of that failed run. The read-only formatter and every original functional gate
remain required; this failed diagnostic run proves no later dependency acceptance.
