---
title: mc-server
description: A personal PaperMC Minecraft server in Docker Compose with DuckDNS dynamic DNS and management scripts.
date: 2026-02-24
tags: [minecraft, docker, self-hosting]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfj56ww25"
---

[mc-server](https://github.com/ewanc26/mc-server) is a personal Minecraft server setup using Docker Compose with PaperMC, Spigot plugins, and an optional DuckDNS dynamic DNS companion script. Primarily intended for personal use or small groups.

## Setup

Run the master setup script first — it checks prerequisites, configures the server, and optionally sets up a `mcserver` shell alias:

```bash
./scripts/setup_master.sh
```

Start, stop, and check status using the alias (if configured):

```bash
mcserver start
mcserver stop
mcserver status
```

Or directly:

```bash
./scripts/server_status_linux.sh start   # Linux
./scripts/server_status_mac.sh start     # macOS
```

## Optional: DuckDNS

A companion script handles dynamic DNS updates via DuckDNS — see `docs/duckdns.md` for setup steps.

## Documentation

Detailed docs live in the `docs/` directory:

- `features.md` — What's included
- `system-requirements.md` — Hardware and software requirements
- `getting-started.md` — Full setup walkthrough
- `usage.md` — Day-to-day usage
- `maintenance.md` — Backups and upkeep
- `troubleshooting.md` — Common issues
- `rules.md` — Server rules

## Licence

See repository.
