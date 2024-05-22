import { test, expect } from "@jest/globals";
import { sortPages } from './report';

test('pages sorted', () => {
	const pages = {
		'example.com': 3,
		'example.com/news': 1,
		'example.com/about': 2,
		'example.com/blog': 5,
	}

	const sorted = sortPages(pages);

	expect(sorted).toEqual([
		['example.com/blog', 5],
		['example.com', 3],
		['example.com/about', 2],
		['example.com/news', 1],
	]);
})
