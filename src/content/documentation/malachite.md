---
title: Malachite
description: Import your Last.fm and Spotify listening history to the AT Protocol network using the fm.teal.alpha.feed.play lexicon.
date: 2026-03-15
tags: [malachite, atproto, lastfm, spotify, apple-music, youtube-music, tools]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfjxlo625'
---

> **Note:** The standalone [malachite](https://github.com/ewanc26/malachite) repository has been archived. Development continues in the [`@ewanc26/pkgs`](https://github.com/ewanc26/pkgs) monorepo — CLI at [`packages/malachite/`](https://github.com/ewanc26/pkgs/tree/main/packages/malachite), web frontend at [`packages/malachite-web/`](https://github.com/ewanc26/pkgs/tree/main/packages/malachite-web).

Malachite is a tool for importing your Last.fm, Spotify, Apple Music, and YouTube Music listening history to the AT Protocol network as `fm.teal.alpha.feed.play` records. It's designed to be safe, resumable, and smart about rate limits — so you don't accidentally hammer your PDS.

The name is a deliberate nod to the `teal` lexicon it publishes to: malachite is a greenish-blue copper mineral associated with preservation and transformation, sitting squarely in that teal/green colour range.

## The Sigil

Malachite's logo is a sigil designed with pagan symbolism:

- **Concentric rings** — Sacred circles of protection; cycles of listening, returning, remembering
- **Pentagram** — The five-pointed star binds the elements (earth, air, fire, water, spirit); each point a moment in time, connected through listening
- **Centre point** — The listener as witness, the still point around which music revolves
- **The name** — Malachite itself: a stone of transformation, protection, and safe passage between states

The sigil represents what the tool does: gathering scattered plays into a protected, meaningful pattern — your listening history as a kind of sorcery, records bound into a coherent whole.

## Usage Options

Malachite comes in two forms:

**Web interface** — the easiest way to get started. Visit [malachite.croft.click](https://malachite.croft.click), authenticate via ATProto OAuth (recommended) or an app password, upload your export files, and import. Everything runs locally in your browser — no data is sent to any server other than your own PDS.

**CLI** — a Node.js command-line tool for local use. Useful if you want full control over batch settings, need to automate imports, or simply prefer the terminal. Requires cloning the repository and building from source.

## Web Interface

No installation required. Open [malachite.croft.click](https://malachite.croft.click) and follow the wizard:

1. **Choose a mode** — Last.fm, Spotify, combined, sync, or deduplicate
2. **Sign in** — via ATProto OAuth (recommended; redirects to your PDS and back, your credentials are never shared with Malachite) or an app password
3. **Upload your export** — CSV or JSON, parsed entirely in the browser (skipped in deduplicate mode)
4. **Options** — optionally enable dry run, reverse chronological order, or skip the Teal duplicate check
5. **Run** — records are published directly to your PDS with automatic rate-limit handling

The web app is built with SvelteKit and uses [`@ewanc26/malachite`](https://github.com/ewanc26/pkgs/tree/main/packages/malachite) as an npm dependency for all shared logic.

## CLI

### Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- [pnpm](https://pnpm.io) (recommended) — or npm / yarn

### Install and Build

```bash
# Clone the monorepo
git clone https://github.com/ewanc26/pkgs.git
cd pkgs

# Install all workspace dependencies
pnpm install

# Build the malachite CLI
pnpm --filter @ewanc26/malachite build
```

### Authentication

The CLI supports two authentication methods. OAuth is recommended.

**OAuth (recommended)**

Signs in via your browser — your password is never shared with Malachite. The session is persisted at `~/.malachite/oauth.json` and refreshes automatically.

```bash
# From the pkgs root
pnpm --filter @ewanc26/malachite start -- --oauth-login
```

This opens your browser at your PDS's OAuth authorisation screen. After approving, you're redirected back and the session is saved. Subsequent imports will use the stored session automatically — no flags required.

**App password**

If you prefer not to use OAuth, pass your handle and an [app password](https://bsky.app/settings/app-passwords) directly. The credentials are encrypted and saved for future runs.

```bash
pnpm --filter @ewanc26/malachite start -- -h alice.bsky.social -p xxxx-xxxx-xxxx-xxxx -i lastfm.csv -y
```

### Quick Start

```bash
# Sign in with OAuth first (one-time)
pnpm --filter @ewanc26/malachite start -- --oauth-login

# Then run in interactive mode (recommended for first-time use)
pnpm --filter @ewanc26/malachite start

# Or pass arguments directly — stored OAuth session is used automatically
pnpm --filter @ewanc26/malachite start -- -i lastfm.csv -y
```

Interactive mode walks you through everything: choosing a mode, checking for stored sessions, picking files, and setting optional flags.

### Common Invocations

All commands run from the `pkgs` root. These assume a stored OAuth session; pass `-h` and `-p` instead if using app-password auth.

```bash
# Import from Last.fm CSV
pnpm --filter @ewanc26/malachite start -- -i lastfm.csv -y

# Import Spotify export
pnpm --filter @ewanc26/malachite start -- -i spotify-export/ -m spotify -y

# Import Apple Music export
pnpm --filter @ewanc26/malachite start -- -i Apple_Music_Play_Activity.csv -m apple -y

# Import YouTube Music export
pnpm --filter @ewanc26/malachite start -- -i watch-history.json -m youtube -y

# Combined mode: Merge Last.fm, Spotify, Apple Music & YouTube Music
pnpm --filter @ewanc26/malachite start -- -i lastfm.csv --spotify-input spotify-export/ --apple-input Apple_Music_Play_Activity.csv --youtube-input watch-history.json -m combined -y

# Sync (skip already-imported records)
pnpm --filter @ewanc26/malachite start -- -i lastfm.csv -m sync -y

# Remove duplicates from your Teal feed
pnpm --filter @ewanc26/malachite start -- -m deduplicate

# Preview without publishing
pnpm --filter @ewanc26/malachite start -- -i lastfm.csv --dry-run

# List stored OAuth sessions
pnpm --filter @ewanc26/malachite start -- --list-sessions

# Sign out
pnpm --filter @ewanc26/malachite start -- --logout

# Sign out a specific session by DID
pnpm --filter @ewanc26/malachite start -- --logout -h did:plc:xxxx
```

## Import Modes

| Mode        | Flag                  | Description                                    |
| ----------- | --------------------- | ---------------------------------------------- |
| Last.fm     | `-m lastfm` (default) | Import a Last.fm CSV export                    |
| Spotify     | `-m spotify`          | Import Spotify Extended Streaming History JSON |
| Apple Music | `-m apple`            | Import Apple Music Play Activity CSV           |
| YouTube     | `-m youtube`          | Import YouTube Music history JSON              |
| Combined    | `-m combined`         | Merge all sources with deduplication           |
| Sync        | `-m sync`             | Skip records that already exist on Teal        |
| Deduplicate | `-m deduplicate`      | Remove duplicate records already on Teal       |

## Command Line Options

### Authentication

| Option                     | Description                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------ |
| `--oauth-login`            | Sign in via OAuth — opens browser, saves session (recommended)                       |
| `--logout`                 | Remove stored OAuth session (`--handle <did>` to target a specific one)              |
| `--list-sessions`          | List all stored OAuth sessions                                                       |
| `--handle <handle>` / `-h` | ATProto handle or DID (for app-password auth, or to target a specific OAuth session) |
| `--password <pass>` / `-p` | ATProto app password                                                                 |
| `--pds <url>`              | Skip identity resolution and connect to a known PDS URL directly                     |

`did:web` identifiers are supported in addition to handles and `did:plc` DIDs.

### Input

| Option                   | Short | Description                               |
| ------------------------ | ----- | ----------------------------------------- |
| `--input <path>`         | `-i`  | Path to primary input file/directory      |
| `--spotify-input <path>` |       | Spotify export path (combined mode)       |
| `--apple-input <path>`   |       | Apple Music export path (combined mode)   |
| `--youtube-input <path>` |       | YouTube Music export path (combined mode) |

### Import

| Option          | Short | Description                                           |
| --------------- | ----- | ----------------------------------------------------- |
| `--mode <mode>` | `-m`  | Import mode (see table above)                         |
| `--reverse`     | `-r`  | Process newest tracks first                           |
| `--yes`         | `-y`  | Skip confirmation prompts                             |
| `--dry-run`     |       | Preview records without publishing                    |
| `--aggressive`  |       | Use 85% of the daily limit (8,500/day) instead of 75% |
| `--fresh`       |       | Ignore previous import state and cached records       |

### Output

| Option      | Short | Description                              |
| ----------- | ----- | ---------------------------------------- |
| `--verbose` | `-v`  | Debug-level logging                      |
| `--quiet`   | `-q`  | Warnings and errors only                 |
| `--dev`     |       | Verbose + file logging + smaller batches |

### Maintenance

| Option                | Description                                       |
| --------------------- | ------------------------------------------------- |
| `--clear-cache`       | Clear cached Teal records for the current account |
| `--clear-all-caches`  | Clear all cached records                          |
| `--clear-credentials` | Clear saved app-password credentials              |

## Getting Your Data

**Last.fm:** Use [Last.fm Data Export](https://lastfm.ghan.nl/export/) or similar tools to get your full history as a `.csv`. The importer expects the standard column format (`artist,album,track,date`).

**Spotify:** Go to [Spotify Privacy Settings](https://www.spotify.com/account/privacy/), request your "Extended streaming history" (takes up to 30 days), then use either a single `Streaming_History_Audio_*.json` file or the whole extracted directory. Malachite automatically filters out podcasts and non-music content.

**Apple Music:** Go to [Apple Data & Privacy](https://privacy.apple.com/), request "Apple Media Services information", extract the zip, and use the `Apple Music Play Activity.csv` file.

**YouTube Music:** Go to [Google Takeout](https://takeout.google.com/), select "YouTube and YouTube Music", ensure the format is set to JSON, extract the zip, and use the `watch-history.json` file.

## Duplicate Prevention

Malachite has two layers of protection against duplicates:

**Input deduplication** — before publishing anything, it removes entries within your source file that share the same track name, artist, and timestamp.

**Teal comparison via CAR export** — it downloads your entire repo as a single CARv1 file using `com.atproto.sync.getRepo` (the sync namespace, not the AppView), parses it locally, and skips anything already imported. This costs zero AppView write-quota points. It runs automatically for every mode.

## Rate Limiting

Bluesky's AppView enforces rate limits on PDS instances. Exceeding 10K records per day can rate-limit your **entire PDS** — affecting all users on it, not just your account.

Malachite handles this automatically:

- Monitors your rate limit quota in real-time from response headers
- Dynamically adjusts batch size between 1 and 200 records
- Maintains a 15% headroom buffer so the quota is never fully exhausted
- Hard daily cap of 7,500 records (75% safety margin)
- Pauses 24 hours between days for large imports
- Scales immediately back to maximum speed after a quota reset

## File Storage

All CLI data is stored in `~/.malachite/`:

```
~/.malachite/
├── cache/            # Cached Teal records (24-hour TTL)
├── state/            # Import state for resume support
├── logs/             # Logs when --dev is active
├── credentials.json  # AES-256-GCM encrypted app-password credentials (optional)
└── oauth.json        # OAuth session state (chmod 600)
```

App-password credentials are saved automatically after every successful login and encrypted using a key derived from your hostname and username, making them machine-specific. Clear them with `--clear-credentials`.

OAuth sessions are saved automatically after `--oauth-login` and refresh automatically when the access token expires. Clear them with `--logout`.

## Record Format

Each scrobble is published as an `fm.teal.alpha.feed.play` record. Required fields are `trackName`, `artists`, `playedTime`, `submissionClientAgent`, and `musicServiceBaseDomain`. Last.fm imports also include MusicBrainz IDs when available.

Example Last.fm record:

```json
{
	"$type": "fm.teal.alpha.feed.play",
	"trackName": "Paint My Masterpiece",
	"artists": [{ "artistName": "Cjbeards", "artistMbId": "c8d4f4bf-..." }],
	"releaseName": "Masquerade",
	"playedTime": "2025-11-13T23:49:36Z",
	"originUrl": "https://www.last.fm/music/Cjbeards/_/Paint+My+Masterpiece",
	"submissionClientAgent": "malachite/v0.12.0",
	"musicServiceBaseDomain": "last.fm"
}
```

## Development

All commands run from the `pkgs` root:

```bash
pnpm --filter @ewanc26/malachite run type-check   # Type checking
pnpm --filter @ewanc26/malachite run build        # Build
pnpm --filter @ewanc26/malachite run dev          # Rebuild and run
pnpm --filter @ewanc26/malachite run test         # Run tests
pnpm --filter @ewanc26/malachite run clean        # Clean build artifacts

# Web frontend
pnpm --filter @ewanc26/malachite-web dev          # Dev server at http://127.0.0.1:5173
pnpm --filter @ewanc26/malachite-web build        # Build for deployment
```

## Using as a Library

Malachite can be used as a library in other projects. The `/core` export provides environment-agnostic logic:

```typescript
import {
	// Spotify parsing
	parseSpotifyJsonContent,
	convertSpotifyToPlayRecord,

	// CSV parsing
	parseLastfmCsv,
	parseLastfmCsvString,

	// AT Protocol publishing
	PlayRecordPublisher,
	RateLimiter,

	// TID generation
	generateTID,

	// Types
	type SpotifyRecord,
	type PlayRecord
} from '@ewanc26/malachite/core';
```

The core module has **zero Node.js dependencies** — it works in browsers, Deno, and Node.js 20+. All I/O and UI concerns are handled by the consumer.

See `CONTRIBUTING.md` in the package for the `src/core/` contract if you want to extend it.

## Lexicon

Malachite publishes to the `fm.teal.alpha` lexicon. The schema definitions live in `/lexicons/fm.teal.alpha/` in the repository.

## License

AGPL-3.0-only.
