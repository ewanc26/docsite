---
title: SMB.C
description: A native C port of the original NES Super Mario Bros., translated routine by routine from its disassembly and playable through an SDL2 frontend.
date: 2026-11-02
tags: [c, nes, super-mario-bros, game, port, sdl2]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mzdpjzkbaz2b"
---

[SMB.C](https://github.com/ewanc26/smbc) is a native C port of the original NES *Super Mario Bros.*, translated routine by routine from its disassembly. The goal is to run the game as a normal native program on supported hosts — not to emulate a NES console and not to require a ROM at runtime.

The port aims to preserve the original's graphics, audio, timing, physics, collision behaviour, glitches and moment-to-moment gameplay. The original assembly disassembly, `smb.asm` (doppelganger's `SMBDIS.ASM`, x816 syntax), is the reference source and stays unmodified in the repository root. Every translated routine cites the assembly label it came from. Fidelity takes priority over redesign: the default experience should look and play like the original NES release.

## Status

The reset and NMI spine is translated and tested: boot, the interrupt handler, joypad reading, pause, timers, the pseudorandom register, sprite housekeeping, the VRAM buffer writer and name-table initialisation. The game-setup tasks, the status-bar writer and digit arithmetic, and the ROM-backed VRAM update sets are in, with the CHR pattern tables embedded. The PPU model decodes the donor cartridge's name-table mirroring and models palette-region `$2007` reads.

A playable SDL2 frontend lives in `src/host/`. It presents the PPU renderer's 256×240 frame at integer scale with nearest-neighbour sampling, maps keyboard and SDL_GameController input onto the NES joypad, and paces the deterministic core at the NTSC frame rate with fixed steps. The audio device is opened with the pull contract the APU synthesis will feed; it runs silent until then. `--headless N` runs the core without any device.

The GameMode tree is in progress. `GameEngine` runs its full object pass each frame: fireballs and bubbles, the enemy and floatey-number loop, player graphics, block objects, misc objects, cannons, whirlpools, the flagpole, the game timer, colour rotation and palette cycling. The `GameRoutines` tree covers area entrance setup, pipes and vines, the flagpole slide and end-of-level walk, the lose-life, death, injury-blink, size-change and fire-flower sequences, and `ScrollHandler`. The player physics core is in, including movement, `PlayerPhysicsSub`, head-bump block routines, `PlayerBGCollision` and pipe entry. The title screen's task tree and the victory mode tree run end to end, and there are no port TODOs left in `src/`.

What remains open is hardware fidelity (APU synthesis, issues #31–#39) and the modding roadmap (#11 onward).

## Building

```bash
make
```

Requires a C23 compiler (`cc`, clang or gcc) and SDL2 for the frontend (`brew install sdl2` on macOS). The build is warnings-as-errors.

Run `./build/smbc` to play; the window opens straight into the game.

| Input | Key |
|---|---|
| Move / jump | Arrows / X |
| Run / fire | Z |
| Start | Return |
| Select | Right Shift |
| Quit | Escape |

A connected SDL_GameController mirrors the same buttons. Flags:

- `--scale N` — integer window scale, 1–8, default 3
- `--headless N` — run N frames with no window, for CI and debugging
- `--record PATH` — capture frame-indexed inputs and post-frame state hashes while playing
- `--play PATH [N]` — replay a recording headlessly; a clean run prints the frame count, and a divergence reports the first mismatching frame and both hashes

Recordings are deterministic: the same inputs from a fresh reset always reproduce the same state, hash-checked every frame.

## Testing

```bash
make test
```

The suite builds and runs with no SDL dependency; the core stays headless and all OS I/O lives in `src/host/`. Host-side tests mirror the `src/` scope layout and need no display or audio device.

CI runs on push and pull request: the core suite on Ubuntu (gcc-14 and clang) and macOS (Apple clang), an AddressSanitizer + UndefinedBehaviorSanitizer job, and an SDL2 frontend build with a `--headless 60` smoke run. All jobs keep the warnings-as-errors policy. Reproduce the sanitizer job locally:

```bash
make test CFLAGS="-O1 -g -fsanitize=address,undefined -fno-omit-frame-pointer"
```

The sanitizer job covers the headless suite only; the SDL2 frontend is built but not run under sanitizers in CI.

## Layout

```text
src/
  hw/     NES hardware model — PPU, APU, joypad registers, renderer
  core/   RAM map, game state, frame loop
  data/   tables translated verbatim from the disassembly
  host/   SDL2 frontend — video, input, audio seam, entry point
tests/    host unit tests, mirrors src/ scopes
```

The core is portable C23: no OS or I/O calls, fixed-width integer types, no floating point and no dynamic allocation. Platform contact happens only in `main.c` and the host frontend, so a new platform means a new frontend, never a change to `core`, `hw` or `data`.

## Notes

`smb.asm` is doppelganger's disassembly, sourced from [this gist](https://gist.github.com/1wErt3r/4048722) and provided as-is. It is not original work and is not covered by this project's licence. The character ROM data and an iNES header are required to assemble the original — and the game itself remains Nintendo's.

Licence: AGPL-3.0-only.
