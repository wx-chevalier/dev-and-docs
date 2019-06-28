import { generateSummary } from '../service/summary/generateSummary';
import repos from '../config/repo-config';
const os = require('os');
const program = require('commander');
const fs = require('fs-extra');

program
  .version('0.0.1')
  .option(
    '-d, --directory [directory]',
    '工作目录，默认为当前目录',
    os.homedir() + '/Desktop'
  )
  .option('-l, --language [language]', '指定生成的语言版本 [zh/en]', 'zh');

program.parse(process.argv);

const targetDir = '/Users/apple/Workspace/Repos/Docs/ngte-docs';

(async () => {
  let summary = '# Summary \n';

  for (let repoName of Object.keys(repos)) {
    const s = await generateSummary(repoName, targetDir);

    summary += s;
  }

  await fs.remove(`${targetDir}/SUMMARY.md`);
  await fs.outputFile(`${targetDir}/SUMMARY.md`, summary);
})();
