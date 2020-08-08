import { generateFileTree, generateTocFromFileTree } from '../../util/fs/file';

import { default as repos, ReposityConfig } from '../../config/repo-config';

export async function generateToc(repoName = 'Awesome-Lists') {
  // 获取仓库的配置信息
  const repo: ReposityConfig = repos[repoName];

  let fileTree = await generateFileTree(repo.localPath);

  let toc;

  toc = generateTocFromFileTree(fileTree, 0);

  return toc;
}
