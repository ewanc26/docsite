---
title: "@ewanc26/pkgs"
description: Ewan's personal package monorepo — the canonical home for @ewanc26/tid, @ewanc26/atproto, @ewanc26/ui, @ewanc26/utils, and @ewanc26/svelte-standard-site.
date: 2026-03-07
tags: [monorepo, pnpm, typescript, atproto, library, tools]
draft: false
---

[`@ewanc26/pkgs`](https://github.com/ewanc26/pkgs) is a pnpm workspace monorepo containing all of Ewan's publishable npm packages. It was created by extracting the `packages/` subdirectories from their original host repositories ([malachite](https://github.com/ewanc26/malachite) and [website](https://github.com/ewanc26/website)) and migrating the entire [svelte-standard-site](https://github.com/ewanc26/svelte-standard-site) repository — all with full git history preserved via `git subtree`.

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@ewanc26/tid`](/projects/tid) | 1.x | Zero-dependency AT Protocol TID generation |
| [`@ewanc26/atproto`](/projects/atproto) | 0.x | AT Protocol service layer (profiles, posts, Standard.site, music status) |
| [`@ewanc26/ui`](/projects/ui) | 0.x | Svelte 5 UI component library (cards, layout, stores, themes) |
| [`@ewanc26/utils`](/projects/utils) | 0.x | Shared utilities (dates, numbers, URLs, validators, RSS) |
| [`@ewanc26/svelte-standard-site`](/projects/svelte-standard-site) | 0.x | SvelteKit library for `site.standard.*` AT Protocol records |

## Why a monorepo?

The packages share overlapping concerns — `@ewanc26/ui` depends on `@ewanc26/atproto` for its card components, and both consume types from `@ewanc26/utils`. `@ewanc26/svelte-standard-site` is a self-contained SvelteKit library. Having them colocated means:

- Cross-package changes can land in a single PR
- `workspace:*` references keep internal deps in sync without publishing intermediary versions
- One place to update shared tooling (TypeScript config, build scripts, licence)

## Installation

```bash
pnpm add @ewanc26/tid
pnpm add @ewanc26/atproto
pnpm add @ewanc26/ui
pnpm add @ewanc26/utils
pnpm add @ewanc26/svelte-standard-site
```

## Development

```bash
git clone https://github.com/ewanc26/pkgs.git
cd pkgs
pnpm install

# Build all packages
pnpm build

# Type-check all packages
pnpm check

# Test all packages
pnpm test

# Work on a single package
pnpm --filter @ewanc26/tid build
pnpm --filter @ewanc26/svelte-standard-site dev
```

## How history was migrated

Each package was extracted from its source repository using one of two approaches:

**Subdirectory packages** (`tid`, `atproto`, `ui`, `utils`) — `git subtree split` was run inside the source repo to isolate that subdirectory's commit history into a standalone branch, which was then merged into `pkgs` via `git subtree add`. `git log packages/tid` in this repo shows the real history going back to when the package was first created in `malachite`.

**Whole-repo package** (`svelte-standard-site`) — the repo root was already the package, so no split step was needed. The full history was merged directly into `packages/svelte-standard-site` via `git subtree add`.

The source repos retain their original files for reference, but the canonical source of truth for all packages is this monorepo.

## Licence

AGPL-3.0-only.
