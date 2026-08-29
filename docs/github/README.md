# GitHub repository governance

`main-ruleset.json` is the intended repository Ruleset payload for the `main` branch.

It requires pull requests, squash-only merges, resolved conversations, the `validate` CI check, the `Analyze (javascript-typescript)` CodeQL check, strict up-to-date checks, linear history, and blocks branch deletion and force pushes. No bypass actors are configured.

The required approval count is intentionally `0` while this repository is hosted under a personal GitHub account without a guaranteed independent reviewer. Raise it to `1` once a second governed reviewer is reliably available; doing so earlier may make normal merges impossible.

Apply the JSON through the GitHub repository Rulesets API or reproduce the same controls in **Settings → Rules → Rulesets**. Merging this file does not itself activate repository protection. After applying it, verify the live Ruleset through the GitHub API and use a test pull request to confirm that `main` cannot be updated before required checks complete.
