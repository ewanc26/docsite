---
title: socialsync
description: A PaperMC plugin that links Minecraft player UUIDs to AT Protocol identities, publishes achievements and sessions, and serves an embedded AppView dashboard.
date: 2026-07-21
tags: [minecraft, paper, kotlin, atproto, appview]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udttmr72s'
---

[Social Sync for Paper](https://github.com/ewanc26/socialsync) is a Paper plugin that links Minecraft player UUIDs to AT Protocol identities, publishes Minecraft lexicon and Bluesky records, consumes Jetstream, and exposes an embedded read-only AppView dashboard.

## Features

- Link player UUIDs to AT Protocol identities (`/atproto link <handle or DID>`)
- Authenticate player's own AT Protocol account (`/atproto login`)
- Publish each advancement once per player
- Publish session records on disconnect and periodic server status
- Automatic Bluesky feed posts for achievement unlocks
- Embedded AppView HTTP server on port 8080 (profile, stat, search, dashboard)
- Jetstream consumer for live record updates
- Encrypted AES-GCM session storage
- GitHub release update checker

## Commands

| Command                                                      | Description                                       |
| ------------------------------------------------------------ | ------------------------------------------------- |
| `/atproto link <handle or DID>`                              | Resolve and link an AT Protocol identity          |
| `/atproto login <handle or DID> <app-password>`              | Authenticate the player's own AT Protocol account |
| `/atproto logout`                                            | Remove the player's authenticated session         |
| `/atproto unlink`                                            | Remove the player's identity link                 |
| `/atproto whoami`                                            | Display the linked identity                       |
| `/atproto status`                                            | Display plugin and link-store status              |
| `/atproto help`                                              | Display command help                              |
| `/atproto admin server-login <handle or DID> <app-password>` | Configure server AT Protocol repository           |

## Requirements

- Paper 26.1.2 or newer within the 26.1 line
- Java 25 or newer
- Network access to the player's AT Protocol PDS

## Installation

1. Build with `./gradlew build`.
2. Copy `build/libs/socialsync-<version>-Paper.jar` into the server's `plugins/` directory.
3. Restart the server.

## Build

```bash
./gradlew clean test build
```

## License

AGPL-3.0-only. See [LICENSE](LICENSE).
