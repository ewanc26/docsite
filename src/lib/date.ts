/**
 * Format a YYYY-MM-DD date string using the browser/system locale,
 * falling back to en-GB if unavailable.
 */
export function formatDate(dateStr: string): string {
	if (!dateStr) return '';
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
