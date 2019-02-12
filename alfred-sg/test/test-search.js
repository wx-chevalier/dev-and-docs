'use strict';
const algoliasearch = require('algoliasearch');

const client = algoliasearch('35UOMI84K6', '632bd8009b7260d30a352e9d9b14d552');
const docIndex = client.initIndex('doc');
const linkIndex = client.initIndex('link');

docIndex.setSettings({
	unretrievableAttributes: ['content']
});

const matcher = (input = 'REST') => {
	const tokens = input
		.trim()
		.toLowerCase()
		.split(' ');

	const isLink = tokens[0] === 'link';

	let index = isLink ? linkIndex : docIndex;

	index.search(
		{
			query: tokens.join(' '),
			hitsPerPage: 25
		},
		function(err, content) {
			if (err) throw err;

			console.table(
				(content.hits || []).map(hit => ({
					title: hit.fileName,
					autocomplete: hit.fileName,
					subtitle: hit.repo,
					keywords: hit.categories,
					arg: hit.href,
					quicklookurl: hit.href,
					icon: {
						path: `./icons/${isLink ? 'link' : 'doc'}.png`
					}
				}))
			);
		}
	);
};

matcher();
