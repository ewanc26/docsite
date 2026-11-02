---
title: bluesky-gradient
description: Generate 24 sky-gradient images (one per hour) for use as Bluesky avatars or banners. Written in Rust; unmaintained.
date: 2026-04-11
tags: [rust, bluesky, image-generation, tools, unmaintained]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfon4t625"
---

[bluesky-gradient](https://github.com/ewanc26/bluesky-gradient) is a Rust tool that produces a set of 24 gradient images — one for each hour of the day — from configurable sky colours. Each image fades from the hour's sky colour to a monochrome shade derived from the average RGB value, with a text overlay in an automatically contrasted colour. A subtle noise pass adds grain. It can generate profile pictures (400×400), banners (1500×500), or custom sizes. It was originally inspired by [@dame.is](https://bsky.app/profile/dame.is)'s post on building an automated dynamic avatar.

## Status

Unmaintained — the repository carries a "No Maintenance Intended" badge.

## Setup

Requires Rust 1.85+ and Cargo.

```bash
git clone https://github.com/ewanc26/bluesky-gradient.git
cd bluesky-gradient
cargo build --release
```

## Usage

```bash
# Generate banner images (1500×500)
cargo run --release -- --banner

# Generate profile images (400×400)
cargo run --release -- --profile

# Generate custom size
cargo run --release -- --custom --width 800 --height 600
```

Images are saved to `./src/banners/`, `./src/profile_pics/`, or `./src/custom_WxH/` and named `00.png` through `23.png`. Each run creates a new folder, appending `_1`, `_2`, and so on if the base folder already exists; existing image files are skipped.

## Configuration

Create `./config/generation.json` (it is not checked in and is ignored by git) with the sky colour for key hours and the overlay text:

```json
{
  "sky_colours": {
    "0":  [10, 10, 40],
    "6":  [100, 80, 150],
    "12": [70, 130, 180],
    "18": [255, 165, 0],
    "23": [10, 10, 40]
  },
  "name": "Your Project Name"
}
```

The generator interpolates smoothly between the defined hours. The font is included at `./config/fonts/madecarvingsoft.ttf`, and that path is hardcoded in `src/main.rs`.

## Requirements

Rust 1.85+; dependencies are declared in `Cargo.toml`.

## Licence

MIT.
