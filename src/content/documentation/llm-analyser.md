---
title: llm-analyser
description: Python tool for analysing .docx files and generating essays using a local Ollama model — now part of the @ewanc26/pkgs monorepo.
date: 2026-02-24
tags: [python, ollama, ai, tools, monorepo]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mfyqfkfxmw25"
---

[llm-analyser](https://github.com/ewanc26/pkgs/tree/main/packages/llm-analyser) is a Python CLI tool that reads all `.docx` files in a given directory and uses a locally-running Ollama model to generate analytical essays for each one. Output essays are saved to a new folder named `<directory>_essays` in the project root.

This tool is now part of the [@ewanc26/pkgs monorepo](/projects/pkgs).

## Setup

Requires Python 3 and [Ollama](https://ollama.com/) running locally.

```bash
# Clone the monorepo
git clone git@github.com:ewanc26/pkgs
cd pkgs/packages/llm-analyser

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create the custom Ollama model from the included `Modelfile`:

```bash
ollama create document-analyser -f ./Modelfile
```

## Usage

```bash
python3 main.py <directory_to_analyse>
```

For example:

```bash
python3 main.py ~/Documents/Literature/Poetry
```

This reads all `.docx` files in `Poetry/` and saves generated essays to `Poetry_essays/` in the project root.

## Customising the Model

Edit the `Modelfile` to change the system prompt, base model, or generation parameters. If you change the `FROM` line, rebuild with `ollama create`.

## Licence

See repository.
