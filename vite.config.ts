import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-vercel';
import { defineConfig } from 'vite';

// Tailwind v4 + SvelteKit; @lucide/svelte needs SSR externalisation
// because it ships ESM without a Node wrapper
export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			alias: { $lib: 'src/lib' },
			// The runtime is pinned rather than inferred: adapter-vercel derives
			// its default from the *building* machine's Node version and hard-fails
			// on anything outside 20/22/24, so an unpinned build breaks on newer
			// local Node installs and silently drifts when Vercel bumps its default.
			adapter: adapter({ runtime: 'nodejs22.x' }),
			// All content is pre-rendered at build time; warn rather than fail on
			// expected edge cases like missing IDs in heading anchors.
			prerender: {
				handleHttpError: 'warn',
				handleMissingId: 'warn',
				entries: ['*']
			}
		})
	],
	ssr: {
		noExternal: ['@lucide/svelte']
	}
});
