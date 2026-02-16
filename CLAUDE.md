# CLAUDE.md

Instructions for Claude Code when working on this project. For project architecture, conventions, and debugging, see [README_DEV.md](README_DEV.md).

## Git and Publishing Rules

- **Never commit, tag, or push without an explicit user request in the current message.** A previous request to commit does not carry over — each commit/tag/push action requires its own explicit approval.
- **Never publish a package (npm publish) or release a version (tag + push) without explicit user approval.** Completing a fix or passing tests does not imply permission to release.
- Never add `Co-Authored-By` lines in commit messages
- Separate changes into atomic, coherent commits (one commit per feature, fix, or logical change)
- Write descriptive commit messages explaining the "why" of the change
- When work is ready to be committed/pushed/published, **inform the user and wait for their go-ahead** instead of proceeding autonomously

## Quality

- Always verify that what you built actually works (build, run, test)
- **Every piece of code you write or modify MUST have automated tests.** This is not optional — no exceptions. If you write a new file, you write tests for it. If you modify existing code, you update or add tests covering the change. Preferably write the tests first (TDD).
- If no test suite exists for the area you're modifying, create one before proceeding
- Always update relevant documentation (README.md, README_DEV.md, docstrings, etc.) when making changes
- **Always update the CHANGELOG.md after completing a feature or fix** — add entries under `## [Unreleased]` before the user is asked to commit. When releasing a version, cross-check `git log` against `[Unreleased]` entries to ensure nothing was forgotten (even if the `[Unreleased]` section is empty — past commits may have been missed), then move the entries under a new `## [version] - date` heading. If no CHANGELOG.md exists, create one by reconstructing the history from `git log`. Use [Keep a Changelog](https://keepachangelog.com/) format with sections: Added, Changed, Fixed, Removed.

## Communication

- **Never invent personal data** (social profile URLs, emails, etc.) without certainty
- If information is uncertain or fabricated, explicitly flag it for manual verification
- Prefer asking for exact information rather than guessing
