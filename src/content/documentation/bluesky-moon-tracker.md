---
title: bluesky-moon-tracker
description: A Bluesky bot that posts daily moon phase updates with a lycanthropic twist. Optional Ollama LLM generation.
date: 2026-04-11
tags: [bluesky, bot, rust, ollama]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfntcno25'
---

[bluesky-moon-tracker](https://github.com/ewanc26/bluesky-moon-tracker) is a Rust bot that posts daily moon phase updates to Bluesky at 00:00 UTC. Messages are tailored to the lunar phase and current month, with a lycanthropic flavour, British references, and occasional Pride references in June.

Built with [atrium-rs](https://github.com/atrium-rs/atrium) for AT Protocol, compiled to a ~3 MB static binary with rustls-tls (no OpenSSL).

## Moon Phase Data

The bot fetches moon phase data from multiple sources with automatic fallback:

1. **Skytime** — free, no auth, 60 req/min
2. **Farmsense** — free, no auth
3. **Local calculation** — pure-math Meeus synodic period algorithm, no network dependency

If all APIs are down, the local calculation ensures the bot can still post. Accuracy is ±1 day for phase boundaries, ±5% for illumination — good enough for a daily bot.

## Ollama LLM Generation

Set `OLLAMA_MODEL` to generate unique posts via a local Ollama LLM instead of the built-in template system.

The LLM is prompted with the moon phase, illumination, month, and the bot's personality (lycanthropic, British, pagan). If Ollama fails or times out, the bot falls back to templates.

## Setup

```bash
git clone git@github.com:ewanc26/bluesky-moon-tracker
cd bluesky-moon-tracker
cargo build --release
```

Create `.env` (or copy `.env.example`):

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
cargo run --release
```

If the current time is past 00:00 UTC, the bot posts immediately and then schedules the next post for the following day.

Setting `DEBUG_MODE=true` with credentials causes an immediate test post; without credentials it logs all possible message combinations to the console instead.

## Structure

- `src/main.rs` — Entry point, env loading, debug/production mode
- `src/config.rs` — Environment variable parsing
- `src/bluesky.rs` — Authentication and posting via atrium-api
- `src/scheduler.rs` — UTC midnight sleep loop with graceful shutdown
- `src/moon/constants.rs` — Phase enum, emojis, hashtags, phrase banks
- `src/moon/calc.rs` — Local moon phase calculation (Meeus algorithm)
- `src/moon/api.rs` — Multi-source moon phase fetching (Skytime → Farmsense → Local)
- `src/moon/messages.rs` — Message generation (Ollama → template fallback)

## Licence

MIT.
