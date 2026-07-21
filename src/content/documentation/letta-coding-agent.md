---
title: letta-coding-agent
description: Memory repository for a Letta Code coding agent — stores persistent persona and user identity projected into the agent's context at runtime.
date: 2026-07-21
tags: [letta, agent, memory, skills]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udv2yjp2s'
---

[letta-coding-agent](https://github.com/ewanc26/letta-coding-agent) is the persistent memory and skill repository for a Letta Code coding agent. It stores the agent's persona, user identity, skills, and reference material projected into the agent's context at runtime.

## Repository Contents

```
system/
├── persona.md              # Who the agent is, how it works
└── human/
    └── identity.md         # What the agent knows about Ewan

skills/                      # Triggerable workflows and skills
reference/                   # Deeper facts, provenance, and history
```

## What This Is

This repo stores the agent's persistent memory. It's projected into the agent's context at runtime, so everything here shapes how the agent thinks and works across sessions. The Letta server syncs changes automatically. Push to the `github` remote to back up to GitHub.

## Files

- `system/persona.md` — Always-loaded operating memory: who the agent is and how it works
- `system/human/identity.md` — User identity, preferences, and working style
- `skills/*/SKILL.md` — Triggerable workflows for different tasks
- `reference/` — Project facts, tool documentation, and historical snapshots

## Privacy

This repository contains personal data including health, location, relationships, handles/DIDs, and behavioural preferences. Treat it as private even if the remote permits pushes.
