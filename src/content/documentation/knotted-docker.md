---
title: knotted-docker
description: A Dockerised Tangled knot server with optional Cloudflare Tunnel routing.
date: 2026-02-24
tags: [tangled, atproto, docker, self-hosting]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfllmpg25"
---

[knotted-docker](https://github.com/ewanc26/knotted-docker) is an unofficial Dockerised setup for running a [Tangled](https://tangled.sh) knot server — the AT Protocol-native git hosting layer. Tangled uses "knot servers" as repository hosts rather than a user PDS. This repo wraps the official knot server in Docker Compose with optional Cloudflare Tunnel support for exposing it publicly.

## Prerequisites

- Docker and Docker Compose
- Optional: `cloudflared` for Cloudflare Tunnel routing

## Setup

```bash
git clone git@github.com:ewanc26/knotted-docker
cd knotted-docker
```

Edit `.local.env`:

```env
KNOT_SERVER_HOSTNAME=your.local.server
KNOT_SERVER_SECRET=your_secret
```

Start the server:

```bash
docker compose up --build -d
```

The knot server runs on port `5555`; the internal listen address is `127.0.0.1:5444`.

## Cloudflare Tunnel

To expose the server publicly, install and authenticate `cloudflared`, create a tunnel, and route it to `http://localhost:5555`. For SSH/git-over-tunnel, add an SSH ingress rule and configure `~/.ssh/config` with a `ProxyCommand cloudflared access ssh` entry.

## Troubleshooting

If you hit an `Already registered` error, stop and remove the container, then remove the Docker volume:

```bash
docker volume rm knotted-docker_knot_data
docker compose up --build -d
```

## Licence

See repository (unaffiliated with the Tangled or AT Protocol teams).
