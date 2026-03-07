---
title: website
description: Source code for ewancroft.uk — a personal site powered by AT Protocol, built with SvelteKit 5 and Tailwind CSS 4.
date: 2026-02-24
tags: [atproto, sveltekit, personal-site, standard-site, teal-fm]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfgh24625"
---

[website](https://github.com/ewanc26/website) is the source code for [ewancroft.uk](https://ewancroft.uk). It's a fully AT Protocol-integrated personal site built with SvelteKit 5, Tailwind CSS 4, and Svelte 5 Runes. While the repository includes Ewan-specific configuration, the codebase is designed to be adapted for anyone running their own AT Protocol-powered site.

The repository is a pnpm monorepo. The app itself lives at the root; shared logic is split into three published packages: [@ewanc26/atproto](/documentation/atproto), [@ewanc26/ui](/documentation/ui), and [@ewanc26/utils](/documentation/utils).

## Features at a Glance

**AT Protocol integration** — Bluesky profile (avatar, banner, bio, pronouns, follower counts), Standard.site blog posts, [teal.fm](https://teal.fm) music status, [kibun.social](https://kibun.social) mood status, [Tangled](https://tangled.org) repositories, and [Linkat](https://linkat.blue) link board — all fetched live with configurable in-memory caching via [@ewanc26/atproto](/documentation/atproto).

**Content system** — Multi-publication Standard.site support with friendly URL slugs, per-publication RSS 2.0 feeds, an `/archive` page, and redirects from `/{slug}/{rkey}` to the full document on Standard.site.

**Bluesky post display** — Latest non-reply posts with full thread context, quoted post embedding, image galleries, external link cards, HLS.js video streaming, and real-time like/repost counts via Constellation API.

**Music integration** — Album artwork via a cascading server-side proxy: MusicBrainz Cover Art Archive → iTunes → Deezer → Last.fm → AT Protocol blob fallback. All with smart caching and CORS-free via `/api/artwork`.

**Theming** — 12 colour themes (Sage, Monochrome, Slate, Ruby, Coral, Sunset, Amber, Forest, Teal, Ocean, Lavender, Rose) using OKLCH colour space, system preference detection, and persistent selection — configured in [@ewanc26/ui](/documentation/ui).

**Fun bits** — Wolf mode (converts page text to wolf sounds while preserving numbers, abbreviations, and interactive elements), decimal clock, Happy Mac easter egg, scroll-to-top button.

## Quick Start

```bash
git clone git@github.com:ewanc26/website
cd website
pnpm install
cp .env .env.local
```

Edit `.env.local`:

```ini
PUBLIC_ATPROTO_DID=did:plc:your-did-here
PUBLIC_SITE_TITLE=Your Site Title
PUBLIC_SITE_URL=https://yoursite.com
```

Configure publication slugs in `src/lib/config/slugs.ts`, then:

```bash
pnpm dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_ATPROTO_DID` | Yes | Your AT Protocol DID |
| `PUBLIC_SITE_TITLE` | No | Site title for SEO |
| `PUBLIC_SITE_URL` | No | Canonical site URL |
| `PUBLIC_CORS_ALLOWED_ORIGINS` | No | Comma-separated CORS origins for `/api/` |
| `CACHE_TTL_PROFILE` | No | Profile cache TTL in seconds (default: 60) |
| `CACHE_TTL_MUSIC_STATUS` | No | Music status TTL (default: 120) |
| `CACHE_TTL_KIBUN_STATUS` | No | Mood status TTL (default: 120) |

## Monorepo Packages

| Package | Description |
|---------|-------------|
| [@ewanc26/atproto](/documentation/atproto) | AT Protocol service layer — profile, posts, documents, status records, cache, agents |
| [@ewanc26/ui](/documentation/ui) | Svelte component library — layout, cards, UI primitives, stores, theme config |
| [@ewanc26/utils](/documentation/utils) | Utility functions — date/number formatting, URL helpers, validators, RSS generation |

## Publication System

Map friendly slugs to Standard.site publication rkeys in `src/lib/config/slugs.ts`:

```typescript
export const slugMappings: SlugMapping[] = [
  { slug: 'blog', publicationRkey: '3m3x4bgbsh22k' }
];
```

This creates routes at `/blog`, `/blog/{rkey}`, and `/blog/rss`.

## Custom Lexicons Used

- `uk.ewancroft.site.info` — Site metadata (tech stack, credits, privacy statement)
- `blue.linkat.board` — Link board
- `fm.teal.alpha.actor.status` + `fm.teal.alpha.feed.play` — Music status
- `social.kibun.status` — Mood status
- `sh.tangled.repo` — Code repositories
- `site.standard.*` — Longform content documents and publications

## Tech Stack

SvelteKit 2.50+ with Svelte 5, Tailwind CSS 4, `@atproto/api` v0.18.1, HLS.js, Lucide icons, Vite 7, TypeScript 5.9+. Deployed on Vercel via `@sveltejs/adapter-vercel`.

## Licence

See `LICENSE` and `THIRD-PARTY-LICENSES.txt` in the repository.
