---
title: shut
description: A Bluesky labeller that hides incel language from the people who subscribe to it.
date: 2026-11-25
tags: [atproto, bluesky, moderation, typescript]
draft: false
---

[shut](https://github.com/ewanc26/shut) is a Bluesky labeller for incel language. It watches new posts and profile edits and labels the ones using that vocabulary with `incel-language`. Subscribers have labelled content hidden by default, and can change the setting to warn or show it.

To use it, open [@shut.croft.click](https://bsky.app/profile/shut.croft.click) on Bluesky and subscribe to the labeller. Labelling started on 25 November 2026; earlier posts are not covered. The website is at [shut.croft.click](https://shut.croft.click).

## What gets labelled

It reads post text, hashtags, image and video descriptions, link cards, display names and bios. Common disguises, such as lookalike characters and spaced-out letters, are undone before matching.

One distinctive term is enough for a label. Words with everyday meanings only count when two different kinds appear together.

## Limits

- It matches words, not meaning, so news, criticism and quotes that repeat the terms are labelled too.
- Slang that has spread into everyday use is labelled as well.
- New slang, coded phrasing and the same ideas in ordinary words get through.
- It is mostly English, cannot read text inside images, and does not label older posts.

## Try it

```sh
git clone https://github.com/ewanc26/shut.git
cd shut
pnpm install
pnpm judge "some text"
pnpm sample 60
```

`judge` shows how one piece of text is judged. `sample` prints matches from live posts for a number of seconds. Neither needs an account or publishes labels. Sample output quotes real people, so don't share it.

## Running a labeller

You need a separate Bluesky account and a public HTTPS address that allows WebSockets. The [README](https://github.com/ewanc26/shut#go-live) has the steps.

## Project structure

- `labeller/` — text matching, label storage and the label server
- `website/` — a static SvelteKit page with a try-it box that runs the same matching code in the browser

## Licence

MIT.
