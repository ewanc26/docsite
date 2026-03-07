---
title: "@ewanc26/pkgs"
description: Ewan's personal package monorepo — the canonical home for @ewanc26/tid, @ewanc26/atproto, @ewanc26/ui, and @ewanc26/utils.
date: 2026-03-07
tags: [monorepo, pnpm, typescript, atproto, library, tools]
draft: false
---

[`@ewanc26/pkgs`](https://github.com/ewanc26/pkgs) is a pnpm workspace monorepo containing all of Ewan's publishable npm packages. It was created by extracting the `packages/` subdirectories from their original host repositories ([malachite](https://github.com/ewanc26/malachite) and [website](https://github.com/ewanc26/website)) and consolidating them into one place, with full git history preserved via `git subtree`.

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@ewanc26/tid`](/projects/tid) | 1.x | Zero-dependency AT Protocol TID generation |
| [`@ewanc26/atproto`](/projects/atproto) | 0.x | AT Protocol service layer (profiles, posts, Standard.site, music status) |
| [`@ewanc26/ui`](/projects/ui) | 0.x | Svelte 5 UI component library (cards, layout, stores, themes) |
| [`@ewanc26/utils`](/projects/utils) | 0.x | Shared utilities (dates, numbers, URLs, validators, RSS) |

## Why a monorepo?

The packages share overlapping concerns — `@ewanc26/ui` depends on `@ewanc26/atproto` for its card components, and both consume types from `@ewanc26/utils`. Having them colocated means:

- Cross-package changes can land in a single PR
- `workspace:*` references keep internal deps in sync without publishing intermediary versions
- One place to update shared tooling (TypeScript config, build scripts, licence)

## Installation

```bash
# Individual packages
pnpm add @ewanc26/tid
pnpm add @ewanc26/atproto
pnpm add @ewanc26/ui
pnpm add @ewanc26/utils
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

# Work on a single package
pnpm --filter @ewanc26/tid build
pnpm --filter @ewanc26/ui dev
```

## How history was migrated

Each package was extracted from its source repository using `git subtree split`, which rewrites the commit history of a subdirectory into a standalone branch. That branch was then merged into `pkgs` with `git subtree add`, so `git log packages/tid` in this repo shows the real history going back to when the package was first created in `malachite` — not just a single "initial commit".

The source repos retain their `packages/` subdirectories for reference, but the canonical source of truth for all packages is this monorepo.

## Licence

AGPL-3.0-only.
