---
title: pds-dash
description: A frontend dashboard with stats for your AT Protocol PDS, built with Deno and SvelteKit.
date: 2026-07-21
tags: [atproto, pds, dashboard, deno, svelte]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6uduhz472s'
---

[pds-dash](https://github.com/ewanc26/pds-dash-tophhie) is a frontend dashboard with stats for your AT Protocol PDS.

## Setup

### Prerequisites

- [Deno](https://deno.com/manual/getting_started/installation)

### Installing

Clone the repo, copy `config.ts.example` to `config.ts`, and edit it:

```sh
git clone git@github.com:ewanc26/pds-dash-tophhie
cd pds-dash-tophhie
cp config.ts.example config.ts
deno install
```

### Development Server

```sh
deno task dev
```

### Building

```sh
deno task build
```

Output goes to `dist/`.

## Configuring

`config.ts` is the main configuration file.

## Theming

Themes are located in the `themes/` directory. Create your own by copying an existing theme and modifying `theme.css`. Switch themes by changing the `theme` property in `config.ts`.

## License

MIT
