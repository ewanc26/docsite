---
title: bluesky-ollama
description: An AI-powered Bluesky bot, in Python and Rust, that uses a local Ollama model to generate posts in the style of a source account.
date: 2026-04-11
tags: [bluesky, bot, python, rust, ollama, ai]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfneyng25"
---

[bluesky-ollama](https://github.com/ewanc26/bluesky-ollama) fetches recent posts from a source Bluesky account, feeds them to a locally-running Ollama model, and posts the generated result to a destination account. It combines the Bluesky API integration from [bluesky-markov](./bluesky-markov) with local LLM generation. The repository contains two independent implementations: the Python entrypoint documented in the README and Nix dev shell (`src/main.py`), and a separate Rust binary with similar behaviour (`Cargo.toml`, `src/main.rs`).

## Features

- Fetches and cleans posts from any source Bluesky account (the Python version paginates through the source's posts)
- Generates new posts via Ollama (default model: `llama3.2`)
- A local post-rate guard derived from Bluesky's API limits (5,000 points/hour, 35,000/day), capped at 1,600 posts/hour and 11,000/day
- Content validation: rejects empty or short output, over-limit text, repetitive phrasing, placeholder strings, excessive punctuation, all-caps posts, and posts with too many URLs
- Dry-run mode for testing generation without publishing
- Random posting intervals (30 minutes to 3 hours)

## Setup

The Python implementation requires Python 3.x and [Ollama](https://ollama.com/) running locally.

```bash
git clone git@github.com:ewanc26/bluesky-ollama
cd bluesky-ollama
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
ollama pull llama3.2
```

The Rust implementation needs a Rust toolchain and is built with `cargo build --release`.

Create `.env`:

```env
SOURCE_HANDLE=source.bsky.social
DESTINATION_HANDLE=destination.bsky.social
CHAR_LIMIT=280
SRC_APP_PASS=xxxx-xxxx-xxxx-xxxx
DST_APP_PASS=xxxx-xxxx-xxxx-xxxx
BSKY_HOST_URL=https://bsky.social
OLLAMA_MODEL=llama3.2
```

## Usage

```bash
# Run normally
python src/main.py

# Dry run — generates but doesn't post
python src/main.py --dry-run

# Use a different model
python src/main.py -m mistral

# Combine
python src/main.py --dry-run -m llama3.3
```

The Rust binary accepts the same `-m`/`--model` and `--dry-run` options:

```bash
cargo run --release -- --dry-run -m llama3.3
```

## Structure

- `src/main.py` — Python orchestration, inline content validation and rate limiting, scheduling
- `src/bsky_api.py` — Bluesky API interactions
- `src/ollama_gen.py` — Ollama post generation
- `src/clean.py` — Text cleaning utilities
- `src/time_utils.py` — Interval scheduling
- `src/validator.rs`, `src/rate_limiter.rs`, and the other `src/*.rs` files — the separate Rust implementation
- `src/content_validator.py`, `src/rate_limiter.py` — unused standalone Python alternatives; `main.py` defines its own validator and rate limiter

The Python implementation writes to `log/general.log`; the Rust implementation rolls logs daily under `log/`.

## Licence

AGPLv3.
