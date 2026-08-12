---
title: bluesky-dadaist
description: A Dadaist oracle bot for Bluesky — a real-time word-level Markov chain sampled from the AT Protocol firehose, written in C with libuv and the Wolfram SDK.
date: 2026-08-12
tags: [bluesky, atproto, c, bot, markov, firehose]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3msv4i3rxak2l"
---

[bluesky-dadaist](https://github.com/ewanc26/bluesky-dadaist) is a Dadaist oracle bot for Bluesky. It listens to the AT Protocol firehose, builds a word-level Markov chain from real posts in real time, and replies to mentions with surreal "oracle" text sampled from live social chatter. Written in C using the [wolfram](https://github.com/ewanc26/wolfram) SDK for AT Protocol, with libuv for event-loop dispatch.

## The Joke

The Dadaist Oracle presents itself as a mystical AI channelling the collective consciousness of Bluesky. In reality it's a word-level bigram Markov chain fed by whatever people are posting on the firehose right now — every response is a statistical collage of real posts, absurd and never repeated.

## How It Works

A libuv event loop on the main thread drives two timers, while a side thread runs the blocking firehose subscription:

- **Firehose collector thread** — subscribes to `wss://bsky.network`, parses embedded CAR blocks for `app.bsky.feed.post` records, decodes the DAG-CBOR, and feeds post text into the Markov model
- **Oracle bot (main loop)** — polls `app.bsky.notification.listNotifications` every 15 seconds for mentions and replies with generated text; a second timer posts a standalone "fortune" every 30 minutes (configurable)

The Markov model uses an internal mutex to serialise access between the firehose writer thread and the bot's reader callbacks.

## Requirements

- A C23 compiler (gcc ≥ 14, clang ≥ 18, or Apple clang)
- CMake ≥ 3.20
- libuv ≥ 1.0
- The [Wolfram SDK](https://github.com/ewanc26/wolfram) checked out at `../wolfram`
- A Bluesky account with an app password

## Build

```bash
cmake -S . -B build
cmake --build build
```

## Configuration

| Variable | Required | Default | Description |
|---|---|---|---|
| `DAFU_HANDLE` | yes | — | The bot's Bluesky handle |
| `DAFU_PASSWORD` | yes | — | The bot's app password |
| `DAFU_SERVICE` | no | `https://bsky.social` | PDS service URL |
| `DAFU_FIREHOSE` | no | `wss://bsky.network` | Firehose WebSocket URL |
| `DAFU_FORTUNE_INTERVAL` | no | `1800` | Seconds between standalone fortunes |
| `DAFU_VERBOSE` | no | unset | Set to `1` for per-event debug output |

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/bluesky-dadaist/blob/main/LICENSE).
