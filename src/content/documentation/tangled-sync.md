---
title: tangled-sync
description: Automate mirroring GitHub repositories to Tangled and publishing sh.tangled.repo ATProto records.
date: 2025-02-24
tags: [atproto, tangled, github, automation, typescript]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfkziamlpw25"
---

[tangled-sync](https://github.com/ewanc26/tangled-sync) is a TypeScript tool that clones all repositories under a GitHub user, pushes them to [Tangled](https://tangled.sh) mirrors, updates their READMEs with a Tangled mirror link, and publishes `sh.tangled.repo` records to AT Protocol for each one — keeping your GitHub projects discoverable via the AT Protocol ecosystem.

## Setup

```bash
git clone git@github.com:ewanc26/tangled-sync
cd tangled-sync
npm install
cp src/.env.example src/.env
```

Edit `src/.env`:

```env
BASE_DIR=/path/to/local/clone/directory
GITHUB_USER=your-github-username
ATPROTO_DID=did:plc:your-did
BLUESKY_PDS=https://your-pds.example.com
BLUESKY_USERNAME=you.bsky.social
BLUESKY_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

Ensure your Tangled SSH key is configured before running — the script will attempt to create Tangled remotes, which requires valid SSH authentication.

## Testing AT Protocol Connection

Before the full sync, verify your AT Protocol setup:

```bash
npm run test-atproto
```

This checks credentials, confirms your DID, and lists existing `sh.tangled.repo` records.

## Running the Sync

```bash
npm run sync
```

What happens:

1. Authenticates with Bluesky
2. Clones all GitHub repos under `GITHUB_USER` (skips the `<username>/<username>` profile repo)
3. Adds a `tangled` remote to each repo if missing
4. Pushes the `main` branch to Tangled
5. Injects a Tangled mirror link into each README if not already present
6. Creates `sh.tangled.repo` ATProto records for each repo

The script is idempotent — safe to run multiple times. Existing remotes and ATProto records are checked before creation.

## Notes

- Record keys use TIDs (Timestamp Identifiers) to ensure uniqueness
- Repos that fail to push to Tangled are logged and skipped; the rest continue
- `BASE_DIR` is created automatically if it doesn't exist

## Licence

See repository.
