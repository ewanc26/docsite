import {
	PUBLIC_SITE_TITLE,
	PUBLIC_SITE_DESCRIPTION,
	PUBLIC_SITE_URL
} from '$env/static/public';
import type { SiteMetadata } from '@ewanc26/ui';

export { createSiteMeta, generateMetaTags } from '@ewanc26/ui';
export type { SiteMetadata };

/**
 * Default metadata for the docsite.
 */
export const defaultSiteMeta: SiteMetadata = {
	title: PUBLIC_SITE_TITLE,
	description: PUBLIC_SITE_DESCRIPTION,
	keywords: 'ewan, docs, documentation, projects',
	url: PUBLIC_SITE_URL,
	image: '/og.png'
};
