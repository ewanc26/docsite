import { Renderer } from 'marked';

// ─── date formatting ─────────────────────────────────────────────────────────

/**
 * Format a YYYY-MM-DD date string using the browser/system locale,
 * falling back to en-GB if unavailable.
 */
export function formatDate(dateStr: string): string {
	if (!dateStr) return '';
	// Parse as UTC noon to avoid timezone-shift issues
	const date = new Date(`${dateStr}T12:00:00Z`);
	if (isNaN(date.getTime())) return dateStr;

	const locales =
		typeof navigator !== 'undefined' && navigator.languages?.length
			? [...navigator.languages, 'en-GB']
			: ['en-GB'];

	return new Intl.DateTimeFormat(locales, {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(date);
}

// ─── table of contents ───────────────────────────────────────────────────────

export interface TocEntry {
	level: number;
	text: string;
	id: string;
}

/** Slugify a heading's plain text into a URL-safe id. */
export function headingId(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/[\s_]+/g, '-');
}

/** Extract h2/h3 headings from raw markdown. */
export function extractToc(markdown: string): TocEntry[] {
	const entries: TocEntry[] = [];
	for (const line of markdown.split('\n')) {
		const m = line.match(/^(#{2,3})\s+(.+)/);
		if (m) {
			const text = m[2].replace(/[*_`~]/g, '').trim();
			entries.push({ level: m[1].length, text, id: headingId(text) });
		}
	}
	return entries;
}

/**
 * A marked Renderer that adds id attributes to h1-h6,
 * matching the ids produced by headingId().
 */
export function makeRenderer(): Renderer {
	const renderer = new Renderer();
	renderer.heading = ({ tokens, depth }) => {
		const text = tokens.map((t) => ('text' in t ? t.text : '')).join('');
		const plain = text.replace(/<[^>]*>/g, '').replace(/[*_`~]/g, '').trim();
		const id = headingId(plain);
		return `<h${depth} id="${id}">${text}</h${depth}>\n`;
	};
	return renderer;
}
