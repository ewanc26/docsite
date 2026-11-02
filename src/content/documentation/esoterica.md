---
title: esoterica
description: A modular, high-performance Rust framework for generating constructed languages (conlangs).
date: 2026-06-16
tags: [rust, conlang, language, generator]
draft: false
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mogr5menqi2f'
---

[esoterica](https://github.com/ewanc26/esoterica) is a modular, high-performance Rust framework for generating constructed languages (conlangs). It allows users to create consistent languages by composing independent linguistic components: phonology, morphology, syntax, sound changes, semantic drift, and orthography. The core engine is available through the CLI, the interactive TUI, and a WebAssembly build, with a Svelte 5 web interface in the repository.

## Features

- **Component-based Generation**: Dynamically mix-and-match phonological, morphological, syntactic, sound-change, and semantic-drift profiles to create diverse languages.
- **Rule-based Synthesis**:
  - **Phonology Engine**: Generates syllables based on custom phonotactic patterns (e.g., `C(C)V(C)`) with support for tone (up to nine levels) and vowel harmony.
  - **Morphology Engine**: Supports affixation, infixation, circumfixal profiles, reduplication, noun classes, and non-concatenative root-and-pattern templates.
  - **Sound Change Engine**: Simulates diachronic phonological shifts using named rule sets in formal notation (`p > b / V_V`, `n > ∅ / _#`).
  - **Semantic Drift Engine**: Applies probabilistic meaning change — broadening, narrowing, amelioration, pejoration, metaphor, metonymy, and taboo replacement.
  - **Orthography Engine**: Generates scripts as alphabets, abjads, abugidas, syllabaries, or logographies, with angular, curved, minimal, or ornate glyphs.
- **CLI Interface**: Generate complete language packages directly from the command line.
- **Interactive TUI**: Real-time conlang generation and configuration, with a phonology designer, config selector, lexicon browser, and save support.
- **WASM**: The core generation engine compiles to WebAssembly.
- **Web UI**: A Svelte 5 front end with phonology designer, lexicon browser, and sound-change editor.
- **Collaborative Editing**: An AT Protocol-oriented change model for shared lexicons, including merge-conflict detection.
- **ATProto Publication**: Publish generated lexicons directly to the ATProto network using `site.standard.document` schemas.

## Quick Start

1. **Build the project:**

   ```bash
   cargo build --release
   ```

2. **Run in Interactive TUI Mode:**

   ```bash
   cargo run --release -- --interactive
   ```

   _Navigate with `Tab`, input configurations, and press `Enter` to generate. `l` browses the lexicon, `s` saves it to `esoterica_out/`, and `p` opens the phonology designer._

3. **Generate via CLI:**
   ```bash
   cargo run --release -- \
     --phonology uralic_finnic \
     --morphology agglutinative \
     --syntax sov \
     --sound-change lenition,rhotacism \
     --syllables 3 \
     --drift-steps 3 \
     --generate-orthography \
     --output my_language.json
   ```

## Web UI and WASM

The web interface in `web/` is built with Svelte 5 and Vite and has three tabs: Phonology Designer, Lexicon Browser, and Sound Changes. It depends on the `esoterica-wasm` package, so build the WebAssembly bindings first:

```bash
wasm-pack build --features wasm --no-default-features
cd web && npm install && npm run dev
```

The WASM bindings expose word and lexicon generation, semantic drift, orthography, sentence generation, sound-change parsing, presets, and catalogue-based generation.

## Orthography and Semantic Drift

`--generate-orthography` writes a script alongside the lexicon (for example, `my_language_orthography.json`). Select the script with `--script-type alphabet|abjad|abugida|syllabary|logography` and the glyph style with `--glyph-style angular|curved|minimal|ornate`.

`--drift-steps <n>` runs the semantic drift engine over the generated lexicon; `--drift-rate` sets the per-word, per-step probability (default `0.15`). Drift can also be applied through the WASM binding.

## Custom Catalogues

Pass `--data-dir <dir>` to layer your own `phonologies.toml`, `morphologies.toml`, `syntaxes.toml`, or `sound_changes.toml` over the built-in catalogues. Any of the four files may be omitted; entries with the same key replace the built-in entry, and every entry is validated before generation, with errors naming the key and file.

```bash
cargo run --release -- --data-dir ./my_catalogues -p my_language -m agglutinative -x sov
```

The built-in catalogue contains 97 hand-written phoneme inventories plus 248 generated Glottolog representatives, one per family or isolate with a PHOIBLE inventory. Inventories are stylised design aids rather than authoritative descriptions of the languages they are named after.

## ATProto Publication

To publish your generated lexicon to ATProto, you need to use an **App Password** (not your main account password).

1. Get an App Password: https://bsky.app/settings/app-passwords
2. Configure the following environment variables:
   ```bash
   export ATPROTO_HANDLE="your-handle.bsky.social"
   export ATPROTO_PASSWORD="your-app-password"
   ```
3. Run the generator with the publication flag:
   ```bash
   cargo run --release -- \
     --phonology uralic_finnic \
     --morphology agglutinative \
     --syntax svo \
     --publish-title "My New Language" \
     --publication-uri "at://did:plc:.../site.standard.publication/..."
   ```

## Project Structure

- `src/main.rs`: CLI and orchestration logic
- `src/args.rs`: CLI argument definitions
- `src/lib.rs`: Library root
- `src/pipeline.rs`: Shared registry and generation pipeline used by the CLI, TUI, and embedders
- `src/archetypes.rs`: Registry of linguistic components
- `src/phonology.rs`: Syllable and word generation engine
- `src/morphology.rs`: Morphological transformation engine
- `src/sound_change.rs`: Rule parser and diachronic sound-change simulation
- `src/semantic_drift.rs`: Probabilistic meaning change
- `src/orthography.rs`: Script and glyph generation
- `src/syntax.rs`: Word order, case alignment, and adposition handling
- `src/lexicon.rs`: Dictionary generation
- `src/lexicon_structs.rs`: Lexicon data structures
- `src/collaborative.rs`: Collaborative change log and conflict detection
- `src/tui/`: Ratatui interface, including the phonology designer
- `src/wasm.rs`: WebAssembly bindings
- `src/atproto.rs`: ATProto publishing logic
- `data/`: Phonology, morphology, syntax, and sound-change catalogues
- `web/`: Svelte 5 web interface

## Licence

MIT License — see repository.
