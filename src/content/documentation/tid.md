---
title: "@ewanc26/tid"
description: Zero-dependency, spec-compliant AT Protocol TID generation for Node.js and browsers.
date: 2026-03-04
tags: [atproto, typescript, library, malachite, tools, pkgs]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mgayldp4nc25"
---

[@ewanc26/tid](https://github.com/ewanc26/pkgs/tree/main/packages/tid) is a tiny TypeScript library for generating, validating, decoding, and comparing AT Protocol TIDs (Timestamp Identifiers). It has no runtime dependencies, ships with type definitions, and works in Node.js 20+, Deno, Bun, and modern browsers via the Web Crypto API.

Part of the [`@ewanc26/pkgs`](/projects/pkgs) monorepo.

TIDs are 13-character, lexicographically sortable record keys used across the AT Protocol and Bluesky. They encode a microsecond-precision Unix timestamp and a 5-bit clock ID. Within a JS context, the library guarantees monotonicity — if records arrive out of order, the clock is bumped forward so every generated TID is strictly increasing.

## Install

```bash
npm install @ewanc26/tid
# or
pnpm add @ewanc26/tid
```

## Usage

### Generate a TID

```ts
import { generateTID, generateNextTID } from '@ewanc26/tid';

// From a historical timestamp (ISO string or Date)
const tid = generateTID('2023-11-01T12:00:00Z');
const tid2 = generateTID(new Date('2024-03-15T09:30:00Z'));

// For the current wall-clock time
const currentTid = generateNextTID();
```

### Validate

```ts
import { validateTid } from '@ewanc26/tid';

validateTid('3jzfcijpj2z2a'); // true
validateTid('not-a-tid');     // false
```

### Decode

```ts
import { decodeTid } from '@ewanc26/tid';

const { timestampUs, clockId, date } = decodeTid('3jzfcijpj2z2a');
// timestampUs — microseconds since Unix epoch
// clockId     — 0–31
// date        — millisecond-precision Date object
```

### Sort

```ts
import { compareTids } from '@ewanc26/tid';

const tids = ['3jzfcijpj2z2a', '3jzfabc000022', '3jzfzzzzzzz2a'];
tids.sort(compareTids);
```

### CommonJS

```js
const { generateTID, validateTid } = require('@ewanc26/tid');
```

## API

| Export | Signature | Description |
|---|---|---|
| `generateTID` | `(source: string \| Date) => string` | Generate a TID for a historical timestamp |
| `generateNextTID` | `() => string` | Generate a TID for the current wall-clock time |
| `validateTid` | `(tid: string) => boolean` | Returns `true` if the string is a well-formed TID |
| `decodeTid` | `(tid: string) => DecodedTid` | Decode a TID into its timestamp, clockId, and Date |
| `compareTids` | `(a: string, b: string) => -1 \| 0 \| 1` | Lexicographic comparator for sorting |
| `resetTidClock` | `() => void` | Reset the monotonic clock (**tests only**) |

### `DecodedTid`

```ts
interface DecodedTid {
  timestampUs: number; // microseconds since Unix epoch
  clockId: number;     // 0–31
  date: Date;          // millisecond-precision equivalent
}
```

## Spec notes

- TIDs use a custom AT Protocol base-32 alphabet: `234567abcdefghijklmnopqrstuvwxyz`.
- The first 11 characters encode a microsecond-precision Unix timestamp; the last 2 encode a 5-bit clock ID (0–31).
- The clock ID is randomised once at module load (per JS context). When multiple TIDs would land on the same microsecond the implementation nudges the timestamp forward rather than the clock ID, preserving lexicographic monotonicity.
- Full specification: [atproto.com/specs/tid](https://atproto.com/specs/tid).

## Behavioural notes

- Monotonicity is per-JS-context only. Records generated in different processes or machines may collide within the same microsecond, which is why the 5-bit clock ID exists.
- The package does not coordinate across processes. If you need globally unique sequencing beyond the spec, combine TIDs with a per-host identifier or use a server-side sequencer.

## Licence

AGPL-3.0-only — see the [pkgs monorepo](https://github.com/ewanc26/pkgs).
