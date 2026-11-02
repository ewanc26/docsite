---
title: atproto-shortlink
description: A server-side AT Protocol link shortener powered by your Linkat board. No database required.
date: 2026-04-11
tags: [atproto, sveltekit, linkat, tools]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfqkvf625"
---

[atproto-shortlink](https://github.com/ewanc26/atproto-shortlink) is a SvelteKit service that turns your [Linkat](https://linkat.blue) board into a link shortener. There's no database — links are fetched live from AT Protocol, and shortcodes are deterministic hashes derived from each URL.

## How It Works

1. You maintain your links in Linkat (stored as `blue.linkat.board` records on your PDS)
2. The service resolves your identity through Slingshot and fetches your board, falling back to the public Bluesky API if the PDS cannot be reached
3. Each URL is hashed with FNV-1a to a 10-character, mixed-case code (e.g. `/aQ3k9zXr2M`)
4. Visiting a shortcode triggers an instant HTTP 301 redirect

Shortcodes are deterministic — the same URL always produces the same code. The 10-character code combines a two-character domain prefix, a hash of the normalized URL and a subdomain tail, drawn from a 60-character alphabet (60¹⁰ ≈ 6 × 10¹⁷ combinations). Board data is cached in memory for 5 minutes.

## Setup

```bash
git clone git@github.com:ewanc26/atproto-shortlink
cd atproto-shortlink
pnpm install
cp .env.example .env
```

Edit `.env` and set your AT Protocol DID:

```ini
ATPROTO_DID=did:plc:your-did-here
```

Find your DID at [pdsls.dev](https://pdsls.dev/) by entering your handle.

```bash
pnpm run dev
```

Run `pnpm run test:config` to verify your DID, PDS connectivity, and Linkat board before going live. `pnpm run check:deps` verifies that every package imported by a script in `scripts/` is declared in `package.json`.

## Endpoints

| Endpoint | Description |
|----------|-------------|
| `/` | Service status and available links |
| `/:shortcode` | 301 redirect to target URL |
| `/api/links` | All short links as JSON |

## Deployment

The project uses `@sveltejs/adapter-auto` and deploys to Vercel, Netlify, Cloudflare Pages, or Node without extra configuration. Build and preview with `pnpm run build` and `pnpm run preview`, and set `ATPROTO_DID` as an environment variable in your platform of choice.

## Tech Stack

SvelteKit 2, Tailwind CSS 4, `@atproto/lex` and `@bsky/sdk` for AT Protocol access, `tldts` for domain parsing, and Slingshot for identity resolution.

## Licence

AGPLv3.
