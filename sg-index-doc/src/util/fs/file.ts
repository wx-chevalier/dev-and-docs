import { ignoreFilesOrDirs } from '../../config/dict';
import { formatToc } from '../markdown/md';
import { FileTree } from './interface';
import { stringify } from 'querystring';

const walkSync = require('walk-sync');
const readline = require('readline');
const fs = require('fs');
const debug = require('debug')('file');

/**
 *
 * 功能：开始遍历指定目录
 * @export
 * @param {string} parentDirectory
 * @returns
 */
export async function generateFileTree(parentDirectory: string) {
  const fileTree: FileTree = {
    path: '',
    dirs: {},
    files: []
  };

  const paths: string[] = walkSync(parentDirectory, {
    ignore: ['.git', '.github', '.meta']
  });

  for (let path of paths) {
    let segments: string[] = path.split('/');

    let obj: FileTree = fileTree;

    // 遍历每一段路径
    for (let segment of segments) {
      if (segment.endsWith('.xmind') || segment.endsWith('.pdf')) {
        continue;
      }

      if (segment.endsWith('.md')) {
        obj.files.push({
          path,
          name: segment,
          html_url: `./${path}`
        });
      } else {
        // 如果是文件目录，则创建新的结点
        if (ignoreFilesOrDirs.includes(segment)) {
          continue;
        }

        // 如果当前树中不存在结点，则创建空结点
        if (!obj.hasOwnProperty('dirs')) {
          obj['dirs'] = {};
        }

        // 判断是否存在目录结点
        if (!obj['dirs'][segment]) {
          obj['dirs'][segment] = {
            path,
            dirs: {},
            files: []
          };
        }

        // 将子字典赋值给当前对象
        obj = obj['dirs'][segment];
      }
    }
  }

  return fileTree;
}

/**
 * 读取文件头
 * @param path 文件路径
 * @param fileName 文件名
 */
export function readMarkdownHeadersFromFile(path: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    let headers: string[] = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(path)
    });

    rl.on('line', (line: string) => {
      if (line.startsWith('# ')) {
        headers.push(line.replace('# ', ''));
      }
    });

    rl.on('close', function(_: string) {
      resolve(headers);
    });

    rl.on('error', function(error: Error) {
      reject(error);
    });
  });
}

/**
 * 功能：基于仓库内容，生成二级标题的目录
 * @param {FileTree} fileTree
 * @param currentDepth
 * @return {string} 用于表示目录的字符串
 */
export function generateTocFromFileTree(
  fileTree: FileTree,
  currentDepth: number
): string {
  let toc = '';

  // 首先处理所有的文件
  for (let file of fileTree.files) {
    // 如果是需要忽略的文件，则直接跳过
    if (ignoreFilesOrDirs.includes(file.name)) {
      continue;
    }

    toc += `${getBlankFromDepth(currentDepth - 1)}${formatToc(file)}`;
  }

  for (let dirName in fileTree.dirs) {
    const dir = fileTree.dirs[dirName];

    if (currentDepth == 0) {
      toc += `\n## [${dirName}](../${dirName}/README.md) \n\n- [Introduction](../${dirName}/README.md) \n\n`;
    } else {
      toc += `${getBlankFromDepth(currentDepth - 1)}${formatToc({
        name: dirName,
        path: `${dir.path}README.md`
      })}`;
    }

    // 进入下一级
    currentDepth += 1;

    toc += generateTocFromFileTree(dir, currentDepth);

    currentDepth -= 1;
  }

  return toc;
}

export function getBlankFromDepth(depth: number) {
  let str = '';

  for (let i = 0; i < depth; i += 1) {
    str += '  ';
  }

  return str;
}
