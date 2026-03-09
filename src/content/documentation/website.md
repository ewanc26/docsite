---
title: website
description: Source code for ewancroft.uk — a personal site powered by AT Protocol, built with SvelteKit 5 and Tailwind CSS 4.
date: 2026-02-24
tags: [atproto, sveltekit, personal-site, standard-site, teal-fm]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfgh24625"
---

[website](https://github.com/ewanc26/website) is the source code for [ewancroft.uk](https://ewancroft.uk). It's a fully AT Protocol-integrated personal site built with SvelteKit 5, Tailwind CSS 4, and Svelte 5 Runes. While the repository includes Ewan-specific configuration, the codebase is designed to be adapted for anyone running their own AT Protocol-powered site.

The app is a single SvelteKit project. All shared packages (@ewanc26/atproto, @ewanc26/ui, @ewanc26/utils, etc.) live in the separate [@ewanc26/pkgs](/documentation/pkgs) monorepo and are consumed as published npm dependencies.

## Features at a Glance

**AT Protocol integration** — Bluesky profile (avatar, banner, bio, pronouns, follower counts), Standard.site blog posts, [teal.fm](https://teal.fm) music status, [kibun.social](https://kibun.social) mood status, [Tangled](https://tangled.org) repositories, and [Linkat](https://linkat.blue) link board — all fetched live with configurable in-memory caching via [@ewanc26/atproto](/projects/atproto).

**Ko-fi supporters** — Ko-fi webhook integration via [@ewanc26/supporters](/projects/supporters). Payment events are stored as `uk.ewancroft.kofi.supporter` records on the ATProto PDS and displayed with the `<KofiSupporters>` and `<LunarContributors>` components.

**Noise avatars** — Deterministic value-noise profile pictures generated client-side from a string seed via [@ewanc26/noise-avatar](/projects/noise-avatar).

**Content system** — Multi-publication Standard.site support with friendly URL slugs, per-publication RSS 2.0 feeds, an `/archive` page, and redirects from `/{slug}/{rkey}` to the full document on Standard.site.

**Bluesky post display** — Latest non-reply posts with full thread context, quoted post embedding, image galleries, external link cards, HLS.js video streaming, and real-time like/repost counts via Constellation API.

**Music integration** — Album artwork via a cascading server-side proxy: MusicBrainz Cover Art Archive → iTunes → Deezer → Last.fm → AT Protocol blob fallback. All with smart caching and CORS-free via `/api/artwork`.

**Theming** — 12 colour themes (Sage, Monochrome, Slate, Ruby, Coral, Sunset, Amber, Forest, Teal, Ocean, Lavender, Rose) using OKLCH colour space, system preference detection, and persistent selection — configured in [@ewanc26/ui](/projects/ui).

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
# Optional: Ko-fi webhook integration
# KOFI_VERIFICATION_TOKEN=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
# ATPROTO_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

Configure publication slugs in `src/lib/data/slug-mappings.ts`, then:

```bash
pnpm dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PUBLIC_ATPROTO_DID` | Yes | Your AT Protocol DID |
| `PUBLIC_SITE_TITLE` | No | Site title for SEO |
| `PUBLIC_SITE_DESCRIPTION` | No | Site description for SEO |
| `PUBLIC_SITE_KEYWORDS` | No | Comma-separated keywords for SEO |
| `PUBLIC_SITE_URL` | No | Canonical site URL |
| `PUBLIC_BLOG_FALLBACK_URL` | No | Redirect here if a document isn't found (omit to 404) |
| `PUBLIC_LOCAL_SLINGSHOT_URL` | No | Local Slingshot instance URL (default: `http://localhost:3000`) |
| `PUBLIC_SLINGSHOT_URL` | No | Public Slingshot fallback URL (default: `https://slingshot.microcosm.blue`) |
| `PUBLIC_CORS_ALLOWED_ORIGINS` | No | Comma-separated CORS origins for `/api/` |
| `KOFI_VERIFICATION_TOKEN` | No | Ko-fi webhook verification token |
| `ATPROTO_APP_PASSWORD` | No | ATProto app password for writing Ko-fi supporter records |
| `CACHE_TTL_PROFILE` | No | Profile cache TTL in seconds (default: 60) |
| `CACHE_TTL_SITE_INFO` | No | Site info TTL (default: 120) |
| `CACHE_TTL_LINKS` | No | Links TTL (default: 60) |
| `CACHE_TTL_MUSIC_STATUS` | No | Music status TTL (default: 10) |
| `CACHE_TTL_KIBUN_STATUS` | No | Mood status TTL (default: 15) |
| `CACHE_TTL_TANGLED_REPOS` | No | Tangled repos TTL (default: 60) |
| `CACHE_TTL_BLOG_POSTS` | No | Blog posts TTL (default: 30) |
| `CACHE_TTL_PUBLICATIONS` | No | Publications TTL (default: 60) |
| `CACHE_TTL_INDIVIDUAL_POST` | No | Individual post TTL (default: 60) |
| `CACHE_TTL_IDENTITY` | No | Identity resolution TTL in seconds (default: 1440) |

## Dependencies

The site consumes these packages from the [@ewanc26/pkgs](/documentation/pkgs) monorepo:

| Package | Description |
|---------|-------------|
| [@ewanc26/atproto](/projects/atproto) | AT Protocol service layer — profile, posts, documents, status records, cache, agents |
| [@ewanc26/ui](/projects/ui) | Svelte component library — layout, cards, UI primitives, stores, theme config |
| [@ewanc26/utils](/projects/utils) | Utility functions — date/number formatting, URL helpers, validators, RSS generation |
| [@ewanc26/noise-avatar](/projects/noise-avatar) | Deterministic value-noise avatar generation |
| [@ewanc26/supporters](/projects/supporters) | Ko-fi supporter display components backed by ATProto PDS |
| [@ewanc26/tid](/projects/tid) | Zero-dependency AT Protocol TID generation |

## Publication System

Map friendly slugs to Standard.site publication rkeys in `src/lib/data/slug-mappings.ts`:

```typescript
export const slugMappings: SlugMapping[] = [
  { slug: 'blog', publicationRkey: '3m3x4bgbsh22k', platform: 'standard.site' }
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

SvelteKit 2.53+ with Svelte 5, Tailwind CSS 4, `@atproto/api` v0.18.21+, HLS.js, `@lucide/svelte`, Vite 7, TypeScript 5.9+. Deployed on Vercel via `@sveltejs/adapter-vercel`.

## Licence

See `LICENSE` and `THIRD-PARTY-LICENSES.txt` in the repository.
