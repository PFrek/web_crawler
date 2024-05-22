function sortPages(pages) {
	const sorted = Object.entries(pages).sort(([, first], [, second]) => second - first)
	return sorted;
}

function printReport(pages) {
	console.log('=============================================');
	console.log('Starting Report');
	console.log('=============================================');


	const sorted = sortPages(pages);
	for (let [url, count] of sorted) {
		console.log(`Found ${count} internal links to ${url}`)
	}
}

export { printReport, sortPages };
