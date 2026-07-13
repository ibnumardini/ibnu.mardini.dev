const languageLabels = { en: 'EN', id: 'ID' } as const;

export function formatBlogDate(date: Date) {
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function blogLanguageLabel(language: 'en' | 'id') {
	return languageLabels[language];
}
