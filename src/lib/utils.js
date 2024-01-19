export function formatDate(date, dateStyle = 'medium', locales = 'en') {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return formatter.format(new Date(date));
}

export function getQueryStringObject(obj) {
	// Collapse the SearchParm query string object
	// into something more helpful.
	const qs = {};
	for (const q of obj) {
		qs[q[0]] = q[1];
	}

	qs.hasKeys = function () {
		return Object.keys(this).length - 1 == 0;
	};

	return qs;
}
