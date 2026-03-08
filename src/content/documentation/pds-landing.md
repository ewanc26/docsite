---
title: "@ewanc26/pds-landing"
description: Composable Svelte 5 components for an ATProto PDS landing page — terminal aesthetic, live status fetching, zero config to drop in.
date: 2026-03-08
tags: [atproto, pds, svelte, sveltekit, typescript, tailwindcss, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mgivnkdp4725"
---

[@ewanc26/pds-landing](https://github.com/ewanc26/pkgs/tree/main/packages/pds-landing) is a composable Svelte 5 component library for building ATProto PDS landing pages. It powers the page served at [pds.ewancroft.uk](https://pds.ewancroft.uk) and is consumed there via a standalone SvelteKit app in the [`nix-config`](https://github.com/ewanc26/nix-config) repository.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Installation

```bash
pnpm add @ewanc26/pds-landing @ewanc26/ui
```

## Quick start — full page

The `PDSPage` component is a drop-in fully-assembled landing page:

```svelte
<script>
  import { PDSPage } from '@ewanc26/pds-landing';
</script>

<PDSPage
  cardTitle="ewan's pds"
  promptUser="server"
  promptHost="pds.ewancroft.uk"
  tagline="Bluesky-compatible ATProto PDS · personal instance"
  blueskyHandle="ewancroft.uk"
/>
```

Import the PDS design tokens once in your layout CSS:

```css
@import 'tailwindcss';
@import '@ewanc26/ui/styles/pds-tokens.css';
```

## Composing primitives

All sub-components are exported individually for custom layouts:

```svelte
<script>
  import {
    TerminalCard, PromptLine, Tagline,
    SectionLabel, Divider, StatusGrid,
    LinkList, ContactSection, PDSFooter,
  } from '@ewanc26/pds-landing';
</script>

<TerminalCard title="my pds">
  <PromptLine user="server" host="pds.example.com" />
  <Tagline text="My custom tagline" />

  <SectionLabel label="status" />
  <StatusGrid />

  <Divider />

  <SectionLabel label="links" />
  <LinkList links={[{ href: 'https://atproto.com', label: 'ATProto docs' }]} />

  <Divider />
  <SectionLabel label="contact" />
  <ContactSection blueskyHandle="you.bsky.social" />
</TerminalCard>

<PDSFooter />
```

### Fetching status manually

```ts
import { fetchPDSStatus } from '@ewanc26/pds-landing';

const { health, description, accountCount } = await fetchPDSStatus('https://pds.example.com');
```

## Components

| Component | Description |
|---|---|
| `PDSPage` | Full assembled landing page (convenience wrapper) |
| `TerminalCard` | Terminal window shell with traffic-light titlebar |
| `PromptLine` | `user@host:path $` bash prompt header |
| `Tagline` | Dimmed subtitle beneath the prompt |
| `SectionLabel` | Uppercase section heading |
| `Divider` | Thin green-tinted `<hr>` |
| `KVGrid` | Key-value grid with ok / warn / err / loading states |
| `StatusGrid` | Live-fetching PDS status grid (wraps `KVGrid`) |
| `LinkList` | `→ link` list |
| `ContactSection` | Bluesky mention + optional email |
| `PDSFooter` | Footer with nixpkgs / atproto links |

## How it works

On mount, `StatusGrid` (via `fetchPDSStatus`) calls three XRPC endpoints on the PDS:

- `/xrpc/_health` — liveness check and version
- `/xrpc/com.atproto.server.describeServer` — DID, invite requirements, links, contact email
- `/xrpc/com.atproto.sync.listRepos` — paginated account count

`PDSPage` also appends any privacy policy / terms of service URLs returned by `describeServer` to the links section automatically. Fields absent from the server response are hidden rather than shown as errors.

## Tech stack

- Svelte 5 with runes (`$state`, `$derived`, `$props`)
- SvelteKit 2 (component library via `@sveltejs/package`)
- Tailwind CSS v4
- TypeScript 5.9+
- Zero runtime dependencies beyond `@ewanc26/ui` (design tokens / base styles)

## Design tokens

All components consume CSS custom properties from `@ewanc26/ui/styles/pds-tokens.css`:

```
--pds-font-mono
--pds-color-crust / mantle / base / surface-0 / surface-1 / overlay-0
--pds-color-text / subtext-0
--pds-color-green / red / yellow / shadow
```

## Deployment

The actual page at `pds.ewancroft.uk` is served by a small SvelteKit app in `nix-config/modules/server/pds-landing`. It consumes this package as an npm dependency, builds to a fully static site with `@sveltejs/adapter-static`, and is served by Caddy in the NixOS configuration:

```nix
# modules/server/pds.nix
@landing path / /_app/* /favicon.svg
handle @landing {
  root * ${landingPage}
  file_server
}
```

The Nix derivation builds the SvelteKit app at eval time, so the output is reproducible without `node_modules` on the server.

## Publishing

New versions are published to npm automatically when a tag matching `pds-landing/v*.*.*` is pushed to the monorepo. The GitHub Actions workflow builds the package and publishes it with provenance via OIDC.

```bash
git tag pds-landing/v2.0.0
git push origin pds-landing/v2.0.0
```

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
