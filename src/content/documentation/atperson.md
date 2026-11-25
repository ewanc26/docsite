---
title: ATperson
description: An experiment in building a persistent digital entity on the AT Protocol that starts with effectively nothing and develops its own learned state through experience.
date: 2026-11-13
tags: [c, cpp, atproto, ai, experiment, digital-entity]
draft: false
---

[ATperson](https://github.com/ewanc26/atperson) is an experiment in building a persistent digital entity on the [AT Protocol](https://atproto.com/) that starts with effectively nothing and develops its own learned state through experience. It does not wrap an LLM in a biography: it starts without a seeded vocabulary, personality, ideology, preferences, opinions or life story. What it knows has to come from observations, and the state produced by those observations has to be durable, inspectable and reconstructable.

This is experimental software. ATperson does **not** claim sentience or personhood, and autonomous network behaviour is deliberately gated behind explicit policy and operator control.

## Design

The codebase has a strict C23/C++23 split:

- **C23 owns learned state.** The language graph, trainable embeddings, online learning, episodic memory, familiarity, valence, action scoring, the observation ledger and snapshot persistence live here.
- **C++23 owns orchestration.** Lifecycle, configuration, RAII wrappers, the CLI, record extraction and the runtime around the core.
- **[Wolfram](https://github.com/ewanc26/wolfram) owns AT Protocol mechanics.** Sessions, XRPC, identity and repository operations are dependencies rather than being reimplemented.

The rule the project keeps is simple: C++ can orchestrate the entity, but it must not quietly become the authority for what the entity has learned. Learned state and the evidence behind it stay in the C core.

## Building

The project builds with CMake and depends on Wolfram as a sibling checkout for AT Protocol mechanics. It ships a `Dockerfile` and `docker-compose.yml` for a reproducible environment, plus `fuzz/`, `sandbox/`, `tests/` and `Testing/` for verification.

## Status

Experimental. The learned-state core and the orchestration runtime are under active development; autonomous network behaviour remains gated behind policy and operator control.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/atperson/blob/main/LICENSE).