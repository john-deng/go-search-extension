const c = new Compat();
const searcher = new DocSearch(searchIndex);
const defaultSuggestion = `Search Go docs in your address bar instantly!`;
const omnibox = new Omnibox(c.browser, defaultSuggestion, c.isChrome ? 8 : 6);

omnibox.bootstrap({
    onSearch: (query) => {
        return searcher.search(query);
    },
    onFormat: (index, doc) => {
        let text = doc.package;
        let path = doc.package;
        if (doc.type !== "package") {
            text += `.${doc.label}`;
            path += `#${doc.label}`;
        }
        return {
            content: `https://godoc.org/${path}`,
            description: `[${doc.type}] ${c.match(text)} - ${c.dim(c.escape(doc.description))}`,
        };
    },
    onAppend: (query) => {
        return [{
            content: `https://godoc.org/?q=${query}`,
            description: `Search Go docs ${c.match(query)} on https://godoc.org`,
        }]
    }
});