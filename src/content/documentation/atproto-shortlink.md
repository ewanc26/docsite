---
title: atproto-shortlink
description: A server-side AT Protocol link shortener powered by your Linkat board. No database required.
date: 2026-02-24
tags: [atproto, sveltekit, linkat, tools]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfqkvf625"
---

[atproto-shortlink](https://github.com/ewanc26/atproto-shortlink) is a SvelteKit service that turns your [Linkat](https://linkat.blue) board into a link shortener. There's no database — links are fetched live from AT Protocol, and shortcodes are deterministic base62 hashes derived from each URL.

## How It Works

1. You maintain your links in Linkat (stored as `blue.linkat.board` records on your PDS)
2. On each request, the service fetches your board via Slingshot identity resolution
3. Each URL is hashed to a 6-character base62 shortcode (e.g. `/a3k9zx`)
4. Visiting a shortcode triggers an instant HTTP 301 redirect

Shortcodes are deterministic — the same URL always produces the same code, and there are 62⁶ ≈ 56 billion possible combinations. Responses are cached for 5 minutes.

## Setup

```bash
git clone git@github.com:ewanc26/atproto-shortlink
cd atproto-shortlink
npm install
cp .env.example .env
```

Edit `.env` and set your AT Protocol DID:

```ini
ATPROTO_DID=did:plc:your-did-here
```

Find your DID at [pdsls.dev](https://pdsls.dev/) by entering your handle.

```bash
npm run dev
```

Run `npm run test:config` to verify your DID, PDS connectivity, and Linkat board before going live.

## Endpoints

| Endpoint | Description |
|----------|-------------|
| `/` | Service status and available links |
| `/:shortcode` | 301 redirect to target URL |
| `/api/links` | All short links as JSON |

## Deployment

The project uses `@sveltejs/adapter-auto` and deploys to Vercel, Netlify, or Cloudflare Pages without extra configuration. Set `ATPROTO_DID` as an environment variable in your platform of choice.

## Tech Stack

SvelteKit 2, Tailwind CSS 4, AT Protocol (`blue.linkat.board`), Slingshot for identity resolution.

## Licence

AGPLv3.
