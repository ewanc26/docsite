---
title: nix
description: Centralized NixOS and nix-darwin system configurations.
date: 2026-06-13
tags: [nix, infra, configuration]
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mo7b3gkaab2p'
---

# nix

Systematic infrastructure-as-code for macOS and Linux environments.

## 01. Purpose

Defines and enforces reproducible system states across personal and server infrastructure. Ensures toolchain consistency and declarative package management.

## 02. Technical Stack

- **Language**: Nix
- **Platforms**: macOS (nix-darwin), Linux (NixOS)
- **Framework**: Flakes

## 03. Key Components

- **Darwin Modules**: macOS-specific system and application configurations.
- **NixOS Modules**: Server-side definitions for PDS and web hosting.
- **Home Manager**: User-level dotfile orchestration.

## 04. Integration

Deployment via standard flake activation:

```bash
nix run .#deploy
```

## 05. System Status

- **Status**: Active / Production
- **Consistency**: High (Flake-locked)
