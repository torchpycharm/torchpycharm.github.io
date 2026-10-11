// Frontmatter dates are parsed as UTC midnight, so format them in UTC too.
function formatYearMonth(date: Date): string {
	return `${date.getUTCFullYear()}.${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
}

/** "2025.10 – 2026.04", or just "2025.10" when the project has no end date. */
export function formatProjectPeriod(start: Date, end?: Date): string {
	const from = formatYearMonth(start);
	const to = end ? formatYearMonth(end) : from;
	return to === from ? from : `${from} – ${to}`;
}
