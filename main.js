import { crawlPage } from "./crawl.js";

function main() {
	const args = process.argv;

	if (args.length !== 3) {
		console.log("Invalid number of arguments. Expected one: BASE_URL");
		return;
	}

	const baseURL = args[2];
	console.log(`Crawler starting at baseURL: ${baseURL}`)

	crawlPage(baseURL);
}


main()
