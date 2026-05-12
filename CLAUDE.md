# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

Marketing website for Ready Steady Set — film set flat hire in Sydney. Built with Jekyll, deployed to GitHub Pages at `https://nbpayne.github.io/readysteadyset`.

## Commands

```bash
# Install dependencies
bundle install

# Dev server with live reload (http://localhost:4000)
make serve
# or
bundle exec jekyll serve --livereload --open-url

# Production build (minifies CSS, JS, HTML)
JEKYLL_ENV=production bundle exec jekyll build
```

There are no tests or linting steps.

## Architecture

**Jekyll site** with one custom collection (`_showcase`) and no database or build pipeline beyond Jekyll's own Sass compilation.

- `_config.yml` — site metadata, nav links, plugin config, and collection/permalink rules
- `_showcase/*.md` — each file is a showcase post; front matter drives the entire page (hero image, gallery array, production details); no templating logic needed in body content
- `_layouts/showcase.html` — renders showcase front matter (gallery, production details box, CTA, prev/next nav); extends `_layouts/default.html`
- `_sass/_variables.scss` — single source of truth for all design tokens (colours, type, spacing); edit here first
- `assets/js/main.js` — single vanilla-JS IIFE: sticky nav, mobile menu, scroll reveal (`[data-reveal]`), lazy images (`img[data-src]`), lightbox (`[data-lightbox]`), contact form (Formspree), counter animation (`[data-count]`). No external JS libraries.

## Adding a showcase entry

1. Create `_showcase/your-title.md` with `layout: showcase` and the required front matter keys: `title`, `hero_image`, `thumb`, `gallery` (array of `src`/`caption`), `order` (controls display order on the index)
2. Add images to `assets/images/showcase/your-title/`

## Design tokens

All brand colours and typography live in `_sass/_variables.scss`. Primary colours:
- `$color-brown: #7B3F1E` (primary)
- `$color-cream: #F5EDD8` (background/secondary)
- `$color-accent: #C4631A`

## Contact form

`contact.html` POSTs to Formspree. The form action URL contains the live form ID — don't replace it with a placeholder.

## Deployment

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes to GitHub Pages automatically.
