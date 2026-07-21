---
title: scripts
description: Personal collection of repository-audit and AT Protocol mutation scripts for self-hosted infrastructure management.
date: 2026-07-21
tags: [scripts, atproto, automation, terraform]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mr6udu2cmx2s'
---

[scripts](https://github.com/ewanc26/scripts) is a personal collection of repository-audit and AT Protocol mutation scripts for managing self-hosted infrastructure.

## Contents

- `check_recent_commits.sh` and `check_repos.sh` — iterate Git repositories under `/Volumes/Storage/Developer/Git/*/` and print history and dates
- `src/lib/atproto.ts` — authenticates an `AtpAgent` using environment credentials
- `sifa-profile.ts` — creates configured skill, project, language, certification, and external-account records on AT Protocol
- `sifa-education.ts` — creates education records
- `delete-duplicates.ts` — lists and unconditionally deletes every record in a supplied collection

## Safety

- Never run mutation scripts as routine validation
- Make dry-run the default and require explicit confirmation
- Treat `education-data.ts` and `sifa-data.ts` as user-controlled factual records

## Validation

```bash
bash -n *.sh
shellcheck *.sh
```

## License

MIT
