---
title: "@ewanc26/landing-ui"
description: Shared Svelte landing page layout, CSS, and components for the *-web tool sites (Jasper, Malachite, Opal, Bismuth, Tourmaline).
date: 2026-08-20
tags: [svelte, ui, library, landing-page, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mtjafaqwrx27"
---

[@ewanc26/landing-ui](https://github.com/ewanc26/pkgs/tree/main/packages/landing-ui) is the shared layout every `@ewanc26/*-web` tool site is built on — Jasper, Malachite, Opal, Bismuth, and Tourmaline all render through the same `LandingLayout` and `LandingPage` components. Each site supplies its own name, logo, copy, and CSS custom properties (`--accent`, `--bg`, `--surface`, etc.); the structure, spacing, and interaction patterns come from here.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Install

```bash
pnpm add @ewanc26/landing-ui
```

```svelte
<script>
  import { LandingLayout, LandingPage, SupportSection } from '@ewanc26/landing-ui';
  import '@ewanc26/landing-ui/landing.css';
</script>
```

## Components

| Component | Purpose |
| --------- | ------- |
| `LandingLayout` | Page chrome — sticky header with nav and a support link, and a footer with source/privacy/support links plus the AT Protocol trademark attribution. |
| `LandingPage` | The body: hero with eyebrow/heading/sub, a numbered feature grid, a numbered "how it works" timeline, a CTA band, and a siblings grid linking to the other tools. |
| `SectionHeading` | The numbered-index heading (`01`, `02`, `03`) with a fading hairline rule, used between each `LandingPage` section. |
| `SupportSection` | The Ko-fi / GitHub Sponsors card rendered at the foot of every landing page — states what the tool gives before asking, and closes with a low-pressure alternative (star the repo). |
| `SearchInput` | A styled search/handle input, used where a tool's hero needs an input rather than a plain CTA button (e.g. Tourmaline's handle field). |

## Required CSS tokens

`landing.css` expects the consuming project to define these as custom properties on `:root` — the components read them directly rather than hardcoding colours, so each site can carry its own accent:

```
--bg, --surface, --surface-2, --border, --accent, --accent-dim,
--accent-glow, --text, --muted, --error, --warn
```

Optional, used if present: `--border-subtle`, `--accent-bright`, `--text-muted`, `--text-dim`.

## Trademark notice

`LandingLayout`'s footer includes an AT Protocol trademark attribution by default, since every consuming site describes itself in terms of AT Protocol compatibility. It's controlled by a `showAtprotoNotice` prop, off by default only for a hypothetical non-AT-Protocol consumer.

## Development

```bash
git clone https://github.com/ewanc26/pkgs.git
cd pkgs
pnpm install

pnpm --filter @ewanc26/landing-ui build
```

## Related projects

- [Jasper](/projects/jasper), [Malachite](/projects/malachite), [Opal](/projects/opal), [Bismuth](/projects/bismuth), [Tourmaline](/projects/tourmaline) — the sites built on this layout
- [croft.click](/projects/croft-click) — the directory linking all of them, styled separately

## Licence

AGPL-3.0-only.
