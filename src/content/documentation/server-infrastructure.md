---
title: server-infrastructure
description: Reproducible configuration for the services hosted from /Volumes/Storage/Server on macOS using OrbStack, Docker Compose and a system launchd daemon.
date: 2026-11-11
tags: [infrastructure, docker, nix, macos, self-hosting, devops]
draft: false
---

[server-infrastructure](https://github.com/ewanc26/server-infrastructure) is reproducible configuration for the services hosted from `/Volumes/Storage/Server` on macOS using OrbStack, Docker Compose and a system `launchd` daemon.

Runtime data, databases, Minecraft worlds, backups, credentials, `.env` secret files, API tokens and private keys are deliberately excluded from the repository.

## Services

- Forgejo at `git.croft.click`
- Bluesky reference PDS at `pds.croft.click`
- Cloudflare Tunnel ingress for the public services
- Edge gateway for HTTP routes; if a backing service is stopped, the public hostname returns HTTP 503 instead of a tunnel/proxy error

The services share the `croft_default` Docker network and use `restart: unless-stopped`. Application data is persisted with bind mounts under the server directory; the stack does not declare Docker named volumes. A system supervisor checks the floating PDS `latest` image channel and updates it on a schedule.

## Layout

The repository holds the `stack/` definitions (Docker Compose and configuration), a `Git/` directory, and the `launchd` supervisor configuration that keeps the stack running.

## Status

Actively maintained reproducible configuration; the public services run from this stack on the author's macOS server.

## Licence

No licence file is present in the repository.