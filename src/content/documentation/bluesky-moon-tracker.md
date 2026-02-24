---
title: bluesky-moon-tracker
description: A Bluesky bot that posts daily moon phase updates with a lycanthropic twist. Unmaintained.
date: 2025-02-24
tags: [bluesky, bot, typescript, unmaintained]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfkzigpc6w25"
---

[bluesky-moon-tracker](https://github.com/ewanc26/bluesky-moon-tracker) is a TypeScript bot that posts daily moon phase updates to Bluesky at 00:00 UTC. Messages are tailored to the lunar phase and current month, with a slightly lycanthropic flavour, British references, and occasional Pride references in June. Moon phase data comes from the Farmsense API.

## Status

Unmaintained.

## Setup

```bash
git clone git@github.com:ewanc26/bluesky-moon-tracker
cd bluesky-moon-tracker
npm run dev:init
```

Create `src/config.env`:

```ini
BLUESKY_USERNAME="your_username"
BLUESKY_PASSWORD="your_password"
BLUESKY_PDS_URL="https://bsky.social"
DEBUG_MODE="false"
```

Run:

```bash
npm run dev:start
```

If the current time is past 00:00 UTC, the bot posts immediately and then schedules the next post for the following day.

Setting `DEBUG_MODE=true` with credentials causes an immediate test post; without credentials it logs all possible message combinations to the console instead.

## Structure

- `src/index.ts` — Scheduling and orchestration
- `src/services/blueskyService.ts` — Authentication and posting
- `src/services/moonPhaseService.ts` — Farmsense API integration
- `src/core/moonPhaseMessages.ts` — Message generation logic
- `src/core/moonPhaseConstants.ts` — Phase emojis and hashtags
- `src/core/timeUtils.ts` — Scheduling utilities

## Licence

MIT.
