---
title: bluesky-moon-tracker
description: A Bluesky bot that posts daily moon phase updates with a lycanthropic twist. Optional Ollama LLM generation.
date: 2026-04-11
tags: [bluesky, bot, typescript, ollama]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfntcno25'
---

[bluesky-moon-tracker](https://github.com/ewanc26/bluesky-moon-tracker) is a TypeScript bot that posts daily moon phase updates to Bluesky at 00:00 UTC. Messages are tailored to the lunar phase and current month, with a lycanthropic flavour, British references, and occasional Pride references in June.

## Moon Phase Data

The bot fetches moon phase data from multiple sources with automatic fallback:

1. **Skytime** — free, no auth, 60 req/min
2. **Farmsense** — free, no auth
3. **Local calculation** — pure-math Meeus synodic period algorithm, no network dependency

If all APIs are down, the local calculation ensures the bot can still post. Accuracy is ±1 day for phase boundaries, ±5% for illumination — good enough for a daily bot.

## Ollama LLM Generation

Set `OLLAMA_MODEL` to generate unique posts via a local Ollama LLM instead of the built-in template system. The bot auto-starts Ollama if it isn't already running.

The LLM is prompted with the moon phase, illumination, month, and the bot's personality (lycanthropic, British, pagan). If Ollama fails or times out, the bot falls back to templates.

## Setup

```bash
git clone git@github.com:ewanc26/bluesky-moon-tracker
cd bluesky-moon-tracker
pnpm install
```

Create `src/config.env`:

```ini
BLUESKY_USERNAME="your_username"
BLUESKY_PASSWORD="your_password"
BLUESKY_PDS_URL="https://bsky.social"
DEBUG_MODE="false"

# Optional: Ollama LLM post generation
OLLAMA_MODEL="llama3.2"
OLLAMA_URL="http://localhost:11434"
OLLAMA_TIMEOUT="30000"
```

Run:

```bash
pnpm run dev:start
```

If the current time is past 00:00 UTC, the bot posts immediately and then schedules the next post for the following day.

Setting `DEBUG_MODE=true` with credentials causes an immediate test post; without credentials it logs all possible message combinations to the console instead.

## Structure

- `src/index.ts` — Scheduling and orchestration
- `src/services/blueskyService.ts` — Authentication and posting
- `src/services/moonPhaseService.ts` — Multi-source moon phase fetching (Skytime → Farmsense → Local)
- `src/services/ollamaService.ts` — Ollama API client with auto-start
- `src/core/localMoonCalc.ts` — Local moon phase calculation (Meeus algorithm)
- `src/core/moonPhaseMessages.ts` — Message generation (Ollama → template fallback)
- `src/core/moonPhaseConstants.ts` — Phase emojis, hashtags, phrases
- `src/core/timeUtils.ts` — Scheduling utilities

## Licence

MIT.
