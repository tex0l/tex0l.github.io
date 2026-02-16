# CLAUDE.md

Instructions for Claude Code when working on this project. For project architecture, conventions, and debugging, see [README_DEV.md](README_DEV.md).

## Behavioral Rules

- **Never commit or push without explicit user request**
- Never add `Co-Authored-By` lines in commit messages
- Separate changes into atomic, coherent commits (one commit per feature, fix, or logical change)
- Write descriptive commit messages explaining the "why" of the change
- Never publish a package (npm publish) or release a version (tag + push) without explicit user approval

## Quality

- Always verify that what you built actually works (build, run, test)
- Write tests to validate your changes, preferably before implementation (TDD)
- If no test suite exists for the area you're modifying, create one
- Always update relevant documentation (README.md, README_DEV.md, docstrings, etc.) when making changes

## Communication

- **Never invent personal data** (social profile URLs, emails, etc.) without certainty
- If information is uncertain or fabricated, explicitly flag it for manual verification
- Prefer asking for exact information rather than guessing
