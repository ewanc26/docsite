---
title: digital-person
description: Letta-based digital identity for cross-platform presence.
date: 2026-06-13
tags: [ai, letta, identity]
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mo7b3glrbw2e'
---

# digital-person

Orchestration framework for a persistent digital identity.

## 01. Purpose

Automates cross-platform social presence. Designed to function as a human online — performing tasks across blogging, emailing, and social posting while maintaining stylistic consistency.

## 02. Technical Stack

- **Engine**: Letta
- **Configuration**: Markdown identity, voice, and presence files
- **Skills**: Shared skill documents for Bluesky, blogging, email, Telegram, and web browsing
- **Memory**: Persistent agent memory, stored as versioned persona files

## 03. Key Components

- **Personas**: `person/<name>/` holds a filled-in identity, online-presence, voice, and deployer relationship.
- **Templates**: `template/` provides blank versions of each identity file for a new person.
- **Skills**: `skills/` covers Bluesky, blogging, email, Telegram, and web browsing.
- **Platform Conventions**: `reference/platform-conventions.md` records per-platform norms and etiquette.

## 04. Integration

The repository holds the persona files loaded into a Letta agent. New people start by copying `template/` to `person/<name>/` and filling in the identity files. Faol's primary human channel is Telegram.

## 05. System Status

- **Status**: Deployed
- **Person**: Faol (`faol.croft.click`)
