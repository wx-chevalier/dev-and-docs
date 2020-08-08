import * as algoliasearch from 'algoliasearch';
const program = require('commander');

import { ALGOLIA_ADMIN_API_KEY } from './../config/private';
import { buildDocIndex } from '../service/index/buildDocIndex';
import { buildLinkIndex } from '../service/index/buildLinkIndex';

const client = algoliasearch('35UOMI84K6', ALGOLIA_ADMIN_API_KEY);

program
  .command('doc')
  .description('index docs from several repos')
  .action(async function() {
    await buildDocIndex(client);
  });

program
  .command('link')
  .description('index links from Awesome Links')
  .action(async function() {
    await buildLinkIndex(client);
  });

program.parse(process.argv);
