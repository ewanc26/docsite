import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// Tailwind v4 + SvelteKit; @lucide/svelte needs SSR externalisation
// because it ships ESM without a Node wrapper
export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	ssr: {
		noExternal: ['@lucide/svelte']
	}
});
