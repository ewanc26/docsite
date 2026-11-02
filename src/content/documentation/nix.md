---
title: nix
description: Centralized NixOS and nix-darwin system configurations.
date: 2026-06-13
tags: [nix, infra, configuration]
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mo7b3gkaab2p'
---

# nix

> **Archived:** This repository is archived on GitHub and is no longer actively maintained.

Systematic infrastructure-as-code for macOS and Linux environments.

## 01. Purpose

Defines and enforces reproducible system states across personal and server infrastructure. Ensures toolchain consistency and declarative package management.

## 02. Technical Stack

- **Language**: Nix
- **Platforms**: macOS (nix-darwin), Linux (NixOS)
- **Framework**: Flakes

## 03. Key Components

- **Darwin Modules**: macOS system and application configuration for `macmini`.
- **NixOS Modules**: Host and service definitions for the laptop and server, including Forgejo, Nextcloud, Immich, Jellyfin, and Vaultwarden.
- **Home Manager**: Shared user environment across macOS and Linux.
- **Options Layer**: Typed defaults in `modules/options.nix`, with per-host overrides.

## 04. Integration

Deployment via flake activation:

```bash
# NixOS
sudo nixos-rebuild switch --flake .#laptop
sudo nixos-rebuild switch --flake .#server

# macOS (after the first nix-darwin install)
sudo darwin-rebuild switch --flake .#macmini
```

First-time macOS installs use `sudo nix run nix-darwin -- switch --flake .#macmini`.

## 05. System Status

- **Status**: Archived — repository no longer maintained
- **Hosts**: `macmini` and `laptop` remain the active configurations; the server configuration is retained with its PDS disabled.
- **PDS**: Decommissioned 2026-10-01 after the account moved to `eurosky.social`.
- **Consistency**: High (Flake-locked)
