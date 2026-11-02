---
title: website
description: Source code for ewancroft.uk — a personal site powered by AT Protocol, built with SvelteKit 2, Svelte 5, and Tailwind CSS 4.
date: 2026-04-11
tags: [atproto, sveltekit, personal-site, standard-site, teal-fm]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfgh24625"
---

[website](https://github.com/ewanc26/website) is the source code for [ewancroft.uk](https://ewancroft.uk). It's an AT Protocol-native personal site built with SvelteKit 2, Svelte 5 runes, and Tailwind CSS 4. The blog's authoritative content lives in AT Protocol records rather than local Markdown files, and the site renders Standard.site and Leaflet documents with a Markdown compatibility fallback.

The app is a single SvelteKit project. It consumes shared packages such as [@ewanc26/atproto](/projects/atproto) from the separate [@ewanc26/pkgs](/projects/pkgs) monorepo as published npm dependencies; the rest of the site's code lives in this repository.

## Features at a Glance

**AT Protocol-native blog** — Discovers publications and documents from the configured DID, associates posts with a Standard.site publication, and renders native `pub.leaflet.blocks.*` content with dedicated Svelte components. UTF-8 byte-indexed facets support formatting, links, mentions, IDs, code, highlights, and footnotes. Embedded posts and publications are hydrated from AT Protocol records, while a Markdown representation remains available for older or non-JavaScript clients.

**Bluesky feed and profile** — The homepage shows the latest non-reply posts, including text, image galleries, link cards, video, and quote posts. Profile data and verification badges are fetched from Bluesky and Constellation, and the "Elsewhere" shelf is built from the profile's `app.bsky.actor.link` records.

**GitHub activity** — Pinned repositories, a year of contributions, total commits, a language breakdown, and a profile summary. Setting `GITHUB_TOKEN` enables the GraphQL pinned-items API and commit totals; without it, the public GitHub profile is used as a fallback.

**Music, mood, and shelves** — Now-playing and recent plays from teal.fm with artwork lookup, a kibun mood status, Popfeed review shelves (watching, reading, playing, listening), and shipped apps sourced from atstore listings.

**Seasonal design** — The risograph-inspired palette is generated in OKLCH from the Wheel of the Year, interpolating between sabbat hues and refreshing hourly. Halftone and pixel moons, an almanac, flat surfaces, and two spot inks carry the visual system.

**Sound and easter eggs** — A Web Audio ambience engine responds to season, moon phase, time of day, scroll and pointer activity, reading mode, and tab visibility. Wolf mode rewrites page text while preserving numbers, abbreviations, and interactive elements; other eggs include the Monday, idle, three-toast, heritage, and Happy Mac pieces.

**Feeds, sharing, and metadata** — `/rss.xml` is the canonical RSS feed, with legacy feed paths redirecting to it. The site also provides `/sitemap.xml`, dynamic Open Graph images, share buttons, a table of contents, native Leaflet comments via AT Protocol OAuth, backlink avatars, and Standard.site recommendations and subscriptions.

## Quick Start

```bash
git clone git@github.com:ewanc26/website
cd website
pnpm install
cp .env.example .env
```

Edit `.env`:

```ini
PUBLIC_ATPROTO_DID=did:plc:your-did-here
PUBLIC_LEAFLET_BLOG_PUBLICATION=your-blog-publication-rkey

# Optional: GitHub project data
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=

# Site metadata
PUBLIC_SITE_TITLE="Your Site Title"
PUBLIC_SITE_DESCRIPTION="Your site description."
```

Then:

```bash
pnpm dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_ATPROTO_DID` | Yes | Your AT Protocol DID |
| `PUBLIC_LEAFLET_BLOG_PUBLICATION` | Yes | Record key of the Standard.site publication used for the blog |
| `GITHUB_USERNAME` | No | GitHub username for project and activity data (defaults to `ewanc26`) |
| `GITHUB_TOKEN` | No | Enables the GitHub GraphQL pinned-items API and commit totals; the public profile is used otherwise |
| `PUBLIC_SITE_TITLE` | No | Site title used in the header and as a suffix for subpage titles |
| `PUBLIC_SITE_DESCRIPTION` | No | Default SEO description |

Canonical URLs for pages, Open Graph metadata, the RSS feed, and the sitemap are derived from the request origin, so no site-URL variable is required.

## Dependencies

The site consumes [@ewanc26/atproto](/projects/atproto) from the [@ewanc26/pkgs](/projects/pkgs) monorepo as its shared AT Protocol service layer. Other direct dependencies include `@atproto/lex`, `@atproto/oauth-client-browser`, `@lucide/svelte`, Satori with `@resvg/resvg-wasm` for Open Graph images, Fontsource packages, and a Unified/remark/rehype Markdown pipeline.

## Publication System

Set `PUBLIC_LEAFLET_BLOG_PUBLICATION` to the record key of the Standard.site publication that backs the blog. That publication drives the homepage writing list, the `/blog` index, and individual post routes.

Posts use date-based URLs of the form `/blog/:year/:month/:day/:slug`, derived from the publication date and title. Legacy `/blog/:rkey` URLs redirect to the canonical dated path. The blog index supports search and tag filtering.

`/rss.xml` is the canonical feed. The older `/rss`, `/feed`, `/feed.xml`, `/atom.xml`, `/blog/rss`, `/blog/rss.xml`, and `/blog/feed` paths redirect there.

## Well-Known Routes

**`/.well-known/atproto-did`** — Returns `PUBLIC_ATPROTO_DID` as plain text, binding the domain to the account's DID.

**`/.well-known/site.standard.publication`** — Returns the full AT URI of the configured blog publication, or `404` when the DID or publication key is missing.

## Custom Lexicons Used

- `site.standard.*` — Publications, documents, subscriptions, and recommendations
- `pub.leaflet.*` — Structured content, blocks, comments, and recommendations
- `app.bsky.actor.profile`, `app.bsky.feed.post`, `app.bsky.actor.link`, and `app.bsky.graph.verification` — Profile, posts, profile links, and verification badges
- `fm.teal.actor.status` and `fm.teal.feed.play` — Now-playing music and scrobble history
- `social.kibun.status` — Mood status
- `social.popfeed.feed.review` — Popfeed review shelves
- `fyi.atstore.listing.detail` — Shipped app listings
- `uk.ewancroft.site.info` — Site metadata, including tech stack, credits, and privacy statement

## Tech Stack

SvelteKit 2.70+ with Svelte 5 runes, Tailwind CSS 4, Vite 8, TypeScript 6, `@atproto/lex`, and `@atproto/oauth-client-browser`. Open Graph images are generated with Satori and `@resvg/resvg-wasm`, and Markdown is processed with Unified, remark, and rehype. Deployed on Vercel via `@sveltejs/adapter-vercel`.

## Licence

See `LICENSE` and `THIRD-PARTY-LICENSES.txt` in the repository.
