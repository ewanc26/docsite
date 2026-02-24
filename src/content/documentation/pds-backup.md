---
title: pds-backup
description: A Bash script for automated, resumable PDS backups via rsync over SSH with change detection and cron scheduling.
date: 2026-02-24
tags: [atproto, pds, bash, self-hosting, tools]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfkzicfc6g25"
---

[pds-backup](https://github.com/ewanc26/pds-backup) is a Bash script that automates backups of your AT Protocol Personal Data Server. It stops the PDS service, creates a timestamped `.tar.gz` archive of `/pds`, compares SHA-256 checksums against the most recent remote backup to skip unchanged runs, transfers via rsync over SSH (with up to 3 retries), then restarts the PDS. Cron jobs are installed automatically for twice-daily runs at midnight and noon.

## Requirements

- Linux with systemd (`systemctl` for PDS service management)
- Root privileges (`sudo`)
- Passwordless SSH configured to the destination machine
- The [bluesky-social/pds](https://github.com/bluesky-social/pds) server installed

## Configuration

Edit the variables at the top of the script:

```bash
SOURCE_DIR="/pds"                          # PDS data directory
DEST_USER="user"                           # Destination SSH username
DEST_IP="192.168.1.100"                    # Destination IP
DEST_BASE_DIR="/path/to/remote/backup"     # Remote backup root
MAX_RETRIES=3
RETRY_INTERVAL=60
```

## What Happens on Each Run

1. Pings the destination to check it's reachable
2. Stops the PDS service
3. Creates a timestamped `.tar.gz` of `SOURCE_DIR`
4. Compares SHA-256 checksum against the latest remote backup — skips transfer if unchanged
5. Creates a timestamped directory on the remote and transfers via rsync
6. Deletes the local archive on success
7. Removes remote backup directories older than 30 days
8. Rotates local logs (>1000 lines or >30 days old); deletes logs older than 90 days
9. Restarts the PDS service
10. Updates the crontab for midnight and noon daily runs

If any step fails, the script attempts to restart the PDS service before exiting to minimise downtime.

## Usage

```bash
sudo ./pds-backup.sh
```

Cron jobs are installed automatically on each run. Monitor logs:

```bash
tail -f /path/to/script/logs/pds-backup/*.log
```

## Licence

See repository.
