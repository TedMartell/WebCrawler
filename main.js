import { crawlPage } from "./crawl.js"


async function main() {
    if (process.argv.length < 3) {
        console.log("No website provided")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("To many inputs")
        process.exit(1)
    }
    const baseURL = process.argv[2]

    console.log(`web crawler starting at ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})

    for (const page of Object.entries(pages)) {
        console.log(page)
    }


  }
  
  main()
  