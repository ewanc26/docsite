---
title: letta-writer
description: Memory repository for a Letta Code writing and document agent.
date: 2026-06-30
tags: [letta, agent, ai, writing, documentation]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mpht4rexgp27"
---

[letta-writer](https://github.com/ewanc26/letta-writer) is the persistent memory repository for a [Letta](https://letta.com) Code agent specialised in writing and document tasks. It stores the agent's persona, workflow instructions, and skill definitions that shape how the agent thinks and works across sessions.

## Structure

```
system/
├── persona.md          # Who the agent is, voice rules, anti-AI-voice constraints
├── quick-reference.md  # Essentials at a glance
├── doc-style.md        # Formatting conventions per document type
├── workflow.md         # Step-by-step render and review process
└── human/
    └── identity.md     # What the agent knows about the person it works with

skills/
├── doc/          # .docx creation and review
├── word/         # .docx professional suite (redlining, OOXML)
├── xlsx/         # .xlsx spreadsheets (formulas, formatting, analysis)
├── powerpoint/   # .pptx presentations (HTML to PPTX, templates)
└── deslop/       # Post-draft filter — catches AI tells and rewrites them
```

The Letta server syncs changes automatically. Pushing to the GitHub remote backs up the agent memory.

## Licence

AGPL-3.0-only.
