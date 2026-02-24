import { getPost, listPosts } from '$lib/posts';
import { renderMarkdown, extractToc } from '$lib/format';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => listPosts().map(({ slug }) => ({ slug }));

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
