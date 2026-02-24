---
title: bluesky-gradient
description: Generate 24 sky-gradient images (one per hour) for use as Bluesky avatars or banners.
date: 2025-02-24
tags: [python, bluesky, image-generation, tools]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfkzihpod625"
---

[bluesky-gradient](https://github.com/ewanc26/bluesky-gradient) is a Python image generation script that produces a set of 24 gradient images — one for each hour of the day — based on configurable sky colours. Each image fades from the hour's sky colour to a monochrome shade derived from the average RGB value, with a text overlay of your project name. Designed as a companion to [bluesky-avatar-updater](./bluesky-avatar-updater), it was also inspired by [@dame.is](https://bsky.app/profile/dame.is)'s dynamic avatar post.

## Usage

```bash
pip install -r requirements.txt

# Generate banner images (1500×500)
python src/generator.py --banner

# Generate profile images (400×400)
python src/generator.py --profile

# Generate custom size
python src/generator.py --custom -w 800 -H 400
```

Images are saved to `./src/banners/`, `./src/profile_pics/`, or `./src/custom_WxH/` and named `00.png` through `23.png`. Existing images are not overwritten.

## Configuration

Edit `./config/generation.json` to set the sky colour for each hour and the overlay text:

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

The script interpolates smoothly between defined hours. A custom font is expected at `./config/fonts/madecarvingsoft.ttf` — update the path in the script if needed.

## Requirements

Python 3, `numpy`, `Pillow`.

## Licence

MIT.
