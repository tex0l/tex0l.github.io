# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed

- Switch `@tex0l/encrypted-card` and `@tex0l/ctrk-astro` from `file:` dependencies to npm packages
- Split `CLAUDE.md` into Claude-specific rules and `README_DEV.md` developer guide
- Upgrade npm dependencies (fix 2 high vulnerabilities, update Astro)

### Added

- `README_DEV.md` — comprehensive developer guide (English)
- `.claude/` added to `.gitignore`
- CLAUDE.md rules: mandatory tests, documentation updates, changelog maintenance, no publishing without approval
- Documentation for `projects/` directory (local clones of package repos)

### Fixed

- Bump `@tex0l/encrypted-card` to 0.1.5 (fix missing `dist/` in published npm tarball that broke CI)

## [0.0.2] - 2026-02-13

### Added

- CTRK exporter page (`/[lang]/ctrk-exporter`) with `@tex0l/ctrk-astro` integration
- Projects page (`/[lang]/projects`)
- Blog post about the CTRK exporter
- Hello World 3.0 blog post
- Breadcrumb navigation in blog articles
- JSON-LD BreadcrumbList for SEO
- Comprehensive SEO improvements and new pages (privacy policy)
- `fetchpriority=high` for above-the-fold images
- Auto-run encryption on build (skip if `PASSWORD` undefined)
- CC BY-NC 4.0 license and rewritten README
- CLAUDE.md with project instructions
- Mobile menu with Alpine.js
- OpenGraph image generation (Satori, then migrated to astro-og-canvas 0.10)
- View Transitions for SPA navigation
- Hello World 2.0 blog post
- Google Search Console verification
- Date and author display on blog articles
- x-cloak CSS for Alpine.js

### Changed

- Redesign blog with minimalist editorial style
- Replace Pintora with Mermaid for server-side diagram rendering
- Migrate to ESLint flat config
- Migrate OG image generation to astro-og-canvas 0.10
- Upgrade dependencies (Astro, React v19, sharp deduplication)
- Runtime date formatting with Luxon instead of build-time i18n
- Improve encryptAssets with validation and auto-reencryption
- Center images in prose content
- Use Tailwind 4 token syntax for mobile menu background
- Use page background color for language selector dropdown
- Use PNG Pintora diagrams instead of SVG for CSS resizing

### Fixed

- Generate OG images for English blog posts
- Add missing OG images for encrypted-card and privacy pages
- Update broken Nuxt link in blog posts
- Handle missing `.env.local` in prebuild script
- Add workaround for mermaid diagrams with view transitions
- Correct spelling and grammar in blog posts and translations
- Remove deprecated `baseUrl` from tsconfig
- Resolve ESLint and TypeScript errors
- Fix baseUrl changed by React auto-installer
- Fix encrypted-card link
- Various deployment and path resolution fixes

### Removed

- Unused `formatDate` function
- Unused dependencies
- Draft articles

## [0.0.1] - 2024-02-21

Migration from Nuxt 3 to Astro.

### Added

- Bilingual support (FR/EN) with i18n
- End-to-end encrypted business card
- Blog post about the encrypted card
- Sitemap, favicon, and meta descriptions
- RSS feed and robots.txt
- Server-side diagram rendering with Pintora (astro-pintora)
- ESLint linter

### Changed

- Migrated from Nuxt 3 to Astro
- Replaced Nuxt Image with Astro Picture component
- Rewrote about-me page and first blog article
- Rewrote encrypted card article

### Fixed

- Encrypted card handling when password is empty
- Various rendering and deployment fixes

## [0.0.0] - 2022-12-06

Initial release as a Nuxt 3 site.

### Added

- Nuxt 3 project scaffolding
- Landing page, about-me page, and blog
- Two initial blog posts (Hello World)
- GitHub Pages deployment workflow
