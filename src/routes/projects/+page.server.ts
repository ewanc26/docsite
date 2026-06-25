import { listPosts } from '$lib/posts';
import type { PageServerLoad } from './$types';

/** Provide the full post list to the projects index page. */
export const load: PageServerLoad = () => ({ posts: listPosts() });
