---
title: Malachite
description: Import your Last.fm and Spotify listening history to the AT Protocol network using the fm.teal.alpha.feed.play lexicon.
date: 2026-02-24
tags: [malachite, atproto, lastfm, spotify, tools]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfkzidriag25"
---

[Malachite](https://github.com/ewanc26/malachite) is a tool for importing your Last.fm and Spotify listening history to the AT Protocol network as `fm.teal.alpha.feed.play` records. It's designed to be safe, resumable, and smart about rate limits — so you don't accidentally hammer your PDS.

The name is a deliberate nod to the `teal` lexicon it publishes to: malachite is a greenish-blue copper mineral associated with preservation and transformation, sitting squarely in that teal/green colour range.

## Usage Options

Malachite comes in two forms:

**Web interface** — the easiest way to get started. Visit [malachite.ewancroft.uk](https://malachite.ewancroft.uk), sign in with your ATProto handle and an app password, upload your export files, and import. Everything runs locally in your browser — no data is sent to any server other than your own PDS.

**CLI** — a Node.js command-line tool for local use. Useful if you want full control over batch settings, need to automate imports, or simply prefer the terminal. Requires cloning the repository and building from source.

## Web Interface

No installation required. Open [malachite.ewancroft.uk](https://malachite.ewancroft.uk) and follow the steps:

1. **Choose a mode** — Last.fm, Spotify, combined, sync, or deduplicate
2. **Sign in** — your ATProto handle and an app password (never stored)
3. **Upload your export** — CSV or JSON, parsed entirely in the browser
4. **Import** — records are published directly to your PDS with automatic rate-limit handling

## CLI

### Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- [pnpm](https://pnpm.io) (recommended) — or npm / yarn

### Install & Build

```bash
# Clone the repository
git clone https://github.com/ewanc26/malachite.git
cd malachite

# Install dependencies
pnpm install

# Build
pnpm build
```

### Quick Start

```bash
# Run in interactive mode (recommended for first-time use)
pnpm start

# Or with command line arguments
pnpm start -i lastfm.csv -h alice.bsky.social -p xxxx-xxxx-xxxx-xxxx -y
```

Interactive mode walks you through everything: choosing a mode, entering credentials, picking files, and setting optional flags.

### Common Invocations

```bash
# Import from Last.fm CSV
pnpm start -i lastfm.csv -h alice.bsky.social -p xxxx-xxxx-xxxx-xxxx -y

# Import from Spotify JSON export
pnpm start -i spotify-export/ -m spotify -h alice.bsky.social -p xxxx-xxxx-xxxx-xxxx -y

# Merge both sources
pnpm start -i lastfm.csv --spotify-input spotify-export/ -m combined -h alice.bsky.social -p xxxx-xxxx-xxxx-xxxx -y

# Sync (skip already-imported records)
pnpm start -i lastfm.csv -m sync -h alice.bsky.social -p xxxx-xxxx-xxxx-xxxx -y

# Remove duplicates from your Teal feed
pnpm start -m deduplicate -h alice.bsky.social -p xxxx-xxxx-xxxx-xxxx

# Preview without publishing
pnpm start -i lastfm.csv --dry-run
```

## Import Modes

| Mode | Flag | Description |
|------|------|-------------|
| Last.fm | `-m lastfm` (default) | Import a Last.fm CSV export |
| Spotify | `-m spotify` | Import Spotify Extended Streaming History JSON |
| Combined | `-m combined` | Merge both sources with deduplication |
| Sync | `-m sync` | Skip records that already exist on Teal |
| Deduplicate | `-m deduplicate` | Remove duplicate records already on Teal |

## Command Line Options

### Required

| Option | Short | Description |
|--------|-------|-------------|
| `--input <path>` | `-i` | Path to Last.fm CSV or Spotify JSON file/directory |
| `--handle <handle>` | `-h` | Your ATProto handle or DID |
| `--password <pass>` | `-p` | Your ATProto app password (not your main password) |

### Common Options

| Option | Short | Description |
|--------|-------|-------------|
| `--mode <mode>` | `-m` | Import mode (see table above) |
| `--spotify-input <path>` | | Spotify export path (for combined mode) |
| `--reverse` | `-r` | Process newest tracks first |
| `--yes` | `-y` | Skip confirmation prompts |
| `--dry-run` | | Preview records without publishing |
| `--verbose` | `-v` | Debug-level logging |
| `--quiet` | `-q` | Warnings and errors only |
| `--dev` | | Verbose + file logging + smaller batches |
| `--pds <url>` | | Skip identity resolution and use a known PDS URL directly |

## Getting Your Data

**Last.fm:** Export your scrobbles from [lastfm.ghan.nl/export](https://lastfm.ghan.nl/export/) as a CSV.

**Spotify:** Go to [Spotify Privacy Settings](https://www.spotify.com/account/privacy/), request your "Extended streaming history" (takes up to 30 days), then use either a single `Streaming_History_Audio_*.json` file or the whole extracted directory. Malachite automatically filters out podcasts and non-music content.

## Duplicate Prevention

Malachite has two layers of protection against duplicates:

**Input deduplication** — before publishing anything, it removes entries within your source file that share the same track name, artist, and timestamp.

**Teal comparison** — it fetches all your existing Teal records and skips anything already imported. This uses adaptive batch sizing (starting at 25, scaling up to 100 based on network performance) and shows real-time progress. This runs automatically; no special mode needed, but credentials are required even for dry runs.

## Rate Limiting

Bluesky's AppView enforces rate limits on PDS instances. Exceeding 10K records per day can rate-limit your **entire PDS** — affecting all users on it, not just your account.

Malachite handles this automatically:

- Monitors your rate limit quota in real-time from response headers
- Dynamically adjusts batch size between 1 and 200 records
- Maintains a 15% headroom buffer so the quota is never fully exhausted
- Hard daily cap of 7,500 records (75% safety margin)
- Pauses 24 hours between days for large imports
- Scales immediately back to maximum speed after a quota reset

You can also check your current rate limit status at any time (CLI only):

```bash
npm run check-limits
```

## File Storage

All CLI data is stored in `~/.malachite/`:

```
~/.malachite/
├── cache/            # Cached Teal records (24-hour TTL)
├── state/            # Import state for resume support
├── logs/             # Logs when --dev is active
└── credentials.json  # AES-256-GCM encrypted credentials (optional)
```

Credentials are encrypted using a key derived from your hostname and username, making them machine-specific. You can clear them with `pnpm start --clear-credentials`.

## Record Format

Each scrobble is published as an `fm.teal.alpha.feed.play` record. Required fields are `trackName`, `artists`, `playedTime`, `submissionClientAgent`, and `musicServiceBaseDomain`. Last.fm imports also include MusicBrainz IDs when available.

Example Last.fm record:

```json
{
  "$type": "fm.teal.alpha.feed.play",
  "trackName": "Paint My Masterpiece",
  "artists": [{ "artistName": "Cjbeards", "artistMbId": "c8d4f4bf-..." }],
  "releaseName": "Masquerade",
  "playedTime": "2026-11-13T23:49:36Z",
  "originUrl": "https://www.last.fm/music/Cjbeards/_/Paint+My+Masterpiece",
  "submissionClientAgent": "malachite/v0.9.3",
  "musicServiceBaseDomain": "last.fm"
}
```

## Development

```bash
pnpm run type-check   # Type checking
pnpm run build        # Build
pnpm run dev          # Rebuild and run
pnpm run test         # Run tests
pnpm run clean        # Clean build artifacts
```

## Lexicon

Malachite publishes to the `fm.teal.alpha` lexicon. The schema definitions live in `/lexicons/fm.teal.alpha/` in the repository.

## License

AGPL-3.0-only.
