import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.slice(-1) === '/') {
      fullPath = fullPath.slice(0, -1)
    }
    return fullPath
  }
  
  export { normalizeURL }


  function getURLsFromHTML(htmlBody, baseURL) {

  }
