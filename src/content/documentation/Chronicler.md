---
title: Chronicler
description: A PaperMC plugin that tracks server events and generates a dynamic in-game newspaper delivered as a written book.
date: 2026-07-21
tags: [minecraft, paper, kotlin, newspaper, llm]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udwxts72s'
---

[Chronicler](https://github.com/ewanc26/Chronicler) is a PaperMC plugin that tracks server events and generates a dynamic in-game newspaper delivered as a written book.

## Features

- **Death & PvP Tracking** — Records deaths, PvP kills, and mob kills
- **Advancement Tracking** — Captures every advancement earned by players
- **Building & Exploration** — Tracks blocks placed/broken, biome discoveries, distance milestones
- **Social & Messaging** — Join/leave events, private message tracking
- **Session Tracking** — Cumulative playtime, session counts, daily login streaks
- **Economy Tracking** — Detects Vault at runtime, records transactions
- **Breaking News** — Special coverage when players first enter The End
- **Dynamic Newspaper** — Structured book with sections: Headlines, Breaking News, Obituaries, Achievements, etc.
- **LLM Integration** — Optional AI-powered article generation via Ollama, OpenAI, or Anthropic
- **Web View** — Optional embedded HTTP server with dark/light theme and RSS feed
- **Editorial Workflow** — Create, preview, edit, and approve persistent draft issues
- **Privacy Controls** — Exclude players and redact private messages
- **Auto-Delivery** — New issues spawn into every online player's inventory
- **Locale Support** — All messages customizable via `messages.yml`
- **PlaceholderAPI** — 13+ placeholders exposing issue stats and player data

## Requirements

- PaperMC on the current API line
- Java 26+
- Optional: PlaceholderAPI, Vault, Ollama/OpenAI/Anthropic API key

## Installation

1. Download the latest release jar from the [releases page](https://github.com/ewanc26/Chronicler/releases)
2. Place the jar in your server's `plugins/` folder
3. Restart the server
4. Edit `plugins/Chronicler/config.yml` to your liking
5. Run `/chronicler reload` to apply changes

## Commands

| Command                                                           | Permission         | Description                        |
| ----------------------------------------------------------------- | ------------------ | ---------------------------------- |
| `/chronicler read`                                                | `chronicler.use`   | Receive the latest issue as a book |
| `/chronicler web`                                                 | `chronicler.use`   | Show the web view URL              |
| `/chronicler status`                                              | `chronicler.admin` | Show plugin status                 |
| `/chronicler stats <player>`                                      | `chronicler.use`   | View a player's tracked stats      |
| `/chronicler subscribe`                                           | `chronicler.use`   | Toggle auto-delivery on/off        |
| `/chronicler archive list`                                        | `chronicler.use`   | List past issues                   |
| `/chronicler archive read <#>`                                    | `chronicler.admin` | Receive an old issue               |
| `/chronicler archive export <#>`                                  | `chronicler.admin` | Export an issue as JSON            |
| `/chronicler archive import <file>`                               | `chronicler.admin` | Import JSON from imports folder    |
| `/chronicler editor create`                                       | `chronicler.admin` | Generate a persistent draft issue  |
| `/chronicler editor preview`                                      | `chronicler.admin` | List indexed draft stories         |
| `/chronicler editor edit <section> <story> headline\|body <text>` | `chronicler.admin` | Edit draft copy                    |
| `/chronicler editor remove <section> <story>`                     | `chronicler.admin` | Remove a draft story               |
| `/chronicler editor publish`                                      | `chronicler.admin` | Approve and publish the draft      |
| `/chronicler diagnostics`                                         | `chronicler.admin` | Show subsystem health              |
| `/chronicler reload`                                              | `chronicler.admin` | Reload configuration               |
| `/chronicler publish`                                             | `chronicler.admin` | Force-publish a new issue now      |

## Configuration

`plugins/Chronicler/config.yml`:

```yaml
enabled: true
schedule: WEEKLY
schedule-base: REAL_TIME
publish-day: 0
publish-hour: 8

tracking:
  deaths: true
  kills: true
  pvp: true
  advancements: true
  blocks: true
  exploration: true
  social: true
  economy: true

event-limit: 500
bstats-enabled: true

llm:
  enabled: true
  provider: ollama
  model: llama3.2
  api-key: ''
  base-url: https://openrouter.ai/api/v1
  ollama-url: http://localhost:11434
  timeout-seconds: 30
```

## Building from Source

```bash
git clone https://github.com/ewanc26/Chronicler.git
cd Chronicler
./gradlew build
```

## Licence

AGPL-3.0. See [LICENSE](https://github.com/ewanc26/Chronicler/blob/main/LICENSE).
