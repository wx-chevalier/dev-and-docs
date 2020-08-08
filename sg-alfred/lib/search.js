const algoliasearch = require('algoliasearch');

const client = algoliasearch('35UOMI84K6', '632bd8009b7260d30a352e9d9b14d552');
const docIndex = client.initIndex('doc');
const linkIndex = client.initIndex('link');

function searchDoc(input) {
	const hrefSet = new Set();

	return docIndex
		.search({
			query: input,
			hitsPerPage: 20,
			attributesToRetrieve: ['fileName', 'repo', 'categories', 'href']
		})
		.then(content => {
			return (content.hits || [])
				.filter(hit => {
					if (hrefSet.has(hit.href)) {
						return false;
					}

					hrefSet.add(hit.href);
					return true;
				})
				.map(hit => ({
					title: hit.fileName,
					autocomplete: hit.fileName,
					subtitle: hit.repo,
					keywords: hit.categories,
					arg: hit.href,
					quicklookurl: hit.href,
					icon: {
						path: `./icons/doc.png`
					}
				}));
		});
}

function searchLink(input) {
	const hrefSet = new Set();

	return linkIndex
		.search({
			query: input,
			hitsPerPage: 50,
			attributesToRetrieve: ['title', 'fileName', 'repo', 'categories', 'href']
		})
		.then(content => {
			return (content.hits || [])
				.filter(hit => {
					if (hrefSet.has(hit.href)) {
						return false;
					}

					hrefSet.add(hit.href);
					return true;
				})
				.map(hit => ({
					title: hit.title,
					autocomplete: hit.fileName,
					subtitle: hit.fileName,
					keywords: hit.categories,
					arg: hit.href,
					quicklookurl: hit.href,
					icon: {
						path: `./icons/link.png`
					}
				}));
		});
}

module.exports = {
	searchDoc,
	searchLink
};
