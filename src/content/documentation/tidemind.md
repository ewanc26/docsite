---
title: Tidemind
description: A playable, offline C++20 city builder where a small neural network learns what makes a neighbourhood a good home — grow an isometric estuary town from 24 settlers.
date: 2026-11-13
tags: [cpp, game, city-builder, neural-network, sdl2, simulation]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n33vrn3ai62v"
---

[Tidemind](https://github.com/ewanc26/tidemind) is a playable, offline **C++20 city builder** where a small neural network learns what makes a neighbourhood a good home. Build an isometric estuary town, connect its streets, balance food, water, energy, jobs and money, and grow from 24 settlers to an independent town. Different households value gardens, employment and the coast differently; their learned preferences determine where they move.

## Play

On macOS, install the build tools and graphics libraries once:

```sh
brew install cmake sdl2 sdl2_ttf
```

Then double-click **Launch Tidemind.command**, or run:

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel
./build/tidemind
```

On Ubuntu/Debian, install `build-essential cmake libsdl2-dev libsdl2-ttf-dev`, then use the same CMake commands. Requires SDL2 2.0.18 or newer and SDL2_ttf.

## Status

Playable offline. The town simulation — streets, resources, growth and household preferences — runs locally with no network or AI services; the neural network is small and runs on-device.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/tidemind/blob/main/LICENSE).