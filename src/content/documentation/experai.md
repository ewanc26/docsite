---
title: experai
description: A small language model training toolkit in Rust using the Candle ML framework, with CUDA/Metal acceleration and AT Protocol training-data ingestion.
date: 2026-08-12
tags: [rust, machine-learning, candle, atproto, cli]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3msv4i3mra22l"
---

[experai](https://github.com/ewanc26/experai) is a small language model training toolkit built in Rust on the [Candle](https://github.com/huggingface/candle) ML framework, with CUDA/Metal acceleration. It can train on local JSONL data or directly on Bluesky content via the AT Protocol — either a specific user's posts through the REST API, or the live Jetstream firehose.

## Features

- **Hardware-aware training** — detects GPU/CPU and auto-tunes batch size, precision, and memory usage
- **AT Protocol integration** — train on data from Bluesky via REST API or real-time Jetstream streaming
- **CLI interface** — `train`, `preprocess`, `generate`, and data-loading commands
- **Mixed precision** — automatic bf16/fp16/fp32 selection based on hardware capabilities

## Installation

```bash
git clone https://github.com/ewanc26/experai.git
cd experai

# CUDA (default, NVIDIA + CUDA toolkit)
cargo build --release

# Metal (Apple Silicon / macOS)
cargo build --release --no-default-features --features metal

# CPU only
cargo build --release --no-default-features
```

The tokenizer file (`models/tokenizer.json`) is required for all commands and must be a HuggingFace `tokenizers`-format JSON file — download the GPT-2 tokenizer with:

```bash
curl -sL "https://huggingface.co/gpt2/resolve/main/tokenizer.json" -o models/tokenizer.json
```

## Usage

```bash
# Train on local data
./target/release/experai train --model gpt2 --data data/training.jsonl --output-dir output --auto-tune

# Train from a Bluesky user's posts
./target/release/experai at-protocol --handle bsky.app --max-samples 1000 --output-dir output --auto-tune

# Train from the live Jetstream firehose
./target/release/experai jetstream-train --auto-tune --max-samples 10000 --output-dir output

# Generate text
./target/release/experai generate --model output --prompt "The future of AI is" --max-tokens 100
```

## Commands

| Command | Description |
|---|---|
| `train` | Train a model on a JSONL dataset |
| `preprocess` | Clean and tokenize raw text data |
| `generate` | Generate text from a trained model |
| `at-protocol` | Load training data from a Bluesky user |
| `jetstream-train` | Stream and train from the AT Protocol firehose |

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/experai/blob/main/LICENSE).
