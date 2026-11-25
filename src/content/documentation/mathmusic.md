---
title: mathmusic
description: A DAW where everything is a graph — music arranged from mathematical curves, with sounds, envelopes, automation and effects all drawn as formulas while you edit.
date: 2026-10-15
tags: [typescript, svelte, audio, daw, music, web-audio, python]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3n33vrnfgtf2v"
---

[mathmusic](https://github.com/ewanc26/mathmusic) is a DAW where everything is a graph. Music is arranged from mathematical curves: each clip plays a curve `y = f(x)`, read left to right as time, with its height mapped to pitch. Sounds, envelopes, automation and effects are formulas too, and every one of them is drawn as a graph while you edit it.

```bash
mathmusic serve            # opens the DAW at http://127.0.0.1:8765
```

## The DAW

- **Arrangement:** tracks of clips on a beat timeline in any time signature from 1/4 to 16/4. Drag clips to move them, including onto another track; drag a clip's right edge to resize it; double-click a lane to add one. Each lane shows its clips' curves, the track's rendered waveform and its automation.
- **Audio clips:** import WAV, MP3, FLAC, OGG, AIFF or M4A, or drop a file onto a lane. Samples are converted to 44.1 kHz stereo and stored once, by content, in `~/.ewanc26/mathmusic/assets`. Clips can be moved, trimmed, split, mixed and faded with a `fade_curve` formula.
- **Recording:** record from your microphone while the project plays; the take lands as an audio clip (decoding needs ffmpeg).
- **Clip editor:** the curve plotted against the scale's pitch lattice, with expression, x range, note count, start/length in beats, rhythm, swing, octave, range, gate, gain, invert and an optional fixed y range.
- **Tracks:** a sound (waveform, instrument or your own formula), an envelope over each note, volume, pan, mute and solo.
- **Effects:** chains on every track and the master — waveshaper, lowpass/highpass biquads, peaking EQ, compressor, feedback delay in beats and a Schroeder reverb, all bypassable and reorderable.
- **Automation:** gain and pan as formulas of the beat, with presets for fades, tremolo, swells and auto-pan; effect parameters can be automated too.
- **Mixer, transport and editing:** channel strips with faders, pan, mute, solo and meters; any track can send to a bus. Play/pause, loop, bar.beat position, zoom, a metronome, undo/redo, copy/paste/duplicate/split/delete.
- **Projects and export:** save and open by name (JSON in `~/.ewanc26/mathmusic/projects`), plus WAV, MP3 and MIDI export, and publishing the mix to plyr.fm.

## Tech stack

TypeScript, Svelte and the Web Audio API in the browser, with a Python backend (`pyproject.toml`) served on `127.0.0.1:8765`.

## Status

Version 0.1.0. The DAW is usable end to end: arrangement, clip editing, effects, automation, mixer, recording, projects and WAV/MP3/MIDI export.

## Licence

AGPL-3.0 — see [LICENSE](https://github.com/ewanc26/mathmusic/blob/main/LICENSE).