---
title: "@ewanc26/tangled-sync"
description: CLI tool for syncing GitHub repositories to Tangled with ATProto record publishing — now part of the @ewanc26/pkgs monorepo.
date: 2026-02-24
tags: [atproto, tangled, github, automation, typescript, monorepo]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfhi6no25"
---

[`@ewanc26/tangled-sync`](https://github.com/ewanc26/pkgs/tree/main/packages/tangled-sync) is a TypeScript CLI tool that clones all repositories under a GitHub user, pushes them to [Tangled](https://tangled.sh) mirrors, updates their READMEs with a Tangled mirror link, and publishes `sh.tangled.repo` records to AT Protocol for each one — keeping your GitHub projects discoverable via the AT Protocol ecosystem.

This tool is now part of the [@ewanc26/pkgs monorepo](/projects/pkgs).

## Installation

```bash
npm install -g @ewanc26/tangled-sync
# or
pnpm add -g @ewanc26/tangled-sync
```

Or run directly without installing:

```bash
npx @ewanc26/tangled-sync
```

## Setup

Create a `.env` file in your working directory:

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
tangled-sync-test-atproto
```

This checks credentials, confirms your DID, and lists existing `sh.tangled.repo` records.

## Running the Sync

```bash
tangled-sync          # sync new repos only
tangled-sync --force  # force sync all repos
```

Or run the health check first:

```bash
tangled-sync-check
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
