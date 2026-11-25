---
title: Keepsake
description: A text-based RPG in C++ where your AT Protocol DID is the save file — sixteen rooms, three bosses and a descent into the Abyss, playable offline or signed in.
date: 2026-11-23
tags: [cpp, rpg, atproto, game, text-adventure]
draft: false
---

[Keepsake](https://github.com/ewanc26/keepsake) is a text-based RPG in C++ where your AT Protocol DID is the save file.

> Independent project; see the [trademark notice](https://github.com/ewanc26/keepsake/blob/main/TRADEMARKS.md).

## Status

The local game — sixteen rooms across the keep (including its watchtower), the crypt beneath it, a side-passage spider den, and a final descent into the Abyss; two NPCs; five enemies plus three bosses; three linked quests and one side quest — is fully playable offline.

The last boss, the Nameless Thing, can be talked down instead of fought: its dialogue tree resolves that quest and hands over its reward peacefully, or (declining, or attacking outright) the same quest resolves through combat instead, with the same reward as loot either way. Signed in, the same character sheet and quest progress live as `click.croft.rpg.*` records in your own PDS, and each quest's completion — however it resolved — broadcasts a verifiable achievement plus a world event other players' clients could someday react to.

## Concept

You came because of the letter — everyone does. It is waiting under a stone in the gatehouse, and it explains the game in one page: the keep's "keepsake" is a locket of the old make, the kind that *remembers names*. It was not stolen for its silver; it was carried off by something that lost its own name before your grandparents were born and has decided it is finished with being the only thing the world does not remember. A line of characters has been cut over the gate — your characters, whether you arrived signed-in or nameless, there before you were. That mark is your claim on this place, the name of your save file made narrative — and teaching it to the locket is your protection and, the letter warns, your whole danger: *do not let the thing below learn it first. It will begin politely.*

## Building

Keepsake builds with CMake (C++20). It ships `src/`, `test/`, `lexicons/` for the AT Protocol records, and `docs/`.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/keepsake/blob/main/LICENSE).