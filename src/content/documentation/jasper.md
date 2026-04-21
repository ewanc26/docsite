---
title: Jasper
description: Convert Instagram data exports into posts on Grain.social while preserving original timestamps.
date: 2026-04-16
tags: [jasper, atproto, instagram, grain, tools]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mjizjbv6qk2t'
---

Jasper imports your Instagram photos to [Grain.social](https://grain.social) while preserving original timestamps. Your memories appear with their original dates, not the import date.

The name follows ATProto import tools using mineral names — a nod to the pattern established by Malachite. Jasper is a red-orange quartz, fitting for something that preserves photographic memories.

## What it does

- **Preserves timestamps** — Photos appear with their original Instagram dates
- **Handles all export formats** — Works with 2022, 2023, 2024, and 2025 Instagram exports
- **Gallery-based** — Photos are organised into Grain galleries you choose or create
- **Skips duplicates** — Already-imported photos are detected and skipped
- **Dry run mode** — Preview what would be imported before committing
- **OAuth authentication** — Secure login via your existing AT Protocol identity

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

Jasper will prompt you to select or create a gallery before importing.

### Command Line

```bash
# Import from ZIP
jasper -i instagram-export.zip

# Import from extracted directory
jasper -i instagram-export/

# Preview without posting (dry run)
jasper -i instagram-export.zip --dry-run

# Limit to first 50 posts
jasper -i instagram-export.zip --limit 50

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
3. Tap the menu (☰) → Settings → Accounts Center
4. Select "Your information and permissions"
5. Choose "Export your information"
6. Select "Export to device"
7. Choose what to include (or select "All information")
8. Select **JSON format**
9. Choose media quality (High recommended)
10. Enter your password to confirm
11. Wait for the email notification (can take hours to days)
12. Download the ZIP file when ready

Jasper will locate `posts_1.json` automatically, handling all export format variations.

## Grain Data Model

Jasper creates three types of records:

1. **`social.grain.photo`** — The image blob with aspect ratio and timestamp
2. **`social.grain.gallery`** — A container you create or select for organizing photos
3. **`social.grain.gallery.item`** — Links each photo to your chosen gallery with position

This matches Grain's expected structure — photos must be linked to a gallery to display properly on grain.social.

## What Gets Imported

Imported:

- ✅ Photos (JPEG, PNG, WebP, GIF)
- ✅ Original timestamps
- ✅ Captions (as alt text)
- ✅ Carousel posts (multiple photos)

**Not** imported:

- ❌ Videos (Grain doesn't support video posts yet)
- ❌ Stories
- ❌ Reels

## Options

| Option               | Description                                        |
| -------------------- | -------------------------------------------------- |
| `-i, --input <path>` | Path to Instagram export ZIP or directory          |
| `--dry-run`          | Preview posts without importing                    |
| `--limit <N>`        | Import at most N posts                             |
| `--reverse`          | Process newest posts first (default: oldest first) |
| `-v, --verbose`      | Enable debug logging                               |
| `-q, --quiet`        | Suppress non-essential output                      |
| `-y, --yes`          | Skip confirmation prompts                          |
| `--oauth-login`      | Sign in via OAuth                                  |
| `--logout [DID]`     | Sign out (removes stored session)                  |
| `--list-sessions`    | List stored OAuth sessions                         |

## Data Storage

All data stays on your machine:

| Location               | Content              |
| ---------------------- | -------------------- |
| `~/.jasper/oauth.json` | OAuth session tokens |
| `~/.jasper/logs/`      | Debug log files      |

No data is sent to any server except your chosen Grain account.

## OAuth Scope

Jasper requests minimal permissions:

```
atproto blob:*/* repo:social.grain.photo repo:social.grain.gallery repo:social.grain.gallery.item
```

- `blob:*/*` — Upload images as blobs
- `repo:social.grain.photo` — Write photo records
- `repo:social.grain.gallery` — Create galleries
- `repo:social.grain.gallery.item` — Link photos to galleries

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

## Requirements

- Node.js 18+
- A [Grain.social](https://grain.social) account (use your existing AT Protocol identity)

## License

AGPL-3.0-only.

## Contact

**Ewan Croft** — [contact@ewancroft.uk](mailto:contact@ewancroft.uk)
