---
title: "@ewanc26/wafrn-theme"
description: A WAFRN theme using the pds-landing Catppuccin terminal aesthetic — dark forest-green palette, JetBrains Mono, soft rounded cards.
date: 2026-03-24
tags: [css, wafrn, theme, fediverse, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mhrgor4zss2f"
---

[@ewanc26/wafrn-theme](https://github.com/ewanc26/pkgs/tree/main/packages/wafrn-theme) is a CSS theme for [WAFRN](https://wafrn.net) that ports the visual language of [`@ewanc26/pds-landing`](/projects/pds-landing) — dark forest-green Catppuccin palette, JetBrains Mono, and soft rounded cards — into the WAFRN theme editor.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Usage

WAFRN has a built-in theme editor under **Settings → Theme**. Paste the contents of [`src/theme.css`](https://github.com/ewanc26/pkgs/blob/main/packages/wafrn-theme/src/theme.css) there and save.

Alternatively, if you're pulling it from npm:

```bash
pnpm add @ewanc26/wafrn-theme
```

The package exports a single CSS file:

```css
@import '@ewanc26/wafrn-theme/theme.css';
```

## Design

The theme shares its token set with `@ewanc26/pds-landing` — the same Catppuccin Mocha-derived greens, the same monospace stack, the same card radius and shadow values. The intent is a consistent aesthetic across the PDS landing page and the WAFRN instance.

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
