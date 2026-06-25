import { PUBLIC_SITE_TITLE, PUBLIC_SITE_DESCRIPTION, PUBLIC_SITE_URL } from '$env/static/public';

/**
 * Site metadata used across all pages for SEO and social sharing.
 */
export interface SiteMetadata {
	title: string;
	description: string;
	keywords?: string;
	url: string;
	image: string;
	imageWidth?: number;
	imageHeight?: number;
}

/**
 * Default metadata for the docsite — populated from environment variables.
 */
export const defaultSiteMeta: SiteMetadata = {
	title: PUBLIC_SITE_TITLE,
	description: PUBLIC_SITE_DESCRIPTION,
	keywords: 'ewan, docs, documentation, projects',
	url: PUBLIC_SITE_URL,
	image: '/og.png'
};
