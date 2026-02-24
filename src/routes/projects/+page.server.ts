import { listPosts } from '$lib/posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => ({ posts: listPosts() });
