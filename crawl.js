import { JSDOM } from 'jsdom'

 async function crawlPage(currentURL) {
  console.log(`actively crawling: ${currentURL}`)

  try {
    const resp = await fetch(currentURL)

    if (resp.status >399) {
      console.log(`error in fetch with status code ${resp.status} on page ${currentURL}`)
      return
    }

    const contentType = resp.headers.get("content-type")
    if (!contentType.includes("text/html")) {
      console.log(`none html response, content type: ${contentType}, on page ${currentURL}`)
    }

    console.log(await resp.text())

  } catch (err) {
    console.log(`error in fetch ${currentURL}`)
  }


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

