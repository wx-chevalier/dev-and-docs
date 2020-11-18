import { promisify } from 'util';
import * as fs from 'fs-extra';
import * as walkSync from 'walk-sync';

import repos, { ReposityConfig } from '../../config/repo-config';

const readFileAsync: (
  arg1: string | number | Buffer,
  args: { encoding: string }
) => Promise<string> = promisify(fs.readFile);

export async function calcStats() {
  const stats: Record<
    string,
    {
      articleCnt: number;
      wordCnt: number;
    }
  > = {};

  let globalArticleCnt = 0;
  let globalWordCnt = 0;

  try {
    for (let repoName of Object.keys(repos)) {
      // 获取仓库的配置信息
      const repo: ReposityConfig = repos[repoName];
      const repoStats = { articleCnt: 0, wordCnt: 0 };

      const files = walkSync(repo.localPath).filter(
        path =>
          (path.endsWith('.md') || path.endsWith('.pdf')) &&
          path !== 'README.md' &&
          path.indexOf('Weekly') === -1
      );

      for (let file of files) {
        const absoluteFile = `${repo.localPath}/${file}`;

        globalArticleCnt++;
        repoStats.articleCnt++;

        // 判断是否为 PDF
        if (file.endsWith('pdf')) {
          continue;
        }

        // 读取文件内容
        const content = await readFileAsync(absoluteFile, {
          encoding: 'utf-8'
        });

        if (content) {
          globalWordCnt += content.length;
          repoStats.wordCnt += content.length;
        }
      }

      stats[repoName] = repoStats;
    }
  } catch (e) {
    console.error(e);
  }

  return {
    globalArticleCnt,
    globalWordCnt,
    stats
  };
}
