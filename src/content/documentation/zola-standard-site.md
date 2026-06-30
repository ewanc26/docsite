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
- **Standard.site verification** — AT Protocol integration that degrades gracefully.

## Quick start

```bash
brew install zola
git clone https://github.com/ewanc26/zola-standard-site
cd zola-standard-site
zola serve
```

Open `http://127.0.0.1:1111`. The site works immediately — all AT Protocol fields have placeholders and the theme degrades cleanly.

## Structure

- `templates/` — Zola Tera templates for pages, sections, macros
- `content/` — Example content showing all theme features
- `static/` — Assets, screenshot
- `sass/` — Style system with CSS variable theming
- `theme.toml` — Zola theme manifest

## Licence

MIT.
