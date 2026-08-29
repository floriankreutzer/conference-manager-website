# GitHub repository governance

This directory contains repository-administration configuration that cannot be applied through the normal source-code runtime.

## Main branch ruleset

`main-ruleset.json` is the intended repository Ruleset payload for `main`.

It enforces:
- pull-request-only changes to `main`;
- squash-only merges;
- resolved review conversations;
- required `validate` CI check;
- required `Analyze (javascript-typescript)` CodeQL check;
- strict up-to-date status-check policy;
- linear history;
- branch deletion protection;
- force-push protection;
- no configured bypass actors.

The required approval count is intentionally `0` while this is a personal-account repository without a guaranteed independent reviewer. Increasing it to `1` is recommended once a second governed reviewer is reliably available; setting it to `1` earlier could make routine merges impossible.

Apply the JSON through the GitHub repository Rulesets API or reproduce the same controls in **Settings → Rules → Rulesets**. After applying it, verify the live ruleset through the GitHub API and confirm a test pull request cannot merge before the required checks complete.

Repository settings are operational state: this file documents the intended configuration but does not itself activate protection.
