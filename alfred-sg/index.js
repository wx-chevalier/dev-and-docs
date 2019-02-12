'use strict';
const alfy = require('alfy');
const { searchDoc, searchLink } = require('./lib/search.js');

const matcher = (input = 'REST') => {
	const tokens = input
		.trim()
		.toLowerCase()
		.split(' ');

	const isLink = tokens[0] === 'link';

	(isLink ? searchLink(tokens.join(' ')) : searchDoc(tokens.join(' '))).then(
		res => {
			alfy.output(res);
		}
	);
};

matcher(alfy.input);
