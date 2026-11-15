const languageLabels = { en: 'EN', id: 'ID' } as const;

export function formatBlogDate(date: Date) {
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function blogLanguageLabel(language: 'en' | 'id') {
	return languageLabels[language];
}

// "first eight words … last two" — keeps prev/next links short. Titles of ≤10 words are returned as-is.
export function clampTitle(title: string, head = 8, tail = 2) {
	const words = title.trim().split(/\s+/);
	if (words.length <= head + tail) return title;
	return `${words.slice(0, head).join(' ')} … ${words.slice(-tail).join(' ')}`;
}
