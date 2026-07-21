---
title: minefetch
description: A Kotlin Paper plugin that displays host system information inside Minecraft via a Fastfetch-style panel.
date: 2026-07-21
tags: [minecraft, paper, kotlin, fastfetch, plugin]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6uduu6qx2s'
---

[minefetch](https://github.com/ewanc26/minefetch) is a Kotlin Paper plugin that displays host system information inside Minecraft via a Fastfetch-style panel.

## What It Does

- Displays live host system info (OS, kernel, hostname, uptime, CPU, memory, disk usage) in Minecraft
- Shows server metrics: Paper version, Java version, player count, JVM heap usage, TPS
- Uses an on-demand refresh mechanism: a shell or PowerShell watcher writes Fastfetch JSON to a shared location
- Supports GitHub release update checking
- Ships with a bundled sysinfo watcher and Minefetch-specific fastfetch config

## How It Works

1. A host-side watcher polls for a `.refresh` trigger file
2. When triggered, it runs Fastfetch and writes JSON to `host.json.tmp`
3. An atomic rename delivers the data to the plugin
4. The plugin reads and caches the JSON, rendering it in a `/minefetch` command
5. An update checker checks GitHub for newer releases on startup

## Requirements

- Paper 26.1+
- Java 26+
- Fastfetch installed on the host machine
- Host watcher script (Bash or PowerShell)

## Commands

| Command      | Permission      | Description                  |
| ------------ | --------------- | ---------------------------- |
| `/minefetch` | `minefetch.use` | Display host and server info |
| `/sysinfo`   | `minefetch.use` | Alias for `/minefetch`       |

## Build

```bash
./gradlew build
```

Output: `build/libs/Minefetch-<version>-all.jar`

## Installation

Copy the fat JAR to your server's `plugins/` directory and restart.

## Configuration

The plugin watches `/sysinfo/host.json` by default. The watcher script and Fastfetch config are included in the repository.

## Data Flow

The `SysInfoReader` tolerates missing or malformed JSON by returning null and extracts known Fastfetch modules into `HostInfo`. The command renders host values plus server version, Java, players, JVM heap, one-minute TPS, plugin count, and cores.

## Licence

MIT
