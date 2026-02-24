---
title: atproto-snake
description: Classic Snake with AT Protocol OAuth login and high score saving to your PDS.
date: 2025-02-24
tags: [atproto, sveltekit, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfkzijoyow25"
---

[atproto-snake](https://github.com/ewanc26/atproto-snake) is a browser-based Snake game built with SvelteKit that uses AT Protocol for authentication and saves your high score directly to your PDS.

## How to Play

1. Log in with your AT Protocol handle, app password, and optionally your PDS URL
2. The game starts after a short countdown
3. Use arrow keys to steer the snake; swipe on touch devices
4. Eat food (green squares) to grow and score points
5. Avoid walls and your own tail
6. Scores above zero are automatically submitted to AT Protocol on game over

## Setup

```bash
git clone git@github.com:ewanc26/atproto-snake
cd atproto-snake
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project Structure

- `src/lib/auth/` — AT Protocol authentication logic
- `src/lib/snake/` — Core game logic
- `src/routes/` — Login and game pages
- `src/lib/components/` — Reusable Svelte components
- `static/client-metadata.json` — OAuth client metadata

## Tech Stack

SvelteKit, Tailwind CSS, AT Protocol (`@atproto/api`), Vite.

## Licence

MIT.
