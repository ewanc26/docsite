---
title: Pixel Society
description: A native C++20 artificial-life simulation of an autonomous society — seed a landscape and watch citizens forage, build, farm, share and form new generations, driven by small neural networks.
date: 2026-10-14
tags: [cpp, simulation, artificial-life, neural-network, game, sdl2]
draft: false
---

[Pixel Society](https://github.com/ewanc26/pixel-society) is a native C++20 artificial-life simulation of an autonomous society. **Set the starting conditions; let the pixels decide what happens next.** Seed a landscape, choose its terrain shape, scale, population, resources, cooperation and hazard level, then watch citizens forage, build, farm, share, form new generations and struggle to survive. Once the simulation begins, the interface only observes.

A shared **society core** (92 → 2048 → 2560 → 2560 → 13, **12,025,357 trainable parameters**) reads the living population's average sensor view once each tick and broadcasts one advisory signal per intention. Every citizen combines those 13 advisory channels with its own live view and runs a personal **105 → 56 → 28 → 13 neural network** (7,909 parameters) that ranks intentions, then learns from the consequences. The 92 raw signals include individual needs and inventory, the current tile, nearby resources and hazards, settlement and neighbourhood patterns, seasonal and population context, plus live clan reserve, storage-route and courier-skill data. The desktop world advances at **five game ticks per second**, and every recorded event has an integer importance score from **0 to 100**.

The terrain, structures, citizens, charts and bitmap lettering are drawn from pixels. There are no downloaded graphics, fonts, models, AI services or API keys.

## Build and run

On macOS:

```sh
brew install cmake sdl2
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel
./build/pixel-society
```

You can also double-click `Launch Pixel Society.command` after installing those dependencies. On Ubuntu or Debian, install `build-essential cmake libsdl2-dev`, then use the same CMake commands. Requires CMake 3.20+, a C++20 compiler and SDL2 2.0.18+. Windows has not been verified.

Choose the initial conditions on the setup screen and begin. After that, citizens decide what to do; there are no building tools, orders, speed controls or resource injections. Press **M** or **Esc** for the observer menu (resume, return to world setup, open the guide or quit); the menu pauses the simulation and does not alter its rules or state.

## Licence

MIT — see [LICENSE](https://github.com/ewanc26/pixel-society/blob/main/LICENSE). Copyright (c) 2026 Ewan Croft.