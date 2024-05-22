import { JSDOM } from "jsdom";


function normalizeURL(url) {
	const urlObj = new URL(url);
	let path = urlObj.pathname;
	if (path[path.length - 1] == '/') {
		path = path.slice(0, -1);
	}

	return `${urlObj.hostname}${path}`
}

function getURLsFromHTML(htmlBody, baseURL) {
	const dom = new JSDOM(htmlBody);

	const anchors = dom.window.document.querySelectorAll('a');

	const links = []

	for (let anchor of anchors) {
		if (anchor.href[0] == '/') {
			links.push(`${baseURL}${anchor.href}`);
		} else {
			links.push(anchor.href);
		}
	}

	return links;
}

function sameDomain(url1, url2) {
	try {
		const url1Obj = new URL(url1);
		const url2Obj = new URL(url2);
		return url1Obj.hostname === url2Obj.hostname;
	} catch (err) {
		console.log('Failed to parse url');
		return false;
	}
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
	if (!sameDomain(baseURL, currentURL)) {
		return pages;
	}

	const normalizedURL = normalizeURL(currentURL);
	console.log(`Crawling: ${normalizedURL}`)

	if (pages[normalizedURL]) {
		pages[normalizedURL]++;
		return pages;
	}
	pages[normalizedURL] = 1;

	const htmlBody = await getPageHTML(currentURL);
	if (!htmlBody) {
		console.log(`Skipping faulty page ${currentURL}`);
		return pages;
	}

	const urls = getURLsFromHTML(htmlBody, baseURL);

	for (let url of urls) {
		await crawlPage(baseURL, url, pages);
	}

	return pages;
}

async function getPageHTML(url) {
	let response = null;
	try {
		response = await fetch(url);
	} catch (err) {
		console.log(err.message);
		return null;
	}
	if (response.status >= 400) {
		console.log(`Failed to fetch website: ${response.status}`);
		return null;
	}
	if (!response.headers.get('content-type').includes('text/html')) {
		console.log(`Invalid content-type. Expected text/html but got ${response.headers['content-type']}`);
		return null;
	}

	const htmlBody = await response.text();

	return htmlBody;
}


export { normalizeURL, getURLsFromHTML, crawlPage };
