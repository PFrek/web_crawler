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

async function crawlPage(currentURL) {
	let response = null;
	try {
		response = await fetch(currentURL);
	} catch (err) {
		console.log(err.message);
		return
	}
	if (response.status >= 400) {
		console.log(`Failed to fetch website: ${response.status}`);
		return;
	}
	if (!response.headers.get('content-type').includes('text/html')) {
		console.log(`Invalid content-type. Expected text/html but got ${response.headers['content-type']}`);
		return;
	}

	const htmlBody = await response.text()

	console.log(htmlBody);
}


export { normalizeURL, getURLsFromHTML, crawlPage };
