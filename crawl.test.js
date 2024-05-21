import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('removes protocol', () => {
	const https = 'https://blog.boot.dev/path';
	const httpsNormalized = normalizeURL(https);

	expect(httpsNormalized).toEqual('blog.boot.dev/path');

	const http = 'http://blog.boot.dev/path';
	const httpNormalized = normalizeURL(http);

	expect(httpNormalized).toEqual('blog.boot.dev/path');

	expect(httpNormalized).toEqual(httpsNormalized);
})

test('removes trailing slash', () => {
	const url = 'https://blog.boot.dev/path/';

	const urlNormalized = normalizeURL(url);

	expect(urlNormalized).toEqual('blog.boot.dev/path')
})

test('finds and returns one link', () => {
	const html = `<html>
	<body>
	<a href="/post"><span>Go to Boot.dev</span></a>
	</body>
	</html>`;

	const links = getURLsFromHTML(html, 'https://blog.boot.dev');

	expect(links).toEqual(['https://blog.boot.dev/post'])
})

test('finds multiple links', () => {
	const html = `<html>
	<body>
	<a href="/post"><span>Go to Boot.dev</span></a>
	<a href="/"><span>Go to Boot.dev</span></a>
	<a href="/help/new"><span>Go to Boot.dev</span></a>
	<a href="/tomorrow"><span>Go to Boot.dev</span></a>
	</body>
	</html>`;

	const links = getURLsFromHTML(html, 'https://blog.boot.dev');

	expect(links).toEqual([
		'https://blog.boot.dev/post',
		'https://blog.boot.dev/',
		'https://blog.boot.dev/help/new',
		'https://blog.boot.dev/tomorrow',
	])

})
