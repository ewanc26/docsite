---
title: mastodon-markov
description: A Mastodon bot that generates and posts Markov chain text based on a source account. Unmaintained.
date: 2026-02-24
tags: [mastodon, bot, python, markov, unmaintained]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfjn5oo25"
---

[mastodon-markov](https://github.com/ewanc26/mastodon-markov) is a Python bot that fetches posts from a source Mastodon account, trains a Markov chain on them, generates new text, and posts it to a destination account at random intervals between 30 minutes and 3 hours. It also periodically refreshes its dataset.

The Mastodon counterpart to [bluesky-markov](./bluesky-markov).

## Status

Unmaintained.

## Setup

```bash
pip install markovchain mastodon.py python-dotenv
```

Create `.env` in the project root:

```env
MASTODON_BASE_URL=https://source.instance
MASTODON_ACCESS_TOKEN=your_source_token
DESTINATION_MASTODON_BASE_URL=https://dest.instance
DESTINATION_MASTODON_ACCESS_TOKEN=your_dest_token
DESTINATION_MASTODON_CHAR_LIMIT=500
SOURCE_MASTODON_ACCOUNT_ID=12345
```

Run:

```bash
python src/main.py
```

Press Ctrl+C to stop. The script runs continuously, posting at random intervals.

## Structure

- `src/main.py` — Orchestration
- `src/mastodon_client.py` — API interactions
- `src/markov_manager.py` — Markov chain logic and dataset refresh
- `src/text_cleaner.py` — Text preprocessing
- `src/post_manager.py` — Posting logic
- `src/refresh_schedule.py` — Interval scheduling
- `src/env_loader.py` — Environment variable loading

## Licence

See repository.
