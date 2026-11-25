---
title: Formant
description: A customisable voice synthesis engine written in C++20 that makes speech from sine waves only — a library first and a command-line tool second.
date: 2026-11-25
tags: [cpp, audio, speech, synthesis, cli, library]
draft: false
---

[Formant](https://github.com/ewanc26/formant) is a customisable voice synthesis engine written in C++20. It makes speech from sine waves only. It is a library first and a command-line tool second: embed it in a game, a robot, an accessibility tool or anything else that needs a voice without shipping a speech model, audio samples or a large runtime.

## How it works

Text, IPA or X-SAMPA goes through a pronunciation stage, then an additive sine-wave synthesiser. There are no recorded samples, no noise buffers and no external audio libraries. IPA is the primary input; the English lexicon is only an optional convenience layer.

```text
text | [phonemes] | IPA | X-SAMPA
        │
        ▼
language front end (English, Spanish) or articulatory IPA mapping
                                       │
                                       ▼
                              phoneme sequence
                                       │
                                       ▼
                            formant targets (F1–F4)
             ┌─────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
   voiced: harmonics of F0                unvoiced: 12 detuned sine
   each amplitude shaped by               partials shaped by the same
   four resonant formants                 four formants
             └─────────────────────────┬──────────────────────────┘
```

Formant targets (F1–F4) shape the spectrum: voiced sounds are harmonics of the fundamental frequency, unvoiced sounds are detuned sine partials, and both are shaped by the same four resonant formants.

## Building

Formant builds with CMake (C++20). It ships `examples/`, `benchmark/`, `data/` and `docs/` alongside the library and CLI.

## Status

Under active development, with a changelog in `CHANGELOG.md` and build directories for several configurations (release, ASan, and verification builds).

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/formant/blob/main/LICENSE).