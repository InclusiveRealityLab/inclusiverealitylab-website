function formatLink(url) {
    const patternToSearch = /^https:\/\//;
    if (patternToSearch.test(url)) {
        return url;
    } else {
        return `https://${url}`;
    }

}

export default formatLink;