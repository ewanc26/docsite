---
title: Opal
description: Convert microblog posts from Twitter, Mastodon, Threads, and Nostr to AT Protocol Bluesky posts.
date: 2026-05-01
tags: [opal, atproto, bluesky, twitter, mastodon, threads, nostr, tools]
draft: false
---

Opal is a tool for converting microblog exports from Twitter, Mastodon, Threads, and Nostr into AT Protocol Bluesky posts. It handles facets (links, mentions, hashtags), automatically threads long posts, and publishes to your PDS via OAuth.

The name continues the mineral theme: opal is a gemstone known for its play-of-colour — flashes of different hues depending on the angle of observation. Fitting for a tool that transforms content from many different platforms into one format.

## The Sigil

Opal's logo is a sigil designed with pagan symbolism:

- **Pentagram** — the five-pointed star binds the five source platforms (Twitter, Mastodon, Threads, Nostr, Bluesky); each point a vertex in the conversion graph
- **Eccentric ripple rills** — the interior arcs mimic the play-of-colour inside an opal: light diffracting through silica spheres, each angle a different fire
- **Perimeter nodes** — five points of fire, each a different colour (violet, cyan, green, yellow, orange), representing the spectrum of source formats
- **Dark potch matrix** — the black base is the common substrate: plain text, the raw material all platforms share
- **The name** — Opal itself: a stone of transformation, protection, and amplification

## Usage Options

Opal comes in two forms:

**Web interface** — the easiest way to get started. Visit [opal.croft.click](https://opal.croft.click), authenticate via ATProto OAuth, upload your export file, and import. Everything runs locally in your browser — no data is sent to any server other than your own PDS.

**CLI** — a Node.js command-line tool for local use. Useful if you want full control, need to automate imports, or prefer the terminal. Requires cloning the repository and building from source.

## Web Interface

No installation required. Open [opal.croft.click](https://opal.croft.click) and follow the wizard:

1. **Choose a platform** — Twitter, Mastodon, Threads, or Nostr
2. **Sign in** — via ATProto OAuth (your credentials are never shared with Opal)
3. **Upload your export** — parsed entirely in the browser
4. **Review** — see what will be imported before publishing
5. **Publish** — records are published directly to your PDS with automatic rate-limit handling

The web app is built with SvelteKit and uses [`@ewanc26/opal`](https://github.com/ewanc26/pkgs/tree/main/packages/opal) as an npm dependency for all shared logic.

## CLI

### Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- [pnpm](https://pnpm.io) (recommended)

### Install and Build

```bash
# Clone the monorepo
git clone https://github.com/ewanc26/pkgs.git
cd pkgs

# Install all workspace dependencies
pnpm install

# Build the opal CLI
pnpm --filter @ewanc26/opal build
```

### Quick Start

```bash
# Convert Twitter archive
pnpm --filter @ewanc26/opal start -- --source twitter --input tweets.js --output posts.json

# Convert Mastodon outbox
pnpm --filter @ewanc26/opal start -- --source mastodon --input outbox.json --output posts.json

# Convert and publish (dry run first)
pnpm --filter @ewanc26/opal start -- --source nostr --input events.json --publish --dry-run
```

### Command Line Options

| Option                | Description                                                              |
| --------------------- | ------------------------------------------------------------------------ |
| `--source <platform>` | Source platform: `twitter`, `mastodon`, `threads`, or `nostr` (required) |
| `--input <file>`      | Input file path (required)                                               |
| `--output <file>`     | Write converted JSON to file                                             |
| `--publish`           | Publish to AT Protocol after conversion                                  |
| `--dry-run`           | Show what would be published without publishing                          |
| `-h, --help`          | Show help message                                                        |

## Supported Platforms

| Platform  | Input format                 | Notes                                                                                                                                                   |
| --------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Twitter/X | `tweets.js` from data export | Entries wrapped in `{ tweet: {...} }`. `t.co` URLs replaced with expanded forms. `extended_entities` for media. `conversation_id_str` for thread roots. |
| Mastodon  | `outbox.json` (ActivityPub)  | HTML stripped to plain text. Boosts (`Announce` activities) skipped. Content warnings prepended as text.                                                |
| Threads   | JSON export (`posts_1.json`) | Uses `title` for text, `creation_timestamp` (Unix seconds). No official schema — reverse-engineered. Limited structured data.                           |
| Nostr     | Event JSON array (kind 1)    | NIP-10 marked `e` tags for threading, NIP-18 `q` tags for quotes, NIP-92 `imeta` for media, NIP-12 `t` tags for hashtags. Kind 6 reposts skipped.       |

## Thread Splitting

Posts exceeding the 300-grapheme AT Protocol limit are automatically split into Bluesky threads. Opal:

1. Splits text at word boundaries near the limit
2. Creates a chain of posts linked by `replyTo`/`threadRoot` references
3. Media, facets, and quote embeds attach to the first chunk only
4. The publisher resolves internal references to real AT URIs and CIDs as it publishes sequentially

## Facet Conversion

Links, mentions, and hashtags are converted to AT Protocol facets where possible:

| Source              | Facet type                        | Notes                                                                   |
| ------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| Twitter URLs        | `app.bsky.richtext.facet#link`    | `t.co` shortlinks replaced with `expanded_url` before facet computation |
| Twitter mentions    | `app.bsky.richtext.facet#mention` | Screen names converted to DIDs where resolvable                         |
| Twitter hashtags    | `app.bsky.richtext.facet#tag`     | Direct mapping                                                          |
| Mastodon URLs       | `app.bsky.richtext.facet#link`    | Detected in stripped text                                               |
| Mastodon mentions   | `app.bsky.richtext.facet#link`    | Cannot resolve to DIDs — converted to link facets                       |
| Nostr `t` tags      | `app.bsky.richtext.facet#tag`     | NIP-12 hashtags                                                         |
| Nostr `r` tags      | `app.bsky.richtext.facet#link`    | NIP-19 URLs                                                             |
| Nostr `nostr:` refs | `app.bsky.richtext.facet#link`    | `nostr:npub1...` references                                             |

## Rate Limiting

Opal publishes records sequentially via `com.atproto.repo.createRecord` and monitors rate limit headers in real-time. It dynamically adjusts the delay between posts to stay within your PDS's quota, maintaining a 15% headroom buffer.

## Record Keys

Published records use TID-based record keys derived from each post's original timestamp via [`@ewanc26/tid`](/documentation/tid). This ensures chronological sort order and monotonicity — even if posts share the same timestamp, the TID clock advances.

## Using as a Library

Opal can be used as a library in other projects. The main entry has zero Node.js dependencies — it works in browsers and Node.js:

```typescript
import {
	// Conversion
	convertData,
	parseTwitterArchive,
	convertTwitter,
	convertMastodon,
	convertThreads,
	convertNostr,

	// Publishing
	publishRecords,
	RateLimiter,

	// Threading
	splitToThread,
	splitTextToChunks,

	// TID generation
	generateTID,

	// Types
	type MicroblogPost,
	type ConvertResult,
	type Platform
} from '@ewanc26/opal';
```

## Development

All commands run from the `pkgs` root:

```bash
pnpm --filter @ewanc26/opal build        # Build
pnpm --filter @ewanc26/opal type-check   # Type checking
pnpm --filter @ewanc26/opal dev          # Rebuild and run

# Web frontend
pnpm --filter @ewanc26/opal-web dev      # Dev server at http://127.0.0.1:5173
pnpm --filter @ewanc26/opal-web build    # Build for deployment
```

## License

AGPL-3.0-only.
