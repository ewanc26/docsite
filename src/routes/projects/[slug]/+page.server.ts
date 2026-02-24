import { getPost, listPosts } from '$lib/posts';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => listPosts().map(({ slug }) => ({ slug }));

export const load: PageServerLoad = ({ params }) => {
	try {
		return { post: getPost(params.slug) };
	} catch {
		error(404, 'not found');
	}
};
