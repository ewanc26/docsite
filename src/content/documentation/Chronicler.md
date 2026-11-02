---
title: Chronicler
description: A PaperMC plugin that tracks server events and generates a dynamic in-game newspaper, delivered as a typeset reader or written book.
date: 2026-07-21
tags: [minecraft, paper, kotlin, newspaper, llm]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udwxts72s'
---

[Chronicler](https://github.com/ewanc26/Chronicler) is a PaperMC plugin that tracks server events and generates a dynamic in-game newspaper, delivered as a typeset reader or a written book.

## Features

- **Death & PvP Tracking** — Records deaths, PvP kills, and mob kills with causes
- **Advancement Tracking** — Captures every advancement earned by players
- **Building & Exploration** — Tracks non-natural blocks placed/broken, biome and ore discoveries, distance milestones
- **Social & Messaging** — Join/leave events, private message tracking, optional chat excerpts
- **Session Tracking** — Cumulative playtime, session counts, daily login streaks with milestones
- **Economy Tracking** — Detects Vault at runtime, records transactions
- **Breaking News** — Special coverage when players first enter The End
- **Dynamic Newspaper** — Sections for Headlines, Breaking News, Obituaries, Achievements, Hunting Grounds, Exploration & Building, Economy & Trading, Social, and Statistics
- **Printed Edition** — Typeset broadsheet pages with a masthead, lead story, section bands, and portraits, shown in an in-game reader; a text edition covers clients that decline the resource pack
- **LLM Integration** — Optional AI-powered article generation via Ollama, OpenAI-compatible APIs, or Anthropic Claude, with template fallback
- **Editorial Workflow** — Create, preview, edit, remove stories from, and approve persistent draft issues
- **Letters, Adverts & Polls** — Player submissions with staff approval, plus a reader poll printed as a bar chart
- **Newsstands** — Wall-mounted item-frame displays showing each front page as map art
- **Web View** — Optional embedded HTTP server with dark/light theme, permalinks, issue navigation, and RSS feed
- **Archive & Search** — Retention policies, import/export, and full-text search
- **Privacy Controls** — Exclude players and redact private messages, chat excerpts, and coordinates; with excerpts off, chat text is never stored
- **Auto-Delivery** — New issues spawn into every online player's inventory, dropping at their feet if full; players can opt out
- **Issue #0** — On first run, backfills historical events from server logs
- **Headline Ticker** — Periodic action-bar broadcasts of headlines from the latest issue
- **Safe Updates** — Automatic GitHub release updates with mandatory SHA-256 verification
- **Publishing** — Posts issues to Standard.site/AT Protocol and Discord
- **Plugin Integrations** — Towny, Lands, mcMMO, LuckPerms, QuickShop-Hikari, NuVotifier, Plan, BlueMap, squaremap, ViaVersion, and Geyser/Floodgate
- **Locale Support** — All messages customizable via `messages.yml` in MiniMessage format
- **PlaceholderAPI** — 13+ placeholders exposing issue stats, playtime, and login streaks
- **bStats Metrics** — Anonymous usage statistics, configurable

## The In-Game Newspaper

Each issue is typeset as broadsheet pages and shown in a reader screen when a player right-clicks their newspaper or runs `/chronicler read`. Chronicler builds a small resource pack for the latest issue (about 250 KB per page) and serves it from the embedded web server; players who decline it get a text edition, and Bedrock players through Geyser/Floodgate get the text as Bedrock forms. Set `web.public-url` so the pack and printed page images resolve outside the server; set `reader.mode: book` to keep the classic written book only.

## Letters, Adverts and Polls

`/chronicler write` opens a form for a letter to the editor or a classified advert. By default staff approve each submission in `/chronicler submissions` before it prints. `/chronicler poll create` starts a reader poll with 2–6 options; players vote with `/chronicler poll` and can change their vote until the next issue, which prints the results and closes the poll.

## Publishing and Integrations

With `publish.standard-site`, each issue is published as a `site.standard.document` under a `site.standard.publication`, optionally announced on Bluesky. With `publish.discord`, issues are posted through a channel webhook (or DiscordSRV's main channel) with the front page attached. Installed plugins are used automatically for civic news, skill milestones, promotions, shop sales, votes, maps, and Plan statistics; see the repository README for the full integration table.

## Requirements

- PaperMC on the current API line
- Java 26+
- Optional: PlaceholderAPI, Vault, Ollama/OpenAI/Anthropic API key
- Optional: any of the supported integration plugins (Towny, Lands, mcMMO, LuckPerms, QuickShop-Hikari, NuVotifier, Plan, BlueMap, squaremap, ViaVersion, Geyser/Floodgate)

## Installation

1. Download the latest release jar from the [releases page](https://github.com/ewanc26/Chronicler/releases)
2. Place the jar in your server's `plugins/` folder
3. Restart the server
4. Edit `plugins/Chronicler/config.yml` to your liking
5. Run `/chronicler reload` to apply changes

## Commands

| Command                                                           | Permission         | Description                        |
| ----------------------------------------------------------------- | ------------------ | ---------------------------------- |
| `/chronicler read`                                                | `chronicler.use`   | Receive and open the latest issue |
| `/chronicler read <player>`                                       | `chronicler.admin` | Hand a player the latest issue     |
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
| `/chronicler write [letter\|ad <headline> \| <text>]`             | `chronicler.write` | Send a letter or classified advert |
| `/chronicler poll [vote <n>]`                                     | `chronicler.use`   | Vote in the reader poll            |
| `/chronicler poll create\|cancel\|results`                        | `chronicler.admin` | Run the reader poll                |
| `/chronicler submissions [approve\|reject <id>]`                  | `chronicler.admin` | Review letters and adverts         |
| `/chronicler newsstand create\|remove\|list`                      | `chronicler.admin` | Manage newsstands                  |
| `/chronicler pack status\|export`                                 | `chronicler.admin` | Newspaper pack status and export   |
| `/chronicler announce [all\|standard-site\|discord]`              | `chronicler.admin` | Re-send the current issue          |
| `/chronicler diagnostics`                                         | `chronicler.admin` | Show subsystem and updater health  |
| `/chronicler reload`                                              | `chronicler.admin` | Reload configuration               |
| `/chronicler publish`                                             | `chronicler.admin` | Force-publish a new issue now      |

Alias: `/clr`.

## Configuration

`plugins/Chronicler/config.yml` (abridged):

```yaml
enabled: true
schedule: WEEKLY           # DAILY, WEEKLY, BIWEEKLY, MONTHLY, or ticks
schedule-base: REAL_TIME   # or IN_GAME
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
  # chat, crafting, fishing, sleep, portals, entities, weather and more

event-limit: 500
bstats-enabled: true

auto-update:
  enabled: true

llm:
  enabled: true
  provider: ollama        # ollama, openai (OpenAI-compatible), anthropic
  model: llama3.2
  api-key: ''
  base-url: https://openrouter.ai/api/v1
  ollama-url: http://localhost:11434
  timeout-seconds: 30

newspaper:
  title: "The Weekly Chronicle"
  server-name: ''
  locale: en-GB
  portraits: auto

web:
  enabled: true
  port: 8080
  public-url: ''

reader:
  mode: newspaper         # or book
```

The LLM is probed asynchronously at startup and before each issue, so a model server started after Minecraft is picked up automatically; while it is unreachable, issues use template copy. See `config.yml` for privacy, contributions, integrations, publishing, archive, ticker, and reader-pack settings.

## Building from Source

```bash
git clone https://github.com/ewanc26/Chronicler.git
cd Chronicler
./gradlew build
./gradlew test
```

The compiled jar lands in `build/libs/` with the current release name.

## Licence

AGPL-3.0. See [LICENSE](https://github.com/ewanc26/Chronicler/blob/main/LICENSE).
