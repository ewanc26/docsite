---
title: DayAnnouncer
description: A PaperMC plugin that broadcasts a message at dawn each in-game day.
date: 2026-07-21
tags: [minecraft, paper, kotlin, plugin]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udwq7np2s'
---

[DayAnnouncer](https://github.com/ewanc26/DayAnnouncer) is a PaperMC plugin that broadcasts a message at dawn each in-game day.

## Requirements

- PaperMC 26.1.2+
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
    message: "<yellow>It's {time}! Day {day}</yellow>"
    check-interval: 20
    dawn-threshold: 20

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
| `{players}`     | Number of players               | `5`     |
| `{max-players}` | Server max players              | `20`    |

## How It Works

A repeating task checks world time every `check-interval` ticks. When time drops below `dawn-threshold`, it picks a random message and dispatches it through chat, action bar, title, or boss bar. A `TimeSkipEvent` listener catches night skips from beds and fires the announcement immediately.

## Commands

| Command                        | Permission           | Description              |
| ------------------------------ | -------------------- | ------------------------ |
| `/dayannouncer reload`         | `dayannouncer.admin` | Reload configuration     |
| `/dayannouncer test [world]`   | `dayannouncer.admin` | Send a test announcement |
| `/dayannouncer status [world]` | `dayannouncer.admin` | Show plugin status       |
| `/dayannouncer toggle [world]` | `dayannouncer.admin` | Toggle announcements     |

## Licence

AGPL-3.0-only
