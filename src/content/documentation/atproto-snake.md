---
title: atproto-snake
description: Classic Snake with AT Protocol OAuth login and high score saving to your PDS.
date: 2026-04-11
tags: [atproto, sveltekit, game]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfq7cc625"
---

[atproto-snake](https://github.com/ewanc26/atproto-snake) is a browser-based Snake game built with SvelteKit that uses AT Protocol for authentication and saves your high score directly to your PDS. Login is available through browser OAuth (recommended) or an app password.

## How to Play

1. Log in with your AT Protocol handle using OAuth, or switch to the App Password tab and enter your handle and app password
2. The game starts after a three-second countdown
3. Use the arrow keys or WASD to steer the snake; swipe on touch devices; press Space to pause
4. Eat the red food to grow and score points
5. Avoid walls and your own tail
6. On game over, positive scores are written to your PDS as `uk.ewancroft.snake.score` records (best-effort; write failures are logged)

The OAuth flow requests only the `atproto repo:uk.ewancroft.snake.score` scope, so it can write score records but nothing else in your repository.

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

- `src/lib/auth/` — OAuth and app-password authentication logic
- `src/lib/snake/` — Core game logic and canvas renderer
- `src/routes/` — Landing, login, game, and game-over pages
- `src/lib/components/` — Reusable Svelte components
- `static/client-metadata.json` — Production OAuth client metadata
- `static/lexicons/uk/ewancroft/snake/score.json` — Score record lexicon

## Tech Stack

SvelteKit, Tailwind CSS 4, `@atproto/lex`, `@bsky/sdk`, `@atproto/oauth-client-browser`, and Vite. The client-only app builds with `@sveltejs/adapter-vercel` using a Node.js 22 runtime.

## Licence

MIT.
