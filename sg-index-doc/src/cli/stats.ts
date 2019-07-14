import { calcStats } from '../service/stats/calcStats';

const program = require('commander');

program
  .command('stats')
  .description('index docs from several repos')
  .action(async function() {
    const resp = await calcStats();
    console.log(resp);
  });

program.parse(process.argv);
