import * as fs from 'fs';

try {
	const exists = fs.existsSync(
		'C:\\Users\\thumb\\Documents\\Projects\\svelte\\ssg-blog\\src\\markdown\\astro-notes.md'
	);
	console.log(exists);
} catch (error) {
	console.log(error);
}
