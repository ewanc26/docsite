---
title: Sine
description: An LLM-powered music recommendation system built around your listening history — a local-first pipeline that keeps listening data independent of any one service or LLM provider.
date: 2026-11-13
tags: [python, llm, music, recommendation, local-first, cli]
draft: false
---

[Sine](https://github.com/ewanc26/sine) is an LLM-powered music recommendation system built around your listening history. It takes listening data from one or more music services or imports, builds a structured picture of what you listen to, and uses a language model to recommend music based on that history.

## How it works

Sine is a local-first data pipeline:

```text
Music service / listening-history source
              │
              ▼
        Ingestion adapter
              │
              ▼
       Normalised history
              │
              ▼
       Listening profile
              │
              ▼
        LLM provider
              │
              ▼
       Recommendations
```

The important distinction is between listening data and the recommendation model. Sine consumes listening history from different services and import formats without tying the recommendation logic to one service, data source or LLM provider. Each service is an ingestion adapter, and source-specific limitations stay at the ingestion boundary.

Two boundaries matter for trusting the output:

- **Observation and inference are kept apart.** Everything up to the profile is deterministic — parsing, normalisation, deduplication and statistics are computed from the history alone, with no model involved. A thin history produces explicit gaps rather than confident nonsense.
- **The brief adapts to the listener.** `--focus` says what kind of answer was asked for, and the instruction that follows is derived from that listener's own measurements, citing numbers from the history and stating what the data cannot show.

The model is a recommender, not a database: whatever it returns is validated against a schema, and Sine then drops already-played tracks (unless `--allow-replays`), excluded artists and duplicates, labels each track and renumbers the playlist deterministically.

## Tech stack

Python 3.12, `uv`, Pydantic, `httpx`, pytest and Ruff. LLM providers are reached over their HTTP APIs through one interface, so no vendor SDK is required. The project does not currently require a machine-learning framework.

## Status

Version 0.1.0. The pipeline — ingestion adapters, normalisation, profile construction, provider interface and validated recommendations — is implemented and tested.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/sine/blob/main/LICENSE).