import { JSDOM } from 'jsdom'

 async function crawlPage(baseURL, currentURL, pages) {
  

  const baseURLObj = new URL(baseURL)
  const currentURLObj = new URL(currentURL)
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages
  }

  const normalizedCurrentURL = normalizeURL(currentURL)
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++
    return pages
  }
  pages[normalizedCurrentURL] = 1  

  console.log(`actively crawling: ${currentURL}`)



  try {
    const resp = await fetch(currentURL)

    if (resp.status >399) {
      console.log(`error in fetch with status code ${resp.status} on page ${currentURL}`)
      return pages
    }

    const contentType = resp.headers.get("content-type")
    if (!contentType.includes("text/html")) {
      console.log(`none html response, content type: ${contentType}, on page ${currentURL}`)
    }

    const htmlBody = await resp.text()

    const nextURLs = getURLsFromHTML(htmlBody, baseURL)

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }

  } catch (err) {
    console.log(`error in fetch ${currentURL}`)
  }
  return pages


}

function normalizeURL(url) {
  const urlObj = new URL(url)
  let fullPath = `${urlObj.host}${urlObj.pathname}`
  if (fullPath.slice(-1) === '/') {
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}

function getURLsFromHTML(html, baseURL) {
  const urls = []
  const dom = new JSDOM(html)
  const anchors = dom.window.document.querySelectorAll('a')

  for (const anchor of anchors) {
    if (anchor.hasAttribute('href')) {
      let href = anchor.getAttribute('href')

      try {
        // convert any relative URLs to absolute URLs
        href = new URL(href, baseURL).href
        urls.push(href)
      } catch(err) {
        console.log(`${err.message}: ${href}`)
      }
    }
  }

  return urls
}

export { normalizeURL, getURLsFromHTML, crawlPage }

