


function normalizeURL(url) {
    const parsedURL = new URL(url);
    const normalizedURL = parsedURL.hostname + parsedURL.pathname;
    return normalizedURL;
}

export { normalizeURL };
