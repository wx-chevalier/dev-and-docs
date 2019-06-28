import { generateFileTree, generateTocFromFileTree } from '../../util/fs/file';

const walkSync = require('walk-sync');
const { promisify } = require('util');
const fs = require('fs-extra');
const debug = require('debug')('generateToc');

import { default as repos, ReposityConfig } from '../../config/repo-config';

export async function generateToc(repoName = 'Awesome-Lists') {
  // 获取仓库的配置信息
  const repo: ReposityConfig = repos[repoName];

  const files = walkSync(repo.localPath).filter(
    path => path.endsWith('.md') && path !== 'README.md'
  );

  let fileTree = await generateFileTree(repo.localPath);

  let toc;

  toc = generateTocFromFileTree(fileTree, 0);

  return toc;
}
