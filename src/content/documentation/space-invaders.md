---
title: Smol Invaders
description: An arcade shooter with seeded, Balatro-inspired blinds, shop choices and run-local relics — a C23 simulation with a C++23 SDL2 UI and a tiny deterministic neural invader.
date: 2026-11-13
tags: [c, cpp, game, sdl2, arcade, neural-network, seeded]
draft: false
---

[Smol Invaders](https://github.com/ewanc26/smolinvaders) (the `space-invaders` directory) is an arcade shooter with seeded, Balatro-inspired blinds, shop choices and run-local relics. The simulation is C23; the windowed UI is C++23 with SDL2 and SDL2_ttf.

The invader is driven by a tiny deterministic neural policy that reads the player's position, movement direction, shot state, remaining shield integrity and EMP state. Its fixed weights react to play; it does not train online. The movement signal records accepted input only, so edge-blocked movement cannot make the invader anticipate a move that did not happen. EMP pressure suppresses enemy firing, and room transitions clear movement momentum. Damaged cover changes its firing pressure. Kills advance blinds; the player has three lives.

Three destructible energy shields sit between the player and the invader. Both player and enemy shots damage them, so preserving cover is part of the strategy.

An occasional gold signal saucer crosses the top of the arena. Its arrival interval and travel direction are seed-generated per room; Cache rooms keep an earlier 90–109 tick window while other rooms use 140–169 ticks. Shoot it for three points; missing it lets the opportunity pass.

Runs are seeded (`0xC0FFEE` by default), including the first enemy position, the central player starting lane, and every room type, enemy placement, respawn placement and boss rule, derived from a stable seed coordinate. Combat and shop RNG can advance independently without reshuffling already-generated rooms. Each blind also receives a seed-derived shield layout: every cover bank keeps its first cell intact but has one deterministic two-strength notch, so repair restores that run's original cover. `tag: FRENZY` raises enemy pressure by one; `RICH` adds one credit to its clear.

## Building

The project builds with CMake (C23 simulation, C++23 SDL2/SDL2_ttf UI). It ships `src/`, `include/` and `test/`.

## Status

Playable and feature-complete for the seeded run loop: blinds, shop, relics, destructible cover, the neural invader and the gold saucer.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/smolinvaders/blob/main/LICENSE).