---
title: bluesky-avatar-updater
description: Automatically update your Bluesky avatar (and banner) every hour based on the time of day.
date: 2026-04-11
tags: [bluesky, atproto, python, automation]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfpgwyo25"
---

[bluesky-avatar-updater](https://github.com/ewanc26/bluesky-avatar-updater) is a Python script that swaps your Bluesky profile avatar — and optionally your banner — based on the current hour. Each hour maps to a blob CID stored in a JSON config file. The script sets up its own cron job to run hourly, handles log rotation, and performs an API health check on each run.

Inspired by [@dame.is](https://bsky.app/profile/dame.is)'s post on building an automated dynamic avatar.

## Setup

Requires Python 3.6+, a virtual environment, and a Linux/macOS host (developed on macOS, intended for Linux deployment).

```bash
git clone git@github.com:ewanc26/bluesky-avatar-updater
cd bluesky-avatar-updater
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create `assets/.env`:

```env
ENDPOINT=your_endpoint
HANDLE=your_handle
PASSWORD=your_app_password
DID=your_did
UPDATE_BANNER=true
```

Create `assets/cids.json` mapping each hour to blob CIDs:

```json
{
  "00": { "avatar": "bafkrei...", "banner": "bafkrei..." },
  "01": { "avatar": "bafkrei...", "banner": "bafkrei..." }
}
```

Run the script:

```bash
python -u ./src/main.py
```

On first run, the script will install a cron job to execute itself at the top of every hour.

## What It Does on Each Run

1. Verifies it's running inside a virtual environment
2. Loads credentials from `assets/.env`
3. Reads the CID map from `assets/cids.json`
4. Checks the current hour and selects the right blob CIDs
5. Performs an API health check on the configured endpoint
6. Authenticates via AT Protocol and updates the profile
7. Writes logs to a rotating file in `logs/` (14-day rotation, 5 backups, 30-day deletion)
8. Installs/updates the cron job

## Licence

MIT.
