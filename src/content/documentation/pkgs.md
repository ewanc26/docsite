---
title: "@ewanc26/pkgs"
description: Ewan's personal package monorepo — language-agnostic workspace with TypeScript, Rust, and Python packages.
date: 2026-03-07
tags: [monorepo, pnpm, typescript, rust, python, atproto, library, tools]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mghs3tnb6x25"
---

[`@ewanc26/pkgs`](https://github.com/ewanc26/pkgs) is a language-agnostic monorepo containing all of Ewan's publishable packages across multiple programming languages. It was created by extracting the `packages/` subdirectories from their original host repositories ([malachite](https://github.com/ewanc26/malachite) and [website](https://github.com/ewanc26/website)) and migrating the entire [svelte-standard-site](https://github.com/ewanc26/svelte-standard-site) repository — all with full git history preserved via `git subtree`.

The monorepo has since expanded to include Rust CLI tools and Python utilities, making it a unified workspace for all reusable code.

## Packages

### TypeScript

| Package | Version | Description |
|---------|---------|-------------|
| [`@ewanc26/tid`](/projects/tid) | 1.x | Zero-dependency AT Protocol TID generation |
| [`@ewanc26/atproto`](/projects/atproto) | 0.x | AT Protocol service layer (profiles, posts, Standard.site, music status) |
| [`@ewanc26/ui`](/projects/ui) | 0.x | Svelte 5 UI component library (cards, layout, stores, themes) |
| [`@ewanc26/utils`](/projects/utils) | 0.x | Shared utilities (dates, numbers, URLs, validators, RSS) |
| [`@ewanc26/svelte-standard-site`](/projects/svelte-standard-site) | 0.x | SvelteKit library for `site.standard.*` AT Protocol records |
| [`@ewanc26/tangled-sync`](/projects/tangled-sync) | 1.x | CLI tool for syncing GitHub repos to Tangled with ATProto records |
| [`@ewanc26/pds-landing`](/projects/pds-landing) | 2.x | Composable Svelte components for an ATProto PDS landing page — terminal-aesthetic UI with live status fetching |
| [`@ewanc26/noise-avatar`](/projects/noise-avatar) | 0.x | Deterministic value-noise avatar generation from a string seed — zero dependencies, works in browsers and Node.js |
| [`@ewanc26/supporters`](/projects/supporters) | 0.x | SvelteKit component library for displaying Ko-fi supporters, backed by an ATProto PDS |

### Rust

| Package | Version | Description |
|---------|---------|-------------|
| [`nix-config-tools`](/projects/nix-config-tools) | 0.x | Management tools for nixos/nix-darwin configuration (flake-bump, health-check, gen-diff, server-config) |

### Python

| Package | Version | Description |
|---------|---------|-------------|
| [`llm-analyser`](/projects/llm-analyser) | 0.x | Document analysis tool using Ollama LLM |

## Why a monorepo?

The packages share overlapping concerns — `@ewanc26/ui` depends on `@ewanc26/atproto` for its card components, and both consume types from `@ewanc26/utils`. `@ewanc26/svelte-standard-site` is a self-contained SvelteKit library. Having them colocated means:

- Cross-package changes can land in a single PR
- `workspace:*` references keep internal deps in sync without publishing intermediary versions
- One place to update shared tooling (TypeScript config, build scripts, licence)
- Unified development experience across languages

## Installation

### TypeScript packages

```bash
pnpm add @ewanc26/tid
pnpm add @ewanc26/atproto
pnpm add @ewanc26/ui
pnpm add @ewanc26/utils
pnpm add @ewanc26/svelte-standard-site
pnpm add @ewanc26/tangled-sync
pnpm add @ewanc26/noise-avatar
pnpm add @ewanc26/supporters
```

### Rust tools

```bash
nix run https://github.com/ewanc26/pkgs#health-check
```

### Python tools

```bash
# Install dependencies
pip install ollama python-docx

# Run the tool
python3 main.py
```

## Development

```bash
git clone https://github.com/ewanc26/pkgs.git
cd pkgs
pnpm install

# Build all TypeScript packages
pnpm build

# Type-check all TypeScript packages
pnpm check

# Test all TypeScript packages
pnpm test

# Build all Rust packages
cargo build --release

# Check Python syntax
pnpm py:check

# Work on a single package
pnpm --filter @ewanc26/tid build
pnpm --filter @ewanc26/svelte-standard-site dev
cargo build -p nix-config-tools --bin health-check
```

## How history was migrated

Each package was extracted from its source repository using one of two approaches:

**Subdirectory packages** (`tid`, `atproto`, `ui`, `utils`) — `git subtree split` was run inside the source repo to isolate that subdirectory's commit history into a standalone branch, which was then merged into `pkgs` via `git subtree add`. `git log packages/tid` in this repo shows the real history going back to when the package was first created in `malachite`.

**Whole-repo package** (`svelte-standard-site`) — the repo root was already the package, so no split step was needed. The full history was merged directly into `packages/svelte-standard-site` via `git subtree add`.

**Consolidated packages** (`nix-config-tools`, `tangled-sync`, `llm-analyser`) — these were copied from their original locations and integrated into the monorepo structure.

The source repos retain their original files for reference, but the canonical source of truth for all packages is this monorepo.

## Publishing

TypeScript packages are published to npm automatically via GitHub Actions. Pushing a tag in the format `<package-name>/v<semver>` triggers the workflow, which resolves the package from the tag, builds it, and publishes to npm with provenance via OIDC.

```bash
# Publish a specific package
git tag pds-landing/v1.0.0
git push origin pds-landing/v1.0.0
```

The `NPM_TOKEN` secret must be set in the repository's GitHub Actions secrets. Rust and Python packages are not published automatically.

## Licence

AGPL-3.0-only.
