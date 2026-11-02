---
title: ECCL
description: A .NET 8 VB.NET Windows Forms prototype simulating a PC-component ordering and checkout flow for a fictional retailer, "Eye Crash Computers Ltd."
date: 2026-07-30
tags: [vb.net, winforms, dotnet, prototype, desktop]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjrspnwm2f"
---

[ECCL](https://github.com/ewanc26/ECCL) is a small Windows Forms desktop prototype for "Eye Crash Computers Ltd.", a fictional PC retailer — the name is a play on "I crash," a joke about computer crashes. It's a three-screen demonstration of a PC-building and checkout flow: log in, configure a custom build, then review an invoice. It was built as coursework for the OCR Cambridge Technicals in Information Technology qualification and published as-is. It's a practice/portfolio project, not production software — there is no real authentication, persistence, or payment processing anywhere in it.

## Flow

**Login** — Three hard-coded demo accounts (`user1`/`pass1`, `user2`/`pass2`, `user3`/`pass3`) with a masked password field and non-empty input validation. Each account maps to a different fictional customer record.

**Component selection** — Six priced categories (Motherboard, Power Supply Unit, Hard Disk Drive, Solid State Drive, Case, RAM), each a group of radio buttons with a live-updating subtotal and a product image that swaps per selection. Every price is a fixed `Const` in `Form2.vb`; there is no database or pricing service.

**Invoice** — Maps the logged-in user to a hard-coded demo customer record (name and UK address), itemises the chosen build, and calculates VAT (20%) and a deposit (10% of the VAT-inclusive total). A "Pay" button shows a confirmation dialog for the mock deposit; nothing is actually charged or persisted.

## Pricing

| Category | Options (£) |
| --- | --- |
| Motherboard | AMD 150 · Intel 90 |
| Power supply | 400 W 25 · 600 W 30 · 800 W 45 |
| Hard disk drive | 1 TB 55 · 2 TB 100 · 4 TB 170 |
| Solid state drive | 256 GB 55 · 512 GB 90 |
| Case | Desktop 80 · Tower 150 · Gaming 200 |
| Memory | 4 GB 30 · 8 GB 60 · 16 GB 100 |

The subtotal is the sum of the six selections; the invoice then adds VAT and quotes the deposit.

## Tech Stack

VB.NET / Windows Forms targeting `net8.0-windows`, with no external dependencies and no database — every account, price, and customer record is an in-memory hard-coded value. Windows-only; you need Windows 11, Visual Studio 2022 (17.x) with the **.NET desktop development** workload, and the .NET 8 SDK. Build and run with:

```bash
dotnet build ECCL.sln --configuration Release
dotnet run --project ECCL.vbproj --configuration Release
```

## Status

Prototype/demonstration only, not under active development. Login credentials and customer data are placeholder demo data, not real auth; the `QR` postcode area is fictional. There is a known lifetime quirk where the invoice screen is shown without closing the component-selection screen first, and a couple of product images use resource names that don't match their visible labels.

## Licence

AGPL-3.0. See [LICENSE](https://github.com/ewanc26/ECCL/blob/main/LICENSE). This is an unofficial student project, not affiliated with or endorsed by OCR.
