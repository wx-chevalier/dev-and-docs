import { LinkType } from './../../shared/types';
import { FileDescriptor } from '../fs/interface';

/**
 * 功能：从 MarkDown 字符串中获取所有的一级目录
 * @param {string} mdString
 * https://github.com/jonschlinkert/markdown-toc#optionsmaxdepth
 *
 */
export function getH1sFromMDString(mdString: string) {
  const lines = mdString.split('\n');

  let headers: string[] = [];

  for (let line of lines) {
    if (line.startsWith('# ')) {
      headers.push(line.replace('# ', '').trim());
    }
  }

  return headers;
}

/**
 * 格式化显示文件
 * @param {FileDescriptor} file
 * @return {string}
 */
export const formatToc = (file: FileDescriptor) => {
  return `- [${file.name.replace('.md', '')}](../${file.path}) \n`;
};

/** 将  */
export const formatFileAsListItem = (
  file: FileDescriptor,
  repoName: string
) => {
  return `- [${file.name.replace('.md', '')}](./${repoName}/${(
    file.uniqueName || file.name
  ).replace(/ /g, '%20')}) \n`;
};

export const extractInfoFromTitle = (title: string) => {
  const result = {
    year: '未知',
    title,
    type: LinkType.Article
  };

  const TitleWithYearAndTypeRegex = /(\d{4})-(.*)\s#(.*)#/;

  let match = title.match(TitleWithYearAndTypeRegex);

  if (match) {
    return {
      ...result,
      year: match[1],
      title: match[2],
      type: LinkType[match[3]]
    };
  }

  const TitleWithYearRegex = /(\d{4})-(.*)/;

  match = title.match(TitleWithYearRegex);

  if (match) {
    return {
      ...result,
      year: match[1],
      title: match[2]
    };
  }

  const TitleWithTypeRegex = /^([^\d]*)\s#(.*)#/;

  match = title.match(TitleWithTypeRegex);

  if (match) {
    return {
      ...result,
      title: match[1],
      type: LinkType[match[2]]
    };
  }

  return result;
};
