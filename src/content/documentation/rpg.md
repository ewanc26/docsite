---
title: rpg
description: A minimal top-down RPG starter template for Godot 4.7 with the .NET (C#) build — a from-scratch scaffold, not a fork of an existing template.
date: 2026-08-12
tags: [godot, csharp, game, template, rpg]
draft: false
---

[rpg](https://github.com/ewanc26/rpg) is a minimal top-down RPG starter built for Godot 4.7 with the .NET (C#) build. It's a from-scratch scaffold rather than a fork of an existing template — a survey of existing options found nothing both Godot-Mono and RPG-specific (the well-known "Open RPG" demo is GDScript; existing C# templates are generic, not RPG-oriented).

## Getting Started

```bash
./bootstrap.sh        # installs Godot .NET + .NET SDK if needed, imports the project
./run-smoke-test.sh   # verifies the whole thing works (65 checks)
```

`bootstrap.sh` handles macOS, SteamOS, and generic Linux, and is safe to re-run (`--check` shows what's missing without installing).

Then open `project.godot` in the Godot 4.7 .NET editor and press F5 — it starts on the title screen; "Start Game" loads `scenes/World/TestLevel.tscn`.

## Controls

| Action | Keyboard | Gamepad |
|---|---|---|
| Move | Arrow keys / WASD | Left stick / D-pad |
| Interact | E | A |

Keyboard bindings use physical keycodes, so WASD lands on the same physical keys as ZQSD on AZERTY. Every binding has a gamepad equivalent, playable on Steam Deck in Game Mode with no remapping.

## Architecture

- **EventBus** — global signal hub (`PlayerHealthChanged`, `PlayerLeveledUp`, `DialogueStarted`, `DialogueEnded`, `InventoryChanged`); UI listens to it instead of polling the player directly
- **PlayerStats** — a `Resource` (health, attack, defense, leveling via `AddExperience`), so it can be saved, swapped, or authored as a preset
- **Inventory** — a plain component `Node`, attach to any actor and call `AddItem`/`RemoveItem`
- **IInteractable** — implemented by `NPC.cs`; `PlayerController` tracks interactables in range and calls `Interact()` on the nearest one
- **SaveSystem** — static utility serialising `PlayerStats` to `user://savegame.json`

## Verifying

```bash
./run-smoke-test.sh
```

Runs the game headlessly and checks the input map, movement, collision layers, item pickups, the dialogue signal chain, stats, inventory, and save/load — 65 checks total, exits non-zero on any failure (works as a CI gate).

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/rpg/blob/main/LICENSE).
