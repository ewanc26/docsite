---
title: bluesky-avatar-updater
description: Rotate your Bluesky avatar (and optionally banner) every hour from a CID map. Written in Rust; unmaintained.
date: 2026-04-11
tags: [bluesky, atproto, rust, automation, unmaintained]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfpgwyo25"
---

[bluesky-avatar-updater](https://github.com/ewanc26/bluesky-avatar-updater) is a Rust tool that swaps your Bluesky profile avatar — and optionally your banner — based on the current hour. Each hour maps to a blob CID stored in a JSON config file. It fetches the blob metadata from your PDS, updates the profile record, writes logs, and installs an hourly cron job so it can run unattended.

Inspired by [@dame.is](https://bsky.app/profile/dame.is)'s post on building an automated dynamic avatar.

## Status

Unmaintained — the repository carries a "No Maintenance Intended" badge.

## Setup

Requires Rust 1.85+ and Cargo. No Python environment is needed.

```bash
git clone https://github.com/ewanc26/bluesky-avatar-updater.git
cd bluesky-avatar-updater
cargo build --release
```

Create `assets/.env` (a `.env` in the repository root is also read):

```env
ENDPOINT=https://bsky.social
HANDLE=your_handle.bsky.social
PASSWORD=your_app_password
DID=did:plc:your_did
UPDATE_BANNER=false
```

Create `assets/cids.json` mapping each hour to blob CIDs. The `banner` field is optional per hour:

```json
{
  "00": { "avatar": "cid_for_midnight", "banner": "banner_cid_for_midnight" },
  "01": { "avatar": "cid_for_1am", "banner": "banner_cid_for_1am" }
}
```

Run it:

```bash
cargo run --release
```

After building, the binary can also be run directly with `./target/release/bluesky-avatar-updater`.

On startup it:

1. Adds `0 * * * * /path/to/binary` to your crontab if the binary is not already listed
2. Loads environment variables from `.env` or `assets/.env`
3. Validates `ENDPOINT`, `HANDLE`, `PASSWORD`, and `DID`, and normalises the endpoint to HTTPS
4. Checks the endpoint's `xrpc/_health` route
5. Reads the CID map from `assets/cids.json`
6. Selects the avatar and optional banner for the current hour
7. Logs in with the app password and reads the current profile record, keeping its CID for a `swap_record` update
8. Fetches blob metadata from `com.atproto.sync.getBlob` and updates the avatar; updates the banner only when `UPDATE_BANNER=true` and a banner CID exists
9. Writes the profile record and logs to daily-rolled files under `logs/`

## Licence

MIT.
