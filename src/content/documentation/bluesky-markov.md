---
title: bluesky-markov
description: A Rust bot that generates and posts Markov chain text based on a source account's posts. Unmaintained.
date: 2026-04-11
tags: [bluesky, bot, rust, markov, unmaintained]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfo6i3625"
---

[bluesky-markov](https://github.com/ewanc26/bluesky-markov) is a Rust bot that fetches posts from a source Bluesky account, trains a Markov chain on them, generates new text, and posts it to a destination account at random intervals between 30 minutes and 3 hours.

## Status

Unmaintained.

## Setup

Requires Rust 1.85+.

```bash
git clone git@github.com:ewanc26/bluesky-markov
cd bluesky-markov
cargo build --release
```

Create `.env` in the project root:

```env
SOURCE_HANDLE=source.bsky.social
DESTINATION_HANDLE=destination.bsky.social
CHAR_LIMIT=280
SRC_APP_PASS=xxxx-xxxx-xxxx-xxxx
DST_APP_PASS=xxxx-xxxx-xxxx-xxxx
BSKY_HOST_URL=https://bsky.social
```

Run:

```bash
cargo run --release
```

## Structure

- `src/main.rs` — Entry point, orchestration, and logging
- `src/bsky.rs` — Bluesky login, DID resolution, and API interactions
- `src/clean.rs` — Text cleaning and preprocessing
- `src/markov_gen.rs` — Post retrieval, Markov chain training, and text generation
- `src/time.rs` — Random interval scheduling

Logs are written to `log/general.log`.

## Licence

MIT.
