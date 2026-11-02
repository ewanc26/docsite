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
- **CLI interface** — `train`, `preprocess`, `generate`, and data-loading commands, with JSON output for tooling
- **Mixed precision** — bf16, fp16, and f32 precision, with hardware presets choosing a sensible default
- **Memory governance** — monitors CPU, memory, and swap, throttling or pausing training to keep the machine responsive
- **Weight publishing** — uploads safetensors checkpoints to an AT Protocol PDS as `click.croft.experai.weight` records
- **GGUF export** — packages a checkpoint for LM Studio and other GGUF runtimes

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

On macOS the default `cuda` feature will fail to build; use the Metal build instead.

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

# Export a checkpoint to GGUF
./target/release/experai package --checkpoint output --name my-model --dtype q4_0
```

Global options: `experai --support` prints sponsor links; `experai` with no subcommand shows help. `--json` produces machine-readable output (`experai --json` for CLI metadata, `generate --json` for `{"text": "...", "tokens": N}`).

## Commands

| Command | Description |
|---|---|
| `train` | Train a model on a JSONL dataset |
| `preprocess` | Clean and tokenize raw text data |
| `generate` | Generate text from a trained model |
| `at-protocol` | Load training data from a Bluesky user |
| `jetstream-train` | Stream and train from the AT Protocol firehose |
| `package` | Export a checkpoint to GGUF (`f16`, `q8_0`, or `q4_0`) |
| `publish-weight` | Publish weights to an AT Protocol repo |

## Auto-Tuning

`--auto-tune` selects a preset from detected hardware and current CPU load. On an idle machine (<30% CPU) it uses the aggressive preset; under load it uses the conservative one.

| Hardware | Batch size | Grad accum | Seq length | Precision |
|----------|------------|------------|------------|-----------|
| GPU, ≥12 GB VRAM, idle | 64 | 4 | 1024 | bf16 |
| GPU, ≥12 GB VRAM, busy | 32 | 8 | 512 | bf16 |
| GPU, 6–12 GB VRAM, idle | 32 | 4 | 1024 | bf16 |
| GPU, 6–12 GB VRAM, busy | 16 | 8 | 512 | bf16 |
| CPU, ≥16 GB RAM, idle | 32 | 8 | 512 | f32 |
| CPU, ≥16 GB RAM, busy | 16 | 16 | 256 | f32 |
| CPU, minimal or very busy | 4 | 32 | 128 | f32 |

## Memory Governance

The system load monitor samples CPU, memory, and swap so training does not starve the rest of the machine. The default policy is zero tolerance for swap: any swap use throttles training hard (batch scaled to 25%, learning rate halved, precision forced to f32), and swap above 2% or free memory below 2 GB pauses training for two seconds.

| Metric | Warning | Critical | Response |
|--------|---------|----------|----------|
| CPU usage | 50% | 75% | Scale batch 1.0→0.5, LR 1.0→0.7 |
| Memory usage | 60% | 75% | Scale batch 1.0→0.5, LR 1.0→0.7 |
| Swap usage | 0% | 2% | Heavy throttle or pause |
| Free memory | — | < 2 GB | Pause 2 s |

At critical levels batch size drops to 25% and learning rate to 50%. Metrics are smoothed with an exponential moving average (alpha 0.3) to avoid reacting to transient spikes.

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `EXPERAI_DEVICE` | Force device (`cuda:0`, `metal`, `cpu`) | Auto-detect |
| `EXPERAI_LOG_LEVEL` | Log level (`trace`, `debug`, `info`, `warn`, `error`) | `info` |
| `EXPERAI_ATP_PASSWORD` | App password for `publish-weight` | — |
| `EXPERAI_BIN` | Binary used by the opencode and MCP integrations | Auto-resolved |

Training config fields include `max_swap_usage` (default `0.0`), `min_free_mem_mb` (default `2048`), `enable_load_monitoring` (default `true`), `max_cpu_load` (default `0.80`), and `load_check_interval` (default `10`).

## Publishing Weights

After training, `publish-weight` uploads the safetensors checkpoint as one or more blobs (split at 1 MB by default) and writes a `click.croft.experai.weight` record to the authenticated user's repository:

```bash
EXPERAI_ATP_PASSWORD="your-app-password" \
./target/release/experai publish-weight \
  --checkpoint output \
  --handle alice.bsky.social \
  --name "my-finetuned-model" \
  --description "Finetuned on Bluesky posts about machine learning"
```

The password is never printed or logged; use an app password rather than your main account password.

## Agent Integration

The repository ships an opencode plugin, a `/experai` slash command, and an MCP server (`mcp/experai-server.mjs`) exposing the toolkit as tools. The integrations call `./target/release/experai`, falling back to `target/debug/experai` and then `experai` on `PATH`; set `EXPERAI_BIN` to override. Install the MCP server dependencies with `cd mcp && npm install`.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/experai/blob/main/LICENSE).
