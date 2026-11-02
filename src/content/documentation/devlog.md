---
title: devlog
description: Centralized changelog and development log for croft.click.
date: 2026-06-13
tags: [svelte, documentation, logs]
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mo7b3gnb562e'
---

# devlog

Systematic logging of development progress and system changes.

## 01. Purpose

Provides a public, high-integrity record of architectural iterations and project updates across the ewanc26 ecosystem.

## 02. Technical Stack

- **Framework**: SvelteKit + Svelte 5
- **Content**: Markdown via unified (remark + rehype)
- **Styling**: Tailwind CSS 4 with `@tailwindcss/typography`
- **Publishing**: Sequoia to AT Protocol
- **Deployment**: Vercel

## 03. Key Components

- **Entry Loader**: Reads Markdown frontmatter, strips date prefixes, and sorts entries newest-first.
- **Markdown Renderer**: Renders GFM content and extracts a table of contents from the heading structure.
- **Search & Tags**: Client-side entry search and tag filtering, with tag colours derived from an FNV-1a hash.
- **Feed & Sitemap**: Prerendered RSS 2.0 feed at `/rss.xml` and a sitemap at `/sitemap.xml`.
- **Social Cards**: Per-entry Open Graph images generated at `/api/og`.

## 04. Integration

Published at `devlog.croft.click`. Entries are written to `eurosky.social` via Sequoia as `site.standard.document` records; the site is the web frontend for those records.

## 05. System Status

- **Status**: Production
- **Deployment**: Vercel
