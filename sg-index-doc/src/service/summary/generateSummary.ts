const walkSync = require('walk-sync');
const { promisify } = require('util');
const fs = require('fs-extra');
const readFileAsync = promisify(fs.readFile);
const debug = require('debug')('generateSummary');

import { generateFileTree, getBlankFromDepth } from '../../util/fs/file';
import { ignoreFilesOrDirs } from './../../config/dict';
import { FileTree } from './../../util/fs/interface';

import { default as repos, ReposityConfig } from '../../config/repo-config';
import { formatFileAsListItem } from '../../util/markdown/md';

let globalCnt = 0;

export async function generateSummary(repoName, targetDir) {
  // 获取仓库的配置信息
  const repo: ReposityConfig = repos[repoName];
  repo.name = repoName;

  let fileTree = await generateFileTree(repo.localPath);

  await fs.remove(`${targetDir}/${repoName}`);

  const summary = generatePartialSummary(fileTree, 0, repo, targetDir);

  return `## [${repo.name} | ${repo.title}]() \n` + summary;
}

/** 针对某层建立部门的 Summary */
function generatePartialSummary(
  fileTree: FileTree,
  currentDepth: number,
  repo: ReposityConfig,
  targetDir: string
) {
  let summary = '';

  // 首先处理所有的文件
  for (let file of fileTree.files) {
    // 如果是需要忽略的文件，则直接跳过
    if (ignoreFilesOrDirs.includes(file.name)) {
      continue;
    }

    file.uniqueName = `${currentDepth}${globalCnt}-${file.name}`;

    globalCnt += 1;

    let baseTargetFilePath = `${targetDir}/${repo.name}/${file.uniqueName}`;

    if (baseTargetFilePath.indexOf('.md') < 0) {
      baseTargetFilePath += '.md';
    }

    // 将文件复制过去
    fs.copy(`${repo.localPath}/${file.path}`, baseTargetFilePath).catch(e => {
      console.error(`Invalie file: ${repo.localPath}/${file.path} > ${e.path}`);
    });

    summary += `${getBlankFromDepth(currentDepth)}${formatFileAsListItem(
      file,
      repo.name
    )}`;
  }

  for (let dirName in fileTree.dirs) {
    const dir = fileTree.dirs[dirName];

    const uniqueName = `${currentDepth}${globalCnt}-${dirName}-README.md`;

    globalCnt += 1;

    // 将文件复制过去
    fs.copy(
      `${repo.localPath}/${dir.path}README.md`,
      `${targetDir}/${repo.name}/${uniqueName}`
    ).catch(e => {
      // console.error(
      //   `Invalie dir: ${repo.localPath}/${dir.path}README.md > ${e.path}`
      // );
    });

    summary += `${getBlankFromDepth(currentDepth)}${formatFileAsListItem(
      {
        name: dirName,
        uniqueName: uniqueName,
        path: fileTree.path
      },
      repo.name
    )}`;

    // 进入下一级
    currentDepth += 1;

    summary += generatePartialSummary(dir, currentDepth, repo, targetDir);

    currentDepth -= 1;
  }

  return summary;
}
