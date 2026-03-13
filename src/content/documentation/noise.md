---
title: "@ewanc26/noise"
description: Generic deterministic value-noise generation. Arbitrary dimensions, multi-octave FBM, multiple colour modes. Zero dependencies, works in browsers and Node.js.
date: 2026-03-13
tags: [typescript, canvas, svelte, library, pkgs]
draft: false
---

[@ewanc26/noise](https://github.com/ewanc26/pkgs/tree/main/packages/noise) is the underlying noise engine extracted from [@ewanc26/noise-avatar](/documentation/noise-avatar). It generates deterministic value-noise pixel data from an arbitrary string seed — same seed always produces the same output. It supports arbitrary canvas dimensions, multi-octave fractal Brownian motion (FBM), and several colour modes. Zero runtime dependencies; works anywhere with a `Uint8ClampedArray` — browsers, Node.js, and workers.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

## Install

```bash
pnpm add @ewanc26/noise
```

Ships as both ESM and CJS with full TypeScript type definitions.

## Usage

### Raw pixels (no DOM required)

```ts
import { generateNoisePixels } from '@ewanc26/noise';

const pixels = generateNoisePixels(256, 256, 'my-seed', {
  octaves: 4,
  colorMode: { type: 'grayscale' },
});
// pixels is a Uint8ClampedArray of RGBA values (256 * 256 * 4 bytes)
```

### Canvas

```ts
import { renderNoise } from '@ewanc26/noise';

const canvas = document.querySelector('canvas');
renderNoise(canvas, 'my-seed', { size: 128, octaves: 3 });
```

### Svelte action

```svelte
<script>
  import { noiseAction } from '@ewanc26/noise';

  let seed = 'my-seed';
</script>

<canvas use:noiseAction={{ seed, size: 128, octaves: 3 }}></canvas>
```

The action re-renders reactively whenever `params` changes.

## API

### `generateNoisePixels(width, height, seed, options?)`

Generates raw RGBA pixel data with no canvas or DOM required. Returns a `Uint8ClampedArray` of length `width * height * 4`.

### `renderNoise(canvas, seed, options?)`

Renders noise onto an existing `HTMLCanvasElement`, resizing it to `width`/`height`/`size` first.

### `noiseAction(canvas, params)`

Svelte action wrapper around `renderNoise`. Params: `{ seed, ...NoiseOptions, width?, height?, size? }`.

## Noise options

| Option | Type | Default | Description |
|---|---|---|---|
| `gridSize` | `number` | `5` | Noise grid resolution |
| `octaves` | `number` | `1` | FBM octave count — 1 = plain value noise |
| `persistence` | `number` | `0.5` | FBM amplitude falloff per octave |
| `lacunarity` | `number` | `2` | FBM frequency multiplier per octave |
| `colorMode` | `ColorMode` | `{ type: 'hsl' }` | How noise values map to colours |

## Render options

| Option | Type | Default | Description |
|---|---|---|---|
| `width` | `number` | `64` | Canvas width in pixels |
| `height` | `number` | `64` | Canvas height in pixels |
| `size` | `number` | — | Shorthand to set width and height equally |

## Colour modes

**`{ type: 'hsl' }`** — hue is derived from the seed, and the noise value shifts hue, saturation, and lightness within configurable ranges.

| Option | Type | Default |
|---|---|---|
| `hueRange` | `number` | `60` |
| `saturationRange` | `[number, number]` | `[45, 70]` |
| `lightnessRange` | `[number, number]` | `[40, 70]` |

**`{ type: 'grayscale' }`** — noise value maps directly to luminance.

| Option | Type | Default |
|---|---|---|
| `range` | `[number, number]` | `[0, 255]` |

**`{ type: 'palette', colors }`** — noise value interpolates smoothly through an ordered list of RGB colours.

```ts
colorMode: {
  type: 'palette',
  colors: [[0, 0, 128], [0, 200, 255], [255, 255, 255]],
}
```

## Core primitives

| Export | Description |
|---|---|
| `hash32(str)` | djb2 hash → unsigned 32-bit integer |
| `makePrng(seed)` | Seeded LCG PRNG → `() => float in [0, 1)` |
| `hslToRgb(h, s, l)` | HSL (components in `[0, 1]`) → RGB triple (`[0, 255]`) |
| `makeValueNoiseSampler(gridSize, rng)` | Returns `(nx, ny) → float in [0, 1]` value-noise sampler |

## Examples

```ts
// Multi-octave FBM with a cool-toned palette
renderNoise(canvas, 'landscape', {
  size: 256,
  octaves: 5,
  persistence: 0.6,
  colorMode: {
    type: 'palette',
    colors: [[10, 10, 60], [30, 80, 160], [180, 220, 255]],
  },
});

// Simple grayscale heightmap, no canvas
const heightmap = generateNoisePixels(512, 512, 'terrain-seed', {
  gridSize: 8,
  octaves: 6,
  colorMode: { type: 'grayscale' },
});
```

## Relation to noise-avatar

[@ewanc26/noise-avatar](/documentation/noise-avatar) is a thin opinionated wrapper around this package. It fixes the colour mode to HSL and defaults to a square 64×64 canvas, so you don't have to think about noise options for the common avatar use-case. Use `@ewanc26/noise` directly when you need non-square dimensions, FBM octaves, or grayscale/palette colour modes.

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
