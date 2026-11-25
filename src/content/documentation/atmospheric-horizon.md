---
title: atmospheric-horizon
description: "AT Protocol (Bluesky) integration for Horizon, the Rust rewrite of Minecraft: Java Edition — post text and screenshots, reply and react, and read notifications and profiles without leaving the game."
date: 2026-11-25
tags: [rust, minecraft, atproto, bluesky, mod, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n33vrmvbb626"
---

[atmospheric-horizon](https://github.com/ewanc26/atmospheric-horizon) is AT Protocol (Bluesky) integration for [Horizon](https://playhorizon.dev), the Rust rewrite of Minecraft: Java Edition. It posts text and screenshots, replies to and reacts to posts, and reads notifications, profiles and public graph data without leaving the game.

> Independent project; not affiliated with Mojang, Microsoft, Bluesky PBC, or the Horizon project. Not an official Minecraft product.

It is the successor to [jollywhoppers-socialsync](https://github.com/ewanc26/jollywhoppers-socialsync), the Paper plugin that linked Minecraft players to AT Protocol identities, rebuilt as a native Horizon mod. It also ports the feature set of [atpcraft](https://git.atforge.org/atforge/atpcraft/ATPcraft) client-side; its lexicons are reimplemented as data, and no code is copied because the upstream repo carries no licence.

## Status

**v0.4.0** (20 November 2026) is the current release. The mod is usable in-game today through the `atmospheric-worker` sidecar: the injected runtime is std-only, and every network or disk operation happens in the worker. Public reads work signed out; posting and record writes need a Bluesky account.

Shipped in v0.4.0: OAuth and app-password login, text and screenshot posts, notifications, atpcraft-compatible chat, signed snapshots and skins, a server profile, record/label/presence/chat/profile reads, social-graph reads and writes, reply/like/repost, a separate server account, the Colibri bridge, the server-side identity service with in-game and browser linking, generic record browsing, linked-player names, hosted lexicons, proactive token refresh, automatic server-profile publish, a list-member cache, a complete labeler, player-data aspect capture, RPG item discovery, browser skin upload, and profile editing with avatar and banner uploads.

Not yet: launcher registry distribution (waiting on third-party native-mod support upstream), full core-NBT restore and in-game skin application (both blocked by the pinned Horizon native API).

## Features

- **Post from the game.** Publish text with `/atmospheric post`, or the latest F2 screenshot or your current position from a keybind, plus optional death messages.
- **Join the conversation.** Reply to, like or repost any Bluesky post from its AT-URI or its bsky.app URL.
- **Notifications in the HUD.** A digest line, a poll timer and a cursor that survives restarts.
- **atpcraft-compatible records.** Chat messages, Ed25519-endorsed snapshots and skins with blob uploads, and a server descriptor at rkey `self`.
- **Automatic player-data sync.** With `player_data_sync_enabled`, a linked player's inventory, ender chest, equipment, advancements and statistics are captured when they leave and the newest verified snapshot is restored when they join.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/atmospheric-horizon/blob/main/LICENSE).