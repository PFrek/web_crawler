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
		links.push(`${baseURL}${anchor.href}`);
	}

	return links;
}


export { normalizeURL, getURLsFromHTML };
