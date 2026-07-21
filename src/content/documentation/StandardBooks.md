---
title: StandardBooks
description: A PaperMC plugin that publishes and reads in-game books on the AT Protocol via Standard.site.
date: 2026-07-21
tags: [minecraft, paper, kotlin, atproto, standard-site]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udwck5p2s'
---

[StandardBooks](https://github.com/ewanc26/StandardBooks) is a PaperMC plugin that publishes and reads in-game books on the AT Protocol via Standard.site.

## Features

- Publish Minecraft books as `site.standard.document` records
- Browse published books in a chest GUI
- Read books by AT URI or from the browse list
- Extended book limits (100 pages, 1024 chars/page)
- Interoperability with Inkwell — books published from Minecraft appear in Inkwell on iOS

## Requirements

- PaperMC 26.1.2+
- Java 26+

## Installation

1. Download the latest release JAR from the [releases page](https://github.com/ewanc26/StandardBooks/releases)
2. Place the JAR in your server's `plugins/` folder
3. Restart the server
4. Edit `plugins/StandardBooks/config.yml` to configure the OAuth callback server
5. Run `/standardbooks reload` to apply changes

## Configuration

```yaml
enabled: true

oauth:
  port: 8765
  callback-path: /callback
  external-url: ''

publication:
  auto-create: true
  default-name: "{player}'s Minecraft Books"
  default-url: ''

books:
  max-pages: 100
  max-chars-per-page: 1024
  auto-publish-on-sign: false

bstats-enabled: true
```

## Commands

| Command              | Permission            | Description                           |
| -------------------- | --------------------- | ------------------------------------- |
| `/sb login <handle>` | `standardbooks.use`   | Connect AT Protocol account via OAuth |
| `/sb logout`         | `standardbooks.use`   | Disconnect account                    |
| `/sb publish`        | `standardbooks.use`   | Publish book to AT Protocol           |
| `/sb browse [page]`  | `standardbooks.use`   | Browse published books in chest GUI   |
| `/sb read <uri>`     | `standardbooks.use`   | Read a book by AT URI                 |
| `/sb list`           | `standardbooks.use`   | List published books                  |
| `/sb delete <uri>`   | `standardbooks.use`   | Delete a published book               |
| `/sb update <uri>`   | `standardbooks.use`   | Update published book                 |
| `/sb status`         | `standardbooks.use`   | Show connection status                |
| `/sb help`           | `standardbooks.use`   | Show help                             |
| `/sb reload`         | `standardbooks.admin` | Reload config                         |

## Build

```bash
./gradlew build
```

Output: `build/libs/StandardBooks-0.1.0.jar`

## Tech Stack

- Kotlin 2.3.21
- PaperMC API 26.1.2
- atproto-kotlin SDK
- Ktor 3.1.2 (embedded OAuth callback server)
- kotlinx.serialization 1.7.3
- Shadow plugin for shaded JAR
- MiniMessage for text formatting
- bStats for anonymous metrics

## License

AGPL-3.0-only
