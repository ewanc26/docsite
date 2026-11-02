---
title: zola-standard-site
description: A Zola theme with standard.site support — 96 colour themes, syntax highlighting, and AT Protocol verification.
date: 2026-06-30
tags: [zola, theme, ssg, atprotocol, standard-site, rust]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mpht4rdene2q"
---

[zola-standard-site](https://github.com/ewanc26/zola-standard-site) is a Zola theme for long-form publishing on AT Protocol. It provides a committed-dark reading surface with Inter + JetBrains Mono typography, 96 built-in colour themes, and standard.site verification that degrades gracefully.

## Features

- **96 colour themes** — 8 hue families × 4 moods (soft, neutral, vivid, deep) × 3 depths (dim, dark, darker). Persisted to localStorage.
- **Inter + JetBrains Mono** — sans-serif for prose and headings, monospace for dates, tags, code, and structural markers.
- **Table of contents** — auto-generated from headings, configurable depth.
- **Reading time** — estimated from word count, toggleable.
- **Code copy button** — hover to reveal, clipboard API, zero dependencies.
- **Syntax highlighting** — Giallo engine (Zola 0.22+), gruvbox-dark-medium by default, 65 themes available.
- **Pagination** — per-section, prev/next with page counter.
- **Archive page** — posts grouped by year, pullable from any section.
- **Social links** — configurable SVG icons for GitHub, Mastodon, Bluesky, Twitter, and email.
- **Back to top** — CSS-only, scroll-driven where supported.
- **Atom feed** — auto-generated, with per-tag feeds.
- **Standard.site verification** — AT Protocol integration that degrades gracefully.
- **Dark-only, flat elevation** — tonal layering and borders instead of shadows.
- **Zero layout shift** — theme switcher and interactive elements are sized up front.
- **Responsive and accessible** — mobile through wide layouts, print stylesheet, skip link, semantic HTML, ARIA landmarks, keyboard navigation, reduced motion, and WCAG AA contrast.

## Quick start

```bash
brew install zola
git clone https://github.com/ewanc26/zola-standard-site
cd zola-standard-site
zola serve
```

Open `http://127.0.0.1:1111`. The site works immediately — all AT Protocol fields have placeholders and the theme degrades cleanly.

## Shortcodes and publishing

Three shortcodes are included: `image` (responsive, lazy-loaded images with optional caption), `callout` (note, warning, or tip), and `youtube` (privacy-friendly responsive embed).

The theme is wired for [Sequoia](https://sequoia.pub). Run `npx sequoia-cli init`, fill the `atproto_did`, `standard_site_publication_rkey`, and `standard_site_publication_at_uri` fields in `config.toml`, then publish with `npx sequoia-cli publish`. Sequoia writes each document rkey back into the post's frontmatter, and `page.html` emits the `site.standard.document` link tag from it. While the config values remain placeholders, the tags are suppressed.

`.github/workflows/publish.yml` runs Sequoia before the Zola build on pushes to `main`, commits any rkey changes back to `content/`, and builds the site. It reads `ATPROTO_HANDLE` and `ATPROTO_APP_PASSWORD` from repository secrets.

## Structure

- `config.toml` — site config, theme extras, and AT Protocol fields
- `theme.toml` — Zola theme manifest
- `content/` — example content showing all theme features
- `templates/` — Tera templates for pages, sections, taxonomies, and macros
- `templates/shortcodes/` — image, callout, and YouTube shortcodes
- `static/css/` — `dark-study.css` tokens and layout plus the generated `themes-64.css` colour definitions
- `scripts/generate-themes.mjs` — generator for the 96 themes (8 hues × 4 moods × 3 depths)
- `.github/workflows/publish.yml` — Sequoia publish, rkey commit, and Zola build
- `sequoia.example.json` — template for Sequoia configuration

## Licence

AGPL-3.0.
