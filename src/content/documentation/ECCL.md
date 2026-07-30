---
title: ECCL
description: A .NET 8 VB.NET Windows Forms prototype simulating a PC-component ordering and checkout flow for a fictional retailer, "Eye Crash Computers Ltd."
date: 2026-07-30
tags: [vb.net, winforms, dotnet, prototype, desktop]
draft: false
atUri: "at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mrvjrspnwm2f"
---

[ECCL](https://github.com/ewanc26/ECCL) is a small Windows Forms desktop prototype for "Eye Crash Computers Ltd.", a fictional PC retailer — the name is a play on "I crash," a joke about computer crashes. It's a three-screen demonstration of a PC-building and checkout flow: log in, configure a custom build, then review an invoice. It's a practice/portfolio project, not production software — there is no real authentication, persistence, or payment processing anywhere in it.

## Flow

**Login** — Three hard-coded demo accounts (`user1`/`pass1`, `user2`/`pass2`, `user3`/`pass3`) with a masked password field and non-empty input validation.

**Component selection** — Six priced categories (Motherboard, Power Supply Unit, Hard Disk Drive, Solid State Drive, Case, RAM), each a group of radio buttons with a live-updating subtotal and a product image that swaps per selection.

**Invoice** — Maps the logged-in user to a hard-coded demo customer record (name and UK address), itemises the chosen build, and calculates VAT (20%) and a deposit (10% of the VAT-inclusive total). A "Pay" button shows a confirmation dialog for the mock deposit; nothing is actually charged or persisted.

## Tech Stack

VB.NET / Windows Forms targeting `net8.0-windows`, with no external dependencies and no database — every account, price, and customer record is an in-memory hard-coded value. Windows-only; build with:

```bash
dotnet build ECCL.sln --configuration Release
```

## Status

Prototype/demonstration only, not under active development. Login credentials and customer data are placeholder demo data, not real auth. There is a known lifetime quirk where the invoice screen is shown without closing the component-selection screen first, and a couple of product images use resource names that don't match their visible labels.

## Licence

See repository.
