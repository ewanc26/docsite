---
title: auto-sponsor-links
description: Monthly GitHub Actions workflow that scans your repositories for missing sponsor links and opens pull requests to add them.
date: 2026-08-12
tags: [github-actions, automation, shell, tooling]
draft: false
---

[auto-sponsor-links](https://github.com/ewanc26/auto-sponsor-links) is a monthly GitHub Actions workflow that scans all non-archived, non-fork repositories owned by a given GitHub user or organisation, checks each README for an existing GitHub Sponsors badge, and opens a pull request adding Ko-fi and GitHub Sponsors links to any repository missing one.

## What It Does

1. Scans all non-archived, non-fork repositories owned by the configured account
2. Checks each repository's `README.md` for an existing GitHub Sponsors badge
3. For repositories missing sponsor links:
   - Clones the repository
   - Creates a new branch (`add-sponsor-links`)
   - Appends a `## Support` section with Ko-fi and GitHub Sponsors badges to `README.md`
   - Commits, pushes, and opens a pull request

## Tech Stack

Shell scripting driven by a scheduled GitHub Actions workflow.
