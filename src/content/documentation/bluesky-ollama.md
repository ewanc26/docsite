---
title: bluesky-ollama
description: An AI-powered Bluesky bot that uses a local Ollama model to generate posts in the style of a source account.
date: 2026-02-24
tags: [bluesky, bot, python, ollama, ai]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfneyng25"
---

[bluesky-ollama](https://github.com/ewanc26/bluesky-ollama) is a Python bot that fetches recent posts from a source Bluesky account, feeds them to a locally-running Ollama model, and posts the AI-generated result to a destination account. It combines the Bluesky API integration from [bluesky-markov](./bluesky-markov) with local LLM generation.

## Features

- Fetches and cleans posts from any source Bluesky account
- Generates new posts via Ollama (default model: `llama3.2`)
- Rate limiting that respects Bluesky's API quotas (5,000 points/hour, 35,000/day)
- Content validation: rejects empty, placeholder, repetitive, or spam-like output
- Dry-run mode for testing generation without publishing
- Random posting intervals (30 minutes to 3 hours)

## Setup

Requires Python 3 and [Ollama](https://ollama.com/) running locally.

```bash
git clone git@github.com:ewanc26/bluesky-ollama
cd bluesky-ollama
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
ollama pull llama3.2
```

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

## Structure

- `src/main.py` — Orchestration and scheduling
- `src/bsky_api.py` — Bluesky API interactions
- `src/ollama_gen.py` — Ollama post generation and content validation
- `src/clean.py` — Text cleaning utilities
- `src/time_utils.py` — Rate limiting and interval scheduling

Logs are written to `log/general.log`.

## Licence

AGPLv3.
