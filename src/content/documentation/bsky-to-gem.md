---
title: bsky-to-gem
description: Export public Bluesky posts to clean JSON format. No authentication required.
date: 2026-07-21
tags: [python, bluesky, export, json]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udw2n7x2s'
---

[bsky-to-gem](https://github.com/ewanc26/bsky-to-gem) exports public Bluesky posts to clean JSON format. No authentication required.

## What It Does

- Export public posts from any Bluesky handle
- Output timestamped JSON files with post text, images, and alt text
- Use exports for AI training data, personal backups, writing style analysis, or platform migration
- Feed exports into Gemini Custom Gems for personalized AI writing style models

## Setup

```bash
git clone git@github.com:ewanc26/bsky-to-gem
cd bsky-to-gem
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Run:

```bash
python export_posts.py your_handle.bsky.social
```

## Output

Creates timestamped JSON files: `{handle}_posts_YYYYMMDD_HHMMSS.json`

```json
[
  {
    "created_at": "2025-01-15T10:30:45.123Z",
    "text": "Your post content here...",
    "images": [
      {
        "url": "https://cdn.bsky.app/img/feed_fullsize/plain/...",
        "alt_text": "Description of the image"
      }
    ]
  }
]
```

## Licence

MIT.
