---
title: hasharium
description: Identities, given form. A browser-based cabinet of deterministic shapes generated from decentralised identifiers.
date: 2026-07-21
tags: [svelte, atproto, did, art, generative]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udvc7xx2s'
---

[Hasharium](https://github.com/ewanc26/hasharium) is an independent, browser-based cabinet of deterministic shapes generated from decentralised identifiers. The intended production home is [`hasharium.croft.click`](https://hasharium.croft.click).

## Current State

The public prototype includes:

- deterministic, accessible SVG specimens generated locally
- DID input and privacy-disclosed handle-to-DID resolution
- standalone SVG export with subject, fingerprint, catalogue, and generator metadata
- specimen label and morphological traits
- curated public cabinet of example identities
- browser-local signed-out study tray
- AT Protocol OAuth using the official browser client, PKCE, DPoP, and refresh-token rotation
- curator profile with the signed-in identity's specimen and PDS-backed collection cabinet
- confirmed creation and removal of `click.croft.hasharium.collection.entry` records
- deterministic 1200×630 PNG social cards generated per DID at `/api/og`

## Features

- **Read** — Browse the public cabinet and local study tray
- **Discover** — Search for specimens and curators
- **Collect** — Add DIDs to your personal collection with optional notes
- **Export** — Download standalone SVG specimens with provenance metadata
- **Social Cards** — Generate 1200×630 PNG social cards via `/api/og`

## Architecture

Hasharium is a SvelteKit 2 / Svelte 5 static application.

```text
src/lib/shape.ts                    SHA-256-to-SVG renderers (v1 and v2) and morphology
src/lib/identity.ts                 DID input and bounded handle resolution
src/lib/export.ts                   standalone SVG and provenance metadata export
src/lib/oauth.ts                    browser OAuth session lifecycle and authenticated Agent
src/lib/collection.ts               validated collection reads, confirmed writes, and removals
src/lib/backlinks.ts                bounded discovery and repository verification of collectors
src/lib/og.ts                       validated social-card parameters and canonical image URLs
src/lib/protocol.ts                 canonical host, NSIDs, and protocol constants
src/lib/components/Specimen.svelte  accessible SVG presentation
src/routes/+page.svelte             observation, cabinet, and study-tray interaction
src/routes/profile/+page.svelte     OAuth entry point and PDS-backed curator profile
src/routes/about/+page.svelte       method, privacy, permission, and service terms
```

## Protocol Namespace

All Hasharium records live below `click.croft.hasharium.*`:

- `click.croft.hasharium.collection.entry` — one collected DID
- `click.croft.hasharium.intersection` — an encounter with another DID
- `click.croft.hasharium.exhibition` — a curated, ordered group of specimens

## Development

Use Node.js 22 or newer and pnpm:

```sh
pnpm install
pnpm dev
```

Quality gates:

```sh
pnpm format
pnpm lint
pnpm check
pnpm test
pnpm build
```

## Licence

AGPL-3.0-only.
