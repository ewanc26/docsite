---
title: bluesky-awoo-bot
description: A simple Bluesky bot that posts random wolf noises at random intervals. Unmaintained.
date: 2026-02-24
tags: [bluesky, bot, typescript, unmaintained]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfkzii7rx625"
---

[bluesky-awoo-bot](https://github.com/ewanc26/bluesky-awoo-bot) is a small TypeScript bot that picks a random wolf noise from a predefined JSON list and posts it to Bluesky. It then waits a random interval (configurable between 1–3 hours by default) before posting again.

## Status

Unmaintained.

## Setup

```bash
git clone git@github.com:ewanc26/bluesky-awoo-bot
cd bluesky-awoo-bot
npm install
```

Create `src/config.env`:

```ini
BLUESKY_USERNAME="your_username"
BLUESKY_PASSWORD="your_password"
MIN_DELAY_HOURS=1
MAX_DELAY_HOURS=3
```

Run:

```bash
npx ts-node src/index.ts
```

## Structure

- `src/index.ts` — Main loop: login, post, schedule
- `src/wolf-noise-generator.ts` — Weighted random noise selection
- `src/wolf-noises.json` — Predefined noises by category (howl, playful, scared)

## Licence

MIT.
