---
title: atproto-mcp-server
description: An archived AT Protocol MCP server for public Bluesky reads and authenticated account actions.
date: 2026-06-13
tags: [atproto, mcp, typescript]
atUri: 'at://did:plc:ofrbh253gwicbkc5nktqepol/site.standard.document/3mo7b3goqyg2e'
---

# atproto-mcp-server

> **Archived:** The GitHub repository is archived, so this server is no longer maintained. The code remains available for reference.

Modular Model Context Protocol (MCP) server for decentralized social interaction.

## 01. Purpose

Provides an interface for Large Language Models to interact directly with the AT Protocol. It supports public reads without credentials and authenticated account actions when Bluesky credentials are configured.

## 02. Technical Stack

- **Runtime**: Node.js 20 or newer
- **Language**: TypeScript
- **Protocol**: MCP over stdio
- **SDKs**: `@modelcontextprotocol/sdk`, `@atproto/lex`, `@bsky/sdk`, `@atproto/lex-password-session`

## 03. Key Components

- **Tool registry**: 16 MCP tools with runtime argument validation, mapped to AT Protocol calls.
- **Session manager**: Optional app-password login, a 30-minute token refresh loop, and a read-only fallback when credentials are absent.
- **AT Protocol client**: `@atproto/lex` client with `@bsky/sdk` helpers for profiles, feeds, posts, follows, and likes.
- **Rich text handling**: `create_post` detects facets before publishing.

## 04. Available Tools

Public tools (no credentials required):

`get_profile`, `resolve_handle`, `search_posts`, `get_author_feed`, `get_post_thread`, `get_suggestions`, `get_actor_likes`, `get_followers`, `get_follows`.

Authenticated tools:

`get_timeline`, `create_post`, `delete_post`, `follow`, `unfollow`, `like`, `unlike`.

Cursor-based tools accept the `cursor` returned by a previous response. Write operations use AT URIs (and, for likes, the target CID) so callers can safely refer to exact records.

## 05. Integration

Requires Node.js 20 or newer.

```bash
npm install
npm run build
npm start
```

The default read-only endpoint is `https://public.api.bsky.app`. To use another service, set `BSKY_SERVICE`. For authenticated tools, set `BSKY_HANDLE` and `BSKY_PASSWORD`; a Bluesky app password is recommended instead of the account password. When credentials are configured, the default service changes to `https://bsky.social`.

Build the project first, then add it to your client's MCP configuration:

```json
{
	"mcpServers": {
		"atproto": {
			"command": "node",
			"args": ["/absolute/path/to/atproto-mcp-server/build/index.js"],
			"env": {
				"BSKY_HANDLE": "alice.bsky.social",
				"BSKY_PASSWORD": "xxxx-xxxx-xxxx-xxxx"
			}
		}
	}
}
```

Omit `env` for read-only use. The server writes logs to stderr, leaving stdout reserved for MCP messages. Run `npm test` to build the project and validate that the advertised tool surface is backed by handlers.

## 06. System Status

- **Status**: Archived on GitHub — no longer maintained
- **Version**: 2.1.0
- **Uptime**: N/A (runs as a local stdio process)

## 07. Trademarks

atproto-mcp-server is an independent project and is not affiliated with or endorsed by Bluesky Social PBC. "AT Protocol", "atproto", and "atprotocol" are trademarks owned by Bluesky Social PBC. Their use in this repository describes the server's compatibility with the AT Protocol.
