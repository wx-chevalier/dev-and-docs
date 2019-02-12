import test from 'ava';
import alfyTest from 'alfy-test';

test('result', async t => {
	const alfy = alfyTest();
	const result = await alfy('ec2 accept reserved');

	t.deepEqual(result[0], {
		title: 'acceptReservedInstancesExchangeQuote',
		autocomplete: 'acceptReservedInstancesExchangeQuote',
		subtitle: 'Elastic Compute Cloud',
		arg:
			'http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#acceptReservedInstancesExchangeQuote-property',
		quicklookurl:
			'http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/EC2.html#acceptReservedInstancesExchangeQuote-property',
		icon: {
			path: './icons/EC2.png'
		},
		keywords: 'EC2 acceptReservedInstancesExchangeQuote Elastic Compute Cloud',
		count: 3
	});
});

test('fallback icon', async t => {
	const alfy = alfyTest();
	const result = await alfy('startsupport');

	t.deepEqual(result[0], {
		title: 'startSupportDataExport',
		autocomplete: 'startSupportDataExport',
		subtitle: 'Marketplace Commerce Analytics',
		arg:
			'http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MarketplaceCommerceAnalytics.html#startSupportDataExport-property',
		quicklookurl:
			'http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MarketplaceCommerceAnalytics.html#startSupportDataExport-property',
		icon: {
			path: './icons/aws.png'
		},
		keywords:
			'MarketplaceCommerceAnalytics startSupportDataExport Marketplace Commerce Analytics',
		count: 1
	});
});
