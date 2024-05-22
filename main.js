import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
	const args = process.argv;

	if (args.length !== 3) {
		console.log("Invalid number of arguments. Expected one: BASE_URL");
		return;
	}

	const baseURL = args[2];
	console.log(`Crawler starting at baseURL: ${baseURL}`)

	const pages = await crawlPage(baseURL);
	printReport(pages);
}

main()
