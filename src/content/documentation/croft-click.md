---
title: croft.click
description: The AT Protocol tools directory — a free, browser-based hub linking Jasper, Malachite, Bismuth, Opal, and Tourmaline.
date: 2026-08-20
tags: [atproto, directory, svelte, tools, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mtjafatmpx27"
---

[croft.click](https://croft.click) is the directory site for Ewan's AT Protocol import and analysis tools — Jasper, Malachite, Bismuth, Opal, and Tourmaline. Every tool is free, runs entirely in the browser, and moves data onto the AT Protocol without a middleman server. croft.click exists to make that toolkit discoverable from one place, and to show it's actually being used.

Source: [`packages/croft-click`](https://github.com/ewanc26/pkgs/tree/main/packages/croft-click) in the [`@ewanc26/pkgs`](/projects/pkgs) monorepo. Not published to npm — it's a deployed site, not a library.

## What's on the page

**Live network activity** — total mentions and unique users per tool, queried live from [Constellation](https://constellation.microcosm.blue), the AT Protocol backlink index. This counts Bluesky posts referencing each tool's URL as the primary "usage" signal — it's a public backlink count, not an analytics platform, and needs no tracking script.

**Toolkit usage** — a second stats card reads `click.croft.toolkit.use` records: a lexicon each tool writes to the user's own PDS when they complete an import (with their consent), recording which tool was used and a coarse metric (records imported, photos imported, etc.), without any central database on croft.click's side.

**Project cards** — one card per tool, each carrying that tool's own accent colour and a short pitch. The core row is the five import/analysis tools; a second "ALSO" row covers adjacent projects (Hasharium, Devlog) that share the same visual language but aren't part of the core toolkit.

**Pairing graph** — a node graph showing which tools compose with which external services (Bluesky, Teal.fm, Grain, Spark, Leaflet, Pckt, Offprint), so it's visible at a glance that, say, Opal feeds Bluesky and Malachite feeds Teal.fm.

**Support band** — a shared call-to-action (Ko-fi, GitHub Sponsors, star the repo) in the same tone used across every tool's own landing page: what you get, then a low-pressure ask.

## Design

croft.click uses its own dark neutral background with a distinct indigo accent — deliberately not any single tool's colour, since the hub sits above all of them. Each project card carries its own tool's accent instead, so the page reads as a directory of distinct things rather than one more skinned instance of the shared [`@ewanc26/landing-ui`](/projects/landing-ui) template the individual tool sites use.

## Development

```bash
git clone https://github.com/ewanc26/pkgs.git
cd pkgs
pnpm install

pnpm --filter @ewanc26/croft-click dev
```

## Related projects

- [Jasper](/projects/jasper) — Instagram → Grain & Spark
- [Malachite](/projects/malachite) — Last.fm, Spotify, Apple Music, YouTube Music & ListenBrainz → Teal
- [Bismuth](/projects/bismuth) — Standard.site documents → Markdown
- [Opal](/projects/opal) — Twitter, Mastodon, Threads & Nostr → Bluesky
- [Tourmaline](/projects/tourmaline) — Teal.fm scrobble analyser

## Licence

AGPL-3.0-only.

## Trademark

“AT Protocol”, “atproto”, and “atprotocol” are trademarks of Bluesky Social PBC. croft.click is an independent project, not affiliated with or endorsed by Bluesky Social PBC; the terms are used only to describe compatibility. See the [AT Protocol trademark policy](https://atproto.com/about/trademarks/atproto-trademark-policy).
