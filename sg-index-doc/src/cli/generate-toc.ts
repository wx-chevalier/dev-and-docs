import { generateToc } from '../service/toc/generateTocFromLocal';
import repos from '../config/repo-config';
import * as fs from 'fs-extra';
const os = require('os');
const program = require('commander');

program
  .version('0.0.1')
  .option('-r, --repo [repo]', '仓库名', 'Web-Series')
  .option(
    '-d, --directory [directory]',
    '工作目录，默认为当前目录',
    os.homedir() + '/Desktop'
  )
  .option('-l, --language [language]', '指定生成的语言版本 [zh/en]', 'zh');

program.parse(process.argv);

(async () => {
  for (let repoName of Object.keys(repos)) {
    try {
      await fs.remove(`${repos[repoName].localPath}/.meta/SUMMARY.md`);

      await fs.remove(`${repos[repoName].localPath}/.gitbook.yaml`);

      let summary = '# Summary \n';

      const s = await generateToc(repoName);

      summary += s;

      await fs.outputFile(
        `${repos[repoName].localPath}/.meta/SUMMARY.md`,
        summary
      );

      await fs.outputFile(
        `${repos[repoName].localPath}/.gitbook.yaml`,
        `root: ./

structure:
  readme: ./README.md
  summary: ./.meta/SUMMARY.md
`
      );

      console.log(`${repoName} - FINISHED`);
    } catch (e) {
      console.error(e);
    }
  }
})();
