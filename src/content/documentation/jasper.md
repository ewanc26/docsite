---
title: Jasper
description: Convert Instagram data exports into posts, stories, and videos on Grain or Spark while preserving original timestamps.
date: 2026-04-16
tags: [jasper, atproto, instagram, grain, spark, tools]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mjizjbv6qk2t'
---

Jasper imports your Instagram photos to [Grain](https://grain.social) or [Spark](https://sprk.so) while preserving original timestamps. Your memories appear with their original dates, not the import date.

The name follows ATProto import tools using mineral names — a nod to the pattern established by Malachite. Jasper is a red-orange quartz, fitting for something that preserves photographic memories.

## What it does

- **Preserves timestamps** — Photos appear with their original Instagram dates
- **Multiple targets** — Import to Grain or Spark
- **Stories and videos** — Instagram stories and videos import to Spark (Grain doesn't support them)
- **Handles all export formats** — Works with 2022, 2023, 2024, and 2025 Instagram exports
- **Gallery-based (Grain)** — Photos are organised into Grain galleries you choose or create
- **Multi-image posts (Spark)** — Carousel posts import as a single Spark post with up to 12 images
- **Skips duplicates** — Already-imported posts are detected and skipped
- **Dry run mode** — Preview what would be imported before committing
- **OAuth authentication** — Secure login via your existing AT Protocol identity
- **Web interface** — Import from your browser at [jasper.croft.click](https://jasper.croft.click)

## Installation

```bash
# Install globally with pnpm
pnpm install -g @ewanc26/jasper

# Or use directly with npx
npx @ewanc26/jasper -i instagram-export.zip --dry-run
```

## Usage

### Interactive Mode

Run without arguments for guided prompts:

```bash
jasper
```

Jasper will prompt you to select a target platform (Grain or Spark) and, for Grain, select or create a gallery before importing.

### Command Line

```bash
# Import from ZIP to Grain (default)
jasper -i instagram-export.zip

# Import from ZIP to Spark
jasper -i instagram-export.zip --target spark

# Import from extracted directory
jasper -i instagram-export/

# Preview without posting (dry run)
jasper -i instagram-export.zip --dry-run

# Limit to first 50 posts
jasper -i instagram-export.zip --limit 50

# Override alt text for all photos
jasper -i instagram-export.zip --alt "Instagram photo"

# Skip confirmation prompts
jasper -i instagram-export.zip -y

# More verbose output
jasper -i instagram-export.zip -v
```

### Authentication

#### OAuth (Recommended)

```bash
# Sign in via browser
jasper --oauth-login

# Sessions are stored in ~/.jasper/oauth.json
```

OAuth uses a loopback callback server on port 8766. Your browser opens to your PDS's authorisation screen, you approve, and the session is saved automatically. Subsequent imports use the stored session — no re-authentication needed.

#### App Password

If OAuth isn't available, you can use an app password:

```bash
jasper -i export.zip --handle your.handle --password your-app-password
```

Generate an app password at [bsky.app/settings/app-passwords](https://bsky.app/settings/app-passwords).

## Getting Your Instagram Export

1. Open Instagram (app or web browser)
2. Go to your profile
3. Tap the menu (☰) → Settings → Accounts Centre
4. Select "Your information and permissions"
5. Choose "Export your information"
6. Select "Export to device"
7. Choose what to include (or select "All information")
8. Select **JSON format**
9. Choose media quality (High recommended)
10. Enter your password to confirm
11. Wait for the email notification (can take hours to days)
12. Download the ZIP file when ready

Jasper will locate `posts_1.json` and `stories_1.json` automatically, handling all export format variations.

## Target Platforms

Jasper supports two AT Protocol platforms for importing. Each has different capabilities:

| Feature           | Grain                     | Spark                |
| ----------------- | ------------------------- | -------------------- |
| Photos            | ✅                        | ✅                   |
| Videos            | ❌                        | ✅                   |
| Stories           | ❌                        | ✅                   |
| Galleries         | ✅                        | ❌                   |
| Multi-image posts | ❌ (one photo per record) | ✅ (up to 12 images) |
| Alt text          | Optional                  | Required             |
| Max image size    | 1 MB                      | 5 MB                 |

Choose the target that fits your content. Use `--target grain` or `--target spark` (default: grain).

## Data Model

### Grain

Jasper creates three types of records:

1. **`social.grain.photo`** — The image blob with aspect ratio and timestamp
2. **`social.grain.gallery`** — A container you create or select for organising photos
3. **`social.grain.gallery.item`** — Links each photo to your chosen gallery with position

Photos must be linked to a gallery to display properly on grain.social. Each record holds one photo.

### Spark

Jasper creates two types of records:

1. **`so.sprk.feed.post`** — A post with a media union of images or video
2. **`so.sprk.story.post`** — A story with a media union of images or video

Spark uses a media union — each post has either `so.sprk.media.images` (up to 12 images) or `so.sprk.media.video`. Carousel Instagram posts become a single Spark post with multiple images. Videos are uploaded as blobs and attached with `so.sprk.media.video`.

## What Gets Imported

Imported to **Grain**:

- ✅ Photos (JPEG, PNG, WebP, GIF)
- ✅ Original timestamps
- ✅ Captions (as alt text)
- ✅ Carousel posts (each photo as a separate record)

Imported to **Spark**:

- ✅ Photos (JPEG, PNG, WebP, GIF)
- ✅ Videos (MP4, MOV)
- ✅ Original timestamps
- ✅ Captions (as alt text)
- ✅ Carousel posts (up to 12 images per post)
- ✅ Stories (image and video)

**Not** imported:

- ❌ Reels
- ❌ Stories to Grain (not supported)
- ❌ Videos to Grain (not supported)

## Options

| Option                | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `-i, --input <path>`  | Path to Instagram export ZIP or directory            |
| `--target <platform>` | Target platform: `grain` or `spark` (default: grain) |
| `--dry-run`           | Preview posts without importing                      |
| `--limit <N>`         | Import at most N posts                               |
| `--reverse`           | Process newest posts first (default: oldest first)   |
| `--alt <text>`        | Override alt text for all photos (default: captions) |
| `-v, --verbose`       | Enable debug logging                                 |
| `-q, --quiet`         | Suppress non-essential output                        |
| `-y, --yes`           | Skip confirmation prompts                            |
| `--oauth-login`       | Sign in via OAuth                                    |
| `--logout [DID]`      | Sign out (removes stored session)                    |
| `--list-sessions`     | List stored OAuth sessions                           |

## Daily Limits for Large Exports

Large Instagram exports (hundreds of photos) should be split across multiple days to avoid hitting PDS blob upload quotas. Jasper supports resumable imports with daily limits:

```bash
# Import with daily limit (default: 100 posts/day)
jasper -i large-export.zip --daily-limit 50

# Resume previous import session
jasper --resume

# List pending import sessions
jasper --list-imports

# Clear all saved import state
jasper --clear-imports
```

| Option              | Description                                    |
| ------------------- | ---------------------------------------------- |
| `--daily-limit <N>` | Maximum posts to import per day (default: 100) |
| `--resume`          | Resume previous import session                 |
| `--list-imports`    | List pending import sessions                   |
| `--clear-imports`   | Clear all saved import state                   |

When the daily limit is reached, Jasper saves your progress and prompts you to continue the next day. Run `jasper --resume` to continue importing.

## Web Interface

Jasper has a browser-based interface at [jasper.croft.click](https://jasper.croft.click) — no installation required. The web app runs entirely in your browser: your Instagram export is parsed locally, and photos are uploaded directly to your PDS.

The web app uses `@atproto/oauth-client-browser` for authentication. No data passes through any intermediate server.

Source: [`packages/jasper-web`](https://github.com/ewanc26/pkgs/tree/main/packages/jasper-web) in the monorepo.

## Data Storage

All data stays on your machine:

| Location               | Content                             |
| ---------------------- | ----------------------------------- |
| `~/.jasper/oauth.json` | OAuth session tokens                |
| `~/.jasper/imports/`   | Import state for resumable sessions |
| `~/.jasper/logs/`      | Debug log files                     |

No data is sent to any server except your chosen Grain or Spark account.

## OAuth Scope

Jasper requests minimal permissions based on target platform:

**Grain:**

```
atproto blob:*/* repo:social.grain.photo repo:social.grain.gallery repo:social.grain.gallery.item
```

**Spark:**

```
atproto blob:*/* repo:so.sprk.feed.post repo:so.sprk.story.post
```

This follows ATProto's granular permission model — no broad `transition:generic` scope.

## Development

Build from source:

```bash
git clone https://github.com/ewanc26/pkgs.git
cd pkgs

pnpm install
pnpm --filter @ewanc26/jasper build
```

Run in dev mode:

```bash
pnpm --filter @ewanc26/jasper dev
```

Build the web app:

```bash
pnpm --filter @ewanc26/jasper-web build
```

## Requirements

- Node.js 18+
- A [Grain](https://grain.social) or [Spark](https://sprk.so) account (use your existing AT Protocol identity)

## License

AGPL-3.0-only.

## Contact

**Ewan Croft** — [contact@ewancroft.uk](mailto:contact@ewancroft.uk)
