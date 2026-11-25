#!/usr/bin/env node
/**
 * Delete ATProto site.standard.document records whose source markdown files no
 * longer exist, then prune those entries from .sequoia-state.json.
 *
 * Sequoia has no delete command, so this talks to the PDS directly using the
 * same OAuth session (and DPoP key) that `sequoia publish` uses.
 *
 * Usage:
 *   node scripts/sync-atproto-deletes.mjs --dry-run
 *   node scripts/sync-atproto-deletes.mjs            # asks for confirmation
 *   node scripts/sync-atproto-deletes.mjs --yes      # no confirmation
 *
 * If the stored OAuth token has expired, run `npx sequoia login` first.
 */

import { createHash, createPrivateKey, randomUUID, sign } from 'node:crypto';
import { existsSync } from 'node:fs';
import { chmod, readFile, rename, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const STATE_PATH = path.join(PROJECT_ROOT, '.sequoia-state.json');
const CONFIG_PATH = path.join(PROJECT_ROOT, 'sequoia.json');
const OAUTH_PATH = path.join(os.homedir(), '.config', 'sequoia', 'oauth.json');
const COLLECTION = 'site.standard.document';
const DELETE_ENDPOINT = 'com.atproto.repo.deleteRecord';

// Keep in sync with sequoia-cli's OAuth client metadata.
const CALLBACK_URL = 'http://127.0.0.1:4000/oauth/callback';
const OAUTH_SCOPE =
	'atproto repo:site.standard.document repo:site.standard.publication repo:app.bsky.feed.post blob:*/*';

const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run') || argv.includes('-n');
const assumeYes = argv.includes('--yes') || argv.includes('-y');
const verbose = argv.includes('--verbose') || argv.includes('-v');
const pdsArg = argv.find((arg) => arg.startsWith('--pds='));
const pdsOverride = pdsArg ? pdsArg.slice('--pds='.length).replace(/\/$/, '') : undefined;
const rkeyFilters = argv.filter((arg) => arg.startsWith('--rkey=')).map((arg) => arg.slice(7));

if (argv.includes('--help') || argv.includes('-h')) {
	console.log(`Usage: node scripts/sync-atproto-deletes.mjs [options]

Options:
  -n, --dry-run   List records that would be deleted, change nothing
  -y, --yes       Skip the confirmation prompt
  -v, --verbose   Also list records that are still backed by a local file
  --pds=<url>     Override the PDS URL from the OAuth session
  --rkey=<rkey>   Only delete this record (repeatable)
  -h, --help      Show this help`);
	process.exit(0);
}

const base64url = (value) => Buffer.from(value).toString('base64url');
const sha256b64url = (value) => base64url(createHash('sha256').update(value).digest());
const stripQuery = (url) => url.split('#')[0].split('?')[0];

async function readJson(filePath) {
	return JSON.parse(await readFile(filePath, 'utf8'));
}

async function writeJson(filePath, value, mode) {
	const tempPath = `${filePath}.${process.pid}.tmp`;
	await writeFile(tempPath, `${JSON.stringify(value, null, 2)}\n`, { mode });
	await rename(tempPath, filePath);
	if (mode !== undefined) await chmod(filePath, mode);
}

function parseAtUri(uri) {
	const match = /^at:\/\/([^/]+)\/([^/]+)\/([^/]+)$/.exec(uri ?? '');
	if (!match) throw new Error(`Malformed AT-URI: ${uri}`);
	return { did: match[1], collection: match[2], rkey: match[3] };
}

/** Build an ES256K DPoP proof JWT with the CLI's stored secp256k1 key. */
function buildDpopProof(signingKey, jwk, { htm, htu, ath, nonce }) {
	const header = {
		alg: 'ES256K',
		typ: 'dpop+jwt',
		jwk: { kty: jwk.kty, crv: jwk.crv, x: jwk.x, y: jwk.y }
	};
	const payload = { iat: Math.floor(Date.now() / 1000), jti: randomUUID(), htm, htu };
	if (ath) payload.ath = ath;
	if (nonce) payload.nonce = nonce;

	const input = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
	const signature = sign('sha256', Buffer.from(input), {
		key: signingKey,
		dsaEncoding: 'ieee-p1363'
	});
	return `${input}.${base64url(signature)}`;
}

/**
 * Fetch with a DPoP proof. Retries once if the server sends a fresh nonce.
 * `ath` is included only when an Authorization: DPoP header is present.
 */
async function dpopFetch(url, init, { signingKey, jwk, accessToken, nonces }) {
	const htm = (init.method ?? 'GET').toUpperCase();
	const htu = stripQuery(url);
	const origin = new URL(url).origin;
	const authScheme = init.authScheme ?? 'DPoP';
	const ath =
		accessToken && authScheme.toLowerCase() === 'dpop' ? sha256b64url(accessToken) : undefined;
	const buildHeaders = (nonce) => {
		const headers = new Headers(init.headers);
		if (accessToken) headers.set('Authorization', `${authScheme} ${accessToken}`);
		headers.set('DPoP', buildDpopProof(signingKey, jwk, { htm, htu, ath, nonce }));
		return headers;
	};

	const firstNonce = nonces.get(origin);
	let response = await fetch(url, { ...init, headers: buildHeaders(firstNonce) });
	const nextNonce = response.headers.get('DPoP-Nonce');
	if (nextNonce) nonces.set(origin, nextNonce);
	if (!response.ok && nextNonce && nextNonce !== firstNonce) {
		await response.body?.cancel();
		response = await fetch(url, { ...init, headers: buildHeaders(nextNonce) });
	}
	return response;
}

async function main() {
	const config = await readJson(CONFIG_PATH);
	const state = await readJson(STATE_PATH);
	const publication = parseAtUri(config.publicationUri ?? state.publication?.uri);
	const did = publication.did;

	const oauth = await readJson(OAUTH_PATH);
	const session = oauth.sessions?.[did];
	if (!session?.dpopJwk?.d || !session?.tokenSet?.access_token) {
		throw new Error(
			`No Sequoia OAuth session for ${did}. Run \`npx sequoia login\`, then try again.`
		);
	}

	const jwk = session.dpopJwk;
	const signingKey = createPrivateKey({ key: jwk, format: 'jwk' });
	const nonces = new Map();
	const clientId = `http://localhost?${new URLSearchParams({
		redirect_uri: CALLBACK_URL,
		scope: OAUTH_SCOPE
	})}`;

	let tokenSet = session.tokenSet;
	const expiresAt = tokenSet.expires_at ? Date.parse(tokenSet.expires_at) : Infinity;
	if (expiresAt < Date.now() + 5000) {
		if (dryRun) {
			console.log('Note: the stored token is expired; a login will be needed to apply.');
		} else {
			console.log('OAuth token expired; refreshing...');
			const issuer = tokenSet.iss?.replace(/\/$/, '');
			if (!issuer || !tokenSet.refresh_token) {
				throw new Error('Cannot refresh the session. Run `npx sequoia login` and try again.');
			}
			const metadata = await (
				await fetch(`${issuer}/.well-known/oauth-authorization-server`)
			).json();
			const body = new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: tokenSet.refresh_token,
				client_id: clientId
			}).toString();
			const response = await dpopFetch(
				metadata.token_endpoint,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body
				},
				{ signingKey, jwk, nonces }
			);
			if (!response.ok) {
				throw new Error(
					`Token refresh failed (${response.status}). Run \`npx sequoia login\` and try again.`
				);
			}
			const refreshed = await response.json();
			tokenSet = {
				...tokenSet,
				access_token: refreshed.access_token,
				refresh_token: refreshed.refresh_token ?? tokenSet.refresh_token,
				token_type: refreshed.token_type ?? tokenSet.token_type,
				scope: refreshed.scope ?? tokenSet.scope,
				expires_at: new Date(Date.now() + (refreshed.expires_in ?? 3600) * 1000).toISOString()
			};
			oauth.sessions[did].tokenSet = tokenSet;
			await writeJson(OAUTH_PATH, oauth, 0o600);
		}
	}

	const pds = pdsOverride ?? tokenSet.aud?.replace(/\/$/, '');
	if (!pds) throw new Error('No PDS URL in the OAuth session; pass --pds=<url>.');

	const stale = [];
	for (const [file, post] of Object.entries(state.posts ?? {})) {
		if (existsSync(path.resolve(PROJECT_ROOT, file))) {
			if (verbose) console.log(`keep  ${file}`);
			continue;
		}
		const uri = parseAtUri(post.atUri);
		if (uri.did !== did || uri.collection !== COLLECTION) {
			throw new Error(`Unexpected record for missing file ${file}: ${post.atUri}`);
		}
		if (rkeyFilters.length && !rkeyFilters.includes(uri.rkey)) continue;
		stale.push({ file, rkey: uri.rkey, atUri: post.atUri });
	}

	if (stale.length === 0) {
		console.log('Nothing to delete: every published document still has a local file.');
		return;
	}

	console.log(`${dryRun ? 'Would delete' : 'Deleting'} ${stale.length} record(s):`);
	for (const { file, rkey } of stale) console.log(`  ${rkey}  ${file}`);

	if (dryRun) return;
	if (!assumeYes) {
		if (!process.stdin.isTTY) {
			throw new Error('Non-interactive shell: pass --yes to confirm the deletion.');
		}
		const { createInterface } = await import('node:readline/promises');
		const rl = createInterface({ input: process.stdin, output: process.stdout });
		const answer = await rl.question('Delete these records? [y/N] ');
		rl.close();
		if (!/^y(es)?$/i.test(answer.trim())) {
			console.log('Cancelled; no records deleted.');
			return;
		}
	}

	const failed = [];
	for (const record of stale) {
		const url = `${pds}/xrpc/${DELETE_ENDPOINT}`;
		const response = await dpopFetch(
			url,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ repo: did, collection: COLLECTION, rkey: record.rkey }),
				authScheme: tokenSet.token_type || 'DPoP'
			},
			{ signingKey, jwk, accessToken: tokenSet.access_token, nonces }
		);
		if (response.ok) {
			console.log(`deleted ${record.rkey}`);
			delete state.posts[record.file];
		} else {
			const detail = await response.text().catch(() => '');
			console.error(`failed  ${record.rkey}: ${response.status} ${detail}`);
			failed.push(record);
			if (response.status === 401) {
				throw new Error('Authorization rejected. Run `npx sequoia login` and try again.');
			}
		}
	}

	if (failed.length < stale.length) {
		await writeJson(STATE_PATH, state);
		console.log(`Updated ${STATE_PATH} (${stale.length - failed.length} entries pruned).`);
	}
	if (failed.length) {
		console.error(`${failed.length} record(s) failed; state kept for retry.`);
		process.exitCode = 1;
	}
}

main().catch((error) => {
	console.error(`Error: ${error.message}`);
	process.exitCode = 1;
});
