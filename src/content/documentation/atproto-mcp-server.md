---
title: atproto-mcp-server
description: AT Protocol Model Context Protocol server for social web interactions.
date: 2026-06-13
tags: [atproto, mcp, typescript]
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mo7b3goqyg2e'
---

# atproto-mcp-server

Modular Model Context Protocol (MCP) server for decentralized social interaction.

## 01. Purpose

Provides an interface for Large Language Models to interact directly with the AT Protocol. Enables identity-aware social actions and data retrieval within agentic workflows.

## 02. Technical Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Protocol**: MCP (Model Context Protocol)
- **SDK**: @atproto/api

## 03. Key Components

- **XRPC Client**: Low-level transport for protocol queries.
- **MCP Tool Registry**: Mapping of ATProto lexicons to LLM-callable tools.
- **Session Manager**: Handling of ephemeral and persistent authentication states.

## 04. Integration

Install as a standard MCP server in supporting environments:

```json
{
	"mcpServers": {
		"atproto": {
			"command": "npx",
			"args": ["-y", "atproto-mcp-server"]
		}
	}
}
```

## 05. System Status

- **Status**: Beta / Active Development
- **Uptime**: N/A (Server-side execution)
