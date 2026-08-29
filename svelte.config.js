import adapter from '@sveltejs/adapter-vercel';

// Prerendered static docsite deployed on Vercel
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// The runtime is pinned rather than inferred: adapter-vercel derives
		// its default from the *building* machine's Node version and hard-fails
		// on anything outside 20/22/24, so an unpinned build breaks on newer
		// local Node installs and silently drifts when Vercel bumps its default.
		adapter: adapter({ runtime: 'nodejs22.x' }),
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn',
			entries: ['*']
		}
	}
};

export default config;
