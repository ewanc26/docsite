---
title: "@ewanc26/noise-avatar"
description: Deterministic value-noise avatar generation from a string seed — thin wrapper around @ewanc26/noise, works in browsers and Node.js.
date: 2026-03-09
tags: [typescript, canvas, svelte, library, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mgo2rpzy7n2t"
---

[@ewanc26/noise-avatar](https://github.com/ewanc26/pkgs/tree/main/packages/noise-avatar) generates unique, colourful avatar images from an arbitrary string seed. The same seed always produces the same image. It is a thin opinionated wrapper around [@ewanc26/noise](/documentation/noise), fixing the colour mode to HSL and defaulting to a square 64×64 canvas so you don't have to think about noise options for the common avatar use-case.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Install

```bash
pnpm add @ewanc26/noise-avatar
```

Ships as both ESM and CJS with full TypeScript type definitions.

## How it works

Each pixel's colour is computed via bilinear interpolation over a small value-noise grid, using smoothstep blending for a smooth, organic look. The palette is derived from the seed: a djb2 hash determines the base hue, and a seeded LCG PRNG drives the noise grid and colour variance. Because everything is deterministic, the output is stable across environments — the same seed always maps to the same avatar.

The rendering is delegated entirely to `@ewanc26/noise`. For full control over dimensions, FBM octaves, and colour modes, use that package directly.

## Usage

### Vanilla JS / TypeScript

```ts
import { renderNoiseAvatar } from '@ewanc26/noise-avatar';

const canvas = document.querySelector('canvas');
renderNoiseAvatar(canvas, 'Alice|Subscription');
```

### Svelte action

```svelte
<script>
  import { noiseAvatarAction } from '@ewanc26/noise-avatar';

  let seed = 'did:plc:example';
</script>

<canvas use:noiseAvatarAction={seed} class="rounded-full"></canvas>
```

The action re-renders automatically when `seed` changes via Svelte's `update` lifecycle.

## API

### `renderNoiseAvatar(canvas, seed, options?)`

Renders a deterministic HSL value-noise texture onto `canvas` at `displaySize × displaySize` pixels.

| Parameter | Type | Description |
|---|---|---|
| `canvas` | `HTMLCanvasElement` | Target element — will be resized |
| `seed` | `string` | Arbitrary string seed |
| `options` | `NoiseAvatarOptions` | Optional rendering config |

### `noiseAvatarAction(canvas, seed, options?)`

Svelte action wrapper. Re-renders whenever `seed` changes.

### Re-exported primitives

`hash32`, `makePrng`, `hslToRgb`, `makeValueNoiseSampler`, and `generateNoisePixels` are all re-exported from `@ewanc26/noise` for convenience.

## Options

All options are passed as the third argument to `renderNoiseAvatar` or `noiseAvatarAction`.

| Option | Type | Default | Description |
|---|---|---|---|
| `gridSize` | `number` | `5` | Side length of the noise grid |
| `displaySize` | `number` | `64` | Width and height of the rendered canvas in pixels |
| `hueRange` | `number` | `60` | Hue spread in degrees around the seed-derived base hue |
| `saturationRange` | `[number, number]` | `[45, 70]` | Saturation min/max as percentages |
| `lightnessRange` | `[number, number]` | `[40, 70]` | Lightness min/max as percentages |

### Examples

```ts
// High-detail, large avatar
renderNoiseAvatar(canvas, seed, {
  gridSize: 10,
  displaySize: 128,
});

// Desaturated, dark palette
renderNoiseAvatar(canvas, seed, {
  hueRange: 20,
  saturationRange: [10, 30],
  lightnessRange: [20, 45],
});
```

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
