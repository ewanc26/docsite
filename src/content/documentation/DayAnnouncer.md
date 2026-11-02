---
title: DayAnnouncer
description: A PaperMC plugin that broadcasts a message at dawn each in-game day.
date: 2026-07-21
tags: [minecraft, paper, kotlin, plugin]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udwq7np2s'
---

[DayAnnouncer](https://github.com/ewanc26/DayAnnouncer) is a PaperMC plugin that broadcasts a message at dawn each in-game day.

## Features

- **Per-world announcements** — Enable, disable, and configure each world independently, with global defaults inherited when a per-world setting is omitted
- **Message pools** — Use a single message or a list from which one is picked at random each dawn
- **MiniMessage formatting** — Gradients, bold text, colours, and other Adventure formatting
- **Multiple output channels** — Chat, action bar, title, and boss bar can fire simultaneously
- **Optional sound** — Play a configurable sound alongside the announcement, globally or per world
- **Bed-skip detection** — A `TimeSkipEvent` listener announces immediately when a night skip lands in the dawn window
- **Duplicate guard** — A shared day tracker prevents two mechanisms announcing the same dawn
- **Persistent toggle** — `/dayannouncer toggle` state is written back to `config.yml`
- **bStats and update checks** — Anonymous metrics and a GitHub release check on startup

## Requirements

- PaperMC 26.1.2+ (api-version 1.21)
- Java 25+

## Build

```bash
./gradlew build
```

Output: `build/libs/DayAnnouncer-1.4.0.jar`

## Install

Copy the JAR to your server's `plugins/` directory and restart. A default `config.yml` is generated in `plugins/DayAnnouncer/`.

## Configuration

```yaml
enabled: true

worlds:
  world:
    enabled: true
    # Single message, or a list picked at random each dawn.
    message: "<yellow>It's {time}! Day {day}</yellow>"
    # messages:
    #   - "<yellow>It's {time}! Day {day}</yellow>"
    #   - "<gold>Good morning, Day {day}!</gold>"
    check-interval: 20
    dawn-threshold: 20
    # Per-world overrides; omit to inherit the global defaults.
    # output:
    #   chat: true
    #   action-bar: false
    #   title: false
    #   boss-bar: false
    # sound: "entity.experience_orb.pickup"

output:
  chat: true
  action-bar: false
  title: false
  boss-bar: false

sound: ''
```

### Placeholders

| Placeholder     | Description                     | Example |
| --------------- | ------------------------------- | ------- |
| `{day}`         | Current in-game day number      | `123`   |
| `{time}`        | Current in-game time (HH:MM)    | `06:00` |
| `{time-name}`   | Name of the current time period | `dawn`  |
| `{world}`       | Name of the world               | `world` |
| `{players}`     | Players in the world            | `5`     |
| `{max-players}` | Server max players              | `20`    |

Messages support [MiniMessage](https://docs.advntr.dev/minimessage/format.html) formatting, for example `<gradient:gold:yellow>Dawn breaks — Day {day}</gradient>`.

## How It Works

A repeating task checks world time every `check-interval` ticks. When time drops below `dawn-threshold`, it picks a message from the pool and dispatches it through the configured channels. A `TimeSkipEvent` listener catches night skips from beds; if the skip lands in the dawn window, the announcement fires immediately. A shared day tracker stops both paths announcing the same dawn.

### Output channels

Each announcement can use any combination of chat, action bar, title (three-second duration), and boss bar (auto-hides after five seconds). Each world can define its own mix and fall back to the global defaults.

### Sounds

A configurable sound — for example `entity.experience_orb.pickup` — can play with the announcement. Both global and per-world sounds are supported.

### Metrics and updates

DayAnnouncer uses bStats for anonymous usage statistics; server administrators can disable this in `plugins/bStats/config.yml`. On startup it also checks GitHub for newer releases and logs a message when one is available.

## Commands

| Command                        | Permission           | Description                      |
| ------------------------------ | -------------------- | -------------------------------- |
| `/dayannouncer reload`         | `dayannouncer.admin` | Reload configuration             |
| `/dayannouncer test [world]`   | `dayannouncer.admin` | Send a test announcement         |
| `/dayannouncer status [world]` | `dayannouncer.admin` | Show plugin status and config    |
| `/dayannouncer toggle [world]` | `dayannouncer.admin` | Toggle announcements on/off      |

Alias: `/da`. Toggle state is persisted to `config.yml` and survives restarts.

## Licence

AGPL-3.0-only
