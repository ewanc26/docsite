---
title: nix-config-tools
description: Rust CLI tools for managing nixos/nix-darwin configurations — now part of the @ewanc26/pkgs monorepo.
date: 2026-03-07
tags: [rust, nix, nixos, nix-darwin, cli, tools, monorepo]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mgi265j55h25"
---

[`nix-config-tools`](https://github.com/ewanc26/pkgs/tree/main/packages/nix-config-tools) is a collection of Rust CLI utilities for managing NixOS and nix-darwin configurations. These tools help with common maintenance tasks like checking system health, managing flake inputs, and analyzing package changes between generations.

This package is now part of the [@ewanc26/pkgs monorepo](/projects/pkgs).

## Tools Included

### `health-check`

Pre-rebuild preflight checks for Nix configurations.

```bash
# Via Nix (recommended)
nix run ~/Developer/Git/pkgs#health-check

# Via shell alias (after nixos-rebuild)
health-check
```

Checks performed:
- Nix daemon responsiveness
- Flake lock file validity
- Git repository cleanliness
- Age key presence
- SSH key availability
- Disk space availability
- Homebrew installation (macOS only)

### `flake-bump`

Manage Nix flake input versions and update them selectively.

```bash
# Show current input staleness
nix run ~/Developer/Git/pkgs#flake-bump

# Update a specific input
nix run ~/Developer/Git/pkgs#flake-bump -- --update nixpkgs

# Update all inputs
nix run ~/Developer/Git/pkgs#flake-bump -- --update-all
```

### `gen-diff`

Compare package changes between NixOS generations.

```bash
# Diff last two generations
nix run ~/Developer/Git/pkgs#gen-diff

# List all generations
nix run ~/Developer/Git/pkgs#gen-diff -- --list

# Diff specific generations
nix run ~/Developer/Git/pkgs#gen-diff -- --from 42 --to 43
```

### `server-config`

Interactive server configuration tool for NixOS servers.

```bash
nix run ~/Developer/Git/pkgs#server-config
```

Features:
- Service toggles
- Storage device configuration
- Cockpit, Forgejo, Matrix, PDS, Cloudflare settings
- Read-only summary mode: `nix run ~/Developer/Git/pkgs#server-config -- --show`

## Development

```bash
# Clone the monorepo
git clone https://github.com/ewanc26/pkgs
cd pkgs

# Build all Rust packages
cargo build --release

# Build specific tool
cargo build -p nix-config-tools --bin health-check

# Run a tool
cargo run -p nix-config-tools --bin flake-bump -- --help
```

## Architecture

Built with Rust using:
- `dialoguer` for interactive prompts
- `console` for terminal output formatting
- Standard library for system operations

The tools follow Unix conventions and integrate well with existing Nix workflows.

## Migration from nix-config

These tools were originally developed in `~/.config/nix-config/tools/` and have been consolidated into the monorepo for better organization and cross-platform availability.

## Licence

AGPL-3.0-only