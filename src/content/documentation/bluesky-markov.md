---
title: bluesky-markov
description: A Bluesky bot that generates and posts Markov chain text based on a source account's posts. Unmaintained.
date: 2025-02-24
tags: [bluesky, bot, python, markov, unmaintained]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfkzih6mgg25"
---

[bluesky-markov](https://github.com/ewanc26/bluesky-markov) is a Python bot that fetches posts from a source Bluesky account, trains a Markov chain on them, generates new text, and posts it to a destination account at random intervals.

## Status

Unmaintained.

## Setup

```bash
git clone git@github.com:ewanc26/bluesky-markov
cd bluesky-markov
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
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
python src/main.py
```

## Structure

- `src/main.py` — Orchestration
- `src/bsky_api.py` — Bluesky API interactions
- `src/clean.py` — Text cleaning and preprocessing
- `src/markov_gen.py` — Markov chain generation
- `src/time_utils.py` — Random interval scheduling

Logs are written to `log/general.log`.

## Licence

MIT.
