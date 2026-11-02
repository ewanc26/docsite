---
title: bean-dumper
description: An early Python experiment — unmaintained and kept for historical interest.
date: 2026-04-11
tags: [python, historical, unmaintained]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfpra3w25"
---

[bean-dumper](https://github.com/ewanc26/bean-dumper) is an early Python learning project, kept for historical interest. It is not maintained and not intended for use.

The script is Windows-only. It copies the repository's bundled `beans.jpg` to the root of every available drive, overwriting any existing `beans.jpg`. It was written as a practice exercise for `pywin32` and file system operations. Run it with Python 3 and `pywin32`:

```bash
pip install pywin32
python bean-windows.py
```

## Status

Unmaintained. Windows-only. Overwrites `beans.jpg` on every mounted drive — not recommended for any practical purpose.

## Licence

Public domain under the Unlicense — see `LICENSE`.
