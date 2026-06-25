import { getPost, listPosts } from '$lib/posts';
import { renderMarkdown, extractToc } from '$lib/format';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

// Prerender every documentation post by slug
export const entries: EntryGenerator = () => listPosts().map(({ slug }) => ({ slug }));

/**
 * Load a single documentation post: raw metadata, rendered HTML, and
 * a table of contents extracted from its headings.
 */
export const load: PageServerLoad = async ({ params }) => {
	try {
		const post = getPost(params.slug);
		const [html, toc] = await Promise.all([
			renderMarkdown(post.content),
			Promise.resolve(extractToc(post.content))
		]);
		return { post, html, toc };
	} catch {
		error(404, 'not found');
	}
};
