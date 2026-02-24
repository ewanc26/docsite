---
title: text-to-pixel-image
description: A Python script that converts a string of text into a pixel art image with per-character colours. Unmaintained.
date: 2026-02-24
tags: [python, image-generation, historical, unmaintained]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfkzia22x625"
---

[text-to-pixel-image](https://github.com/ewanc26/text-to-pixel-image) is a small Python script that takes a text string and renders each character as a coloured square in a grid, producing a pixel art image. Colours are assigned from a pre-generated `sorted_chars.json` mapping; a companion `colour generator.py` script creates a new colour set if needed.

## Status

Unmaintained.

## Usage

1. Ensure `sorted_chars.json` is in the same directory as `main.py` (run `colour generator.py` to generate it if missing)
2. Run: `python main.py`
3. Enter the desired output width and height in pixels
4. Enter the text string to convert
5. The result is saved as `output.png`

## Requirements

Python 3, Pillow (`pip install Pillow`).

## Licence

See repository.
