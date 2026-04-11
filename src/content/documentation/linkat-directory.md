---
title: linkat-directory
description: An alternate SvelteKit frontend for Linkat showing a curated directory of AT Protocol user profiles. Unmaintained.
date: 2026-04-11
tags: [atproto, sveltekit, linkat, unmaintained]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfkzgog25"
---

[linkat-directory](https://github.com/ewanc26/linkat-directory) is a SvelteKit application that renders a curated directory of [Linkat](https://linkat.blue) user profiles. It fetches profile data — DID, handle, display name, avatar, description, and links — from AT Protocol and displays them as cards.

## Status

Unmaintained.

## Setup

```bash
git clone git@github.com:ewanc26/linkat-directory
cd linkat-directory
npm install
```

Create a `.env` file:

```env
# Single owner
DIRECTORY_OWNER=did:plc:your-did-here

# Or multiple users
PUBLIC_LINKAT_USERS=did:plc:user1,did:web:user2

# Optional display flags
HIDE_OWNER_CARD=true
DISPLAY_USER_BANNER=true
DISPLAY_USER_DESCRIPTION=true
```

Run:

```bash
npm run dev
```

User profiles are accessible at `/user/[did]`. The `PUBLIC_ORIGIN` environment variable sets the prerender origin (defaults to `http://localhost:5713`).

## Tech Stack

SvelteKit, AT Protocol, Tailwind CSS.

## Credits

Uses data from [linkat.blue](https://linkat.blue) by mkizka.dev.

## Licence

AGPLv3.
