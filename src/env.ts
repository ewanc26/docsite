import { defineEnvVars } from '@sveltejs/kit/env';

// Build-time environment variables, imported from `$app/env/public`.
export const variables = defineEnvVars({
	PUBLIC_SITE_TITLE: { public: true, static: true },
	PUBLIC_SITE_DESCRIPTION: { public: true, static: true },
	PUBLIC_SITE_URL: { public: true, static: true }
});
