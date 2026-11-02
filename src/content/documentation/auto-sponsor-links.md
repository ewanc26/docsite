---
title: auto-sponsor-links
description: Monthly GitHub Actions workflow that scans your public repositories for missing sponsor links and opens pull requests to add them.
date: 2026-08-12
tags: [github-actions, automation, shell, tooling]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3msv4i3vsc22l"
---

[auto-sponsor-links](https://github.com/ewanc26/auto-sponsor-links) is a monthly GitHub Actions workflow that scans all public, non-archived, non-fork repositories owned by a given GitHub user or organisation, checks each README for a link to the configured account's GitHub Sponsors page, and opens a pull request adding Ko-fi and GitHub Sponsors links to any repository missing one.

## What It Does

1. Scans all public, non-archived, non-fork repositories owned by the configured account
2. Checks each repository's `README.md` for `github.com/sponsors/<TARGET_USER>`
3. For repositories missing sponsor links:
   - Clones the repository
   - Creates a new branch (`add-sponsor-links`)
   - Appends a `## Support` section with Ko-fi and GitHub Sponsors badges to `README.md`
   - Commits, pushes, and opens a pull request

## Configuration

- `TARGET_USER` selects the account to scan and defaults to `ewanc26`.
- `SPONSOR_LINKS_TOKEN` is a personal access token with contents and pull-request write access to the target repositories. The workflow falls back to `GITHUB_TOKEN`, which only has access to the workflow repository.
- The workflow runs monthly on a schedule and can also be started manually with `workflow_dispatch`.

## Tech Stack

Shell scripting driven by a scheduled GitHub Actions workflow.
