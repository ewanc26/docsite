---
title: Hollowfall
description: A procedural voxel dungeon crawler in C# and Godot 4, built around fast first-person combat, linked portals and Scottish folklore.
date: 2026-11-02
tags: [csharp, godot, game, voxel, dungeon-crawler, procedural]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mzdpjzxtit2j"
---

[Hollowfall](https://github.com/ewanc26/Hollowfall) is a procedural voxel dungeon crawler in C# on .NET 10 and Godot 4. You fight through seeded, multi-floor dungeons in first person, cross gaps by firing pairs of linked portals, and follow a small Scottish-folklore story told in the margins.

Blood heals, so you fight close. Being hit locks away part of your health for a while. The dungeons are joined by gaps you cross with portals rather than corridors, and every run is recorded so your best run of a floor can race you as a ghost.

## Features

- **Combat** — three enemy types and a boss, a revolver and a shotgun, parrying, a style meter and floor ranks. Close hits heal you, and style rewards kills, headshots, parries and movement.
- **Portals** — a linked teal and violet pair that carries your speed (Meteor), cuts what stands in it (Sever), and gets you across the gaps between rooms.
- **A living dungeon** — chests with seeded loot, keys, spike traps, fire pits, a minimap, and folk (brownies, selkies, kelpies, a Bean Nighe, hares) who each have their own opinion of you. A pedlar on the plaza trades for coin.
- **Progression** — experience, levels, Vigour and Might, a bag, a charm slot and a relic slot, quests, coin and a pedlar whose prices follow your standing with the Villagers.
- **Story and flavour** — notes and title cards, Scottish folklore and Gàidhlig, adaptive music and sound synthesised in code, and textures drawn in code.
- **Replays** — every run is recorded as compact fixed-step inputs. Your best run of a floor races you as a translucent ghost, and a daily seed gives everyone the same dungeon.
- **Interface language** — English, Gàidhlig, or Gàidhlig with the English beside it.

## Status

Playable, and still growing. Seeded terrain and multi-floor dungeons generate, and the full combat loop runs from the title screen to the ending. The core library and its tests need only the .NET SDK; the Godot shell needs Godot 4.7 (.NET build).

Terrain is a pure function of `(seed, x, z[, y])`, so chunks can be generated in any order or on any thread and always agree at their borders. All randomness comes from a SplitMix64 hash rather than `System.Random`, and noise is seeded Perlin with fractal layering. Biomes are chosen from height, temperature and humidity; caves come from two intersecting 3D noise fields. Dungeon voxelisation follows the same rule, and tests prove every room, exit and boss is reachable with the real portal placement and walking physics.

## Playing

Open the Godot .NET editor on `game/`, or build and run it directly:

```bash
dotnet build game
/Applications/Godot_mono.app/Contents/MacOS/Godot --path game
```

You start at a title screen where you can type a seed (any text or number), press Random, or press Daily for the current date's shared seed. Esc or Start opens the pause menu, and every binding can be changed under Controls for keyboard/mouse and gamepad separately.

| Action | Keyboard and mouse | Gamepad |
|---|---|---|
| Move / look | WASD / mouse | Left / right stick |
| Jump | Space | A |
| Revolver / shotgun | Left / right click | RT / LT |
| Parry | V | X |
| Teal / violet portal | Q / E | LB / RB |
| Close portals (sever) | C | D-pad down |
| Slam | X | D-pad up |
| Block mortar | T | D-pad left |
| Use ready item | H | D-pad right |
| Interact | F | Left stick click |
| Respawn | R | Y |
| Free-fly | G (Shift to descend) | Right stick click (B) |
| Pause | Esc | Start |
| Debug overlay | F3 | none |

Entering a room with enemies locks its doors until they are dead. The HUD keeps itself clean: health, style, hints, a floor panel and a minimap that fills in as you explore. Damage flashes are edge vignettes that leave the middle of the screen clear, and blocks wear 16×16 textures drawn in code and tinted by each block's colour.

## The world

Each 384-block region may hold one dungeon: 2 to 4 floors under a 96×96 footprint, entered from a stone plaza by a spiral staircase. A floor is a BSP layout of rect, L, circular and cavern rooms joined by corridors, portal gaps and secret doors, with loops. Rooms get roles by rule — entrance, exit, boss, treasure, trap, safe — and spawn points for monsters, a boss, loot, keys, traps and the folk are produced as data.

Under the hill a Hollow is falling in on itself. Seven Wardens went down to hold it shut and left a red cord behind them; six are only names now, and the seventh is the boss at the bottom. Every seed names its dungeon and the last Warden, notes on each floor are one voice read in order, and the ending changes with how you played. The folklore is Scottish: the folk, the dungeon names, and the notes nod to the Fortingall Yew, the Cailleach and the water-horse.

## Saving

Everything lives in one folder, `~/.ewanc26/hollowfall`:

| File | What it holds |
|---|---|
| `settings.json` | Options, bindings and the last seed |
| `records.json` | Best grade and time on each floor of each seed |
| `story.json` | Notes read and conversations had |
| `relations.json` | Standing with each group, per seed |
| `progression.json` | Experience, level, stats, coin, bag, equipment, ready item and quests |
| `replays/` | The best run of each floor, for the ghost |

`HOLLOWFALL_HOME` moves the folder. Saves are written atomically, loaded defensively, and a first run copies anything an earlier version saved in Godot's own user folder.

## Gàidhlig

Settings has a Language row: `English`, `Gàidhlig`, or `Gàidhlig agus Beurla`. Only Gàidhlig that could be checked against a source is shown; everything else stays in English, and no native speaker has reviewed the translation yet. [`docs/gaidhlig.md`](https://github.com/ewanc26/Hollowfall/blob/main/docs/gaidhlig.md) lists every string with its status and source, and asks for a Gaelic speaker to review it.

## Building and testing

Godot 4.7 (.NET build) is needed to run the game:

```bash
./run-smoke-test.sh   # builds the Godot project and runs the headless smoke test
```

The core library and tests need only the .NET SDK:

```bash
dotnet build
dotnet test
dotnet run --project src/Hollowfall.Cli -c Release -- <seed> <chunk-radius> [--stats]
```

The CLI can inspect a seed's terrain and dungeons (`--dungeon`, `--dungeon-stats`, `--biomes`, `--spawns`), and `dotnet run --project src/Hollowfall.Cli -- --po gd.po` writes every interface string as a gettext catalogue for review.

The game is written entirely in C#. Godot is the engine shell only: no GDScript, no GDExtension, and every script attached to a scene is a `.cs` file. Game logic lives in `Hollowfall.Core`, which has no Godot dependency.

## Documentation

- [Game loop](https://github.com/ewanc26/Hollowfall/blob/main/docs/game-loop.md) — combat, style, ranks and gaps
- [Features](https://github.com/ewanc26/Hollowfall/blob/main/docs/features.md) — built and planned signature features
- [Relations](https://github.com/ewanc26/Hollowfall/blob/main/docs/relations.md) — factions, standing and the creatures
- [Music](https://github.com/ewanc26/Hollowfall/blob/main/docs/music.md) — the adaptive score, layer by layer
- [Story](https://github.com/ewanc26/Hollowfall/blob/main/docs/story.md) and [mythology](https://github.com/ewanc26/Hollowfall/blob/main/docs/mythology.md)

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/Hollowfall/blob/main/LICENSE).
