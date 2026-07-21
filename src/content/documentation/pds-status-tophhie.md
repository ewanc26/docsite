---
title: pds-status
description: A SvelteKit status page for your AT Protocol PDS, showing health, account count, and real-time metrics.
date: 2026-07-21
tags: [atproto, pds, svelte, status, dashboard]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udubbbx2s'
---

[pds-status](https://github.com/ewanc26/pds-status-tophhie) is a SvelteKit status page for your AT Protocol PDS. It displays server health, account count, and real-time metrics fetched via XRPC.

## Features

- **Health endpoint** — liveness check and version display
- **Account count** — fetches `com.atproto.sync.listRepos` with pagination
- **Server description** — renders DID, invite requirements, links, and contact email
- **Privacy-safe** — fields absent from the server response are hidden rather than shown as errors

## Tech Stack

- SvelteKit 2 with Svelte 5
- Tailwind CSS 4
- TypeScript 5.9+
- Vite 7
- `@atproto/api` for XRPC calls

## Development

```bash
git clone git@github.com:ewanc26/pds-status-tophhie
cd pds-status-tophhie
deno install
deno task dev
```

## Build

```bash
deno task build
```

Output: static site suitable for deployment on any static host, including Azure Static Web Apps.

## License

MIT
