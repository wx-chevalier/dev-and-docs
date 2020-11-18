#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';

let ignores = /node_modules|^\.|_sidebar|_docsify/;
let isDoc = /.md$/;

type Entry = {
  name: string;
  link: string;
  children?: Entry[];
};

function niceName(name: string) {
  let splitName = name.split('-');
  if (Number.isNaN(Number(splitName[0]))) return splitName.join(' ');
  return splitName.slice(1).join(' ');
}

function buildTree(dirPath: string, name = '', dirLink = ''): Entry {
  let children: Entry[] = [];
  for (let fileName of fs.readdirSync(dirPath)) {
    if (ignores.test(fileName)) continue;

    let fileLink = dirLink + '/' + fileName;
    let filePath = path.join(dirPath, fileName);
    if (fs.statSync(filePath).isDirectory()) {
      let sub = buildTree(filePath, fileName, fileLink);
      if (sub.children != null && sub.children.length > 0)
        children.push(sub);
    } else if (isDoc.test(fileName)) {
      children.push({ name: fileName, link: fileLink });
    }
  }

  return { name, children, link: dirLink };
}

function renderToMd(tree: Entry, linkDir = false): string {
  if (!tree.children) {
    return `- [${niceName(path.basename(tree.name, '.md'))}](${tree.link.replace(/ /g, '%20')})`;
  } else {
    let fileNames = new Set(tree.children.filter(c => !c.children).map(c => c.name));
    let dirNames = new Set(tree.children.filter(c => c.children).map(c => c.name + '.md'));

    let content = tree.children
      .filter(c => (!fileNames.has(c.name) || !dirNames.has(c.name)) && c.name != 'README.md')
      .map(c => renderToMd(c, dirNames.has(c.name + '.md') && fileNames.has(c.name + '.md')))
      .join('\n')
      .split('\n')
      .map(item => '  ' + item)
      .join('\n');
    let prefix = '';
    if (tree.name) {
      if (linkDir || fileNames.has('README.md')) {
        let linkPath = tree.link.replace(/ /g,'%20');
        if (fileNames.has('README.md')) linkPath += '/README.md';
        prefix = `- [${niceName(path.basename(tree.name, '.md'))}](${linkPath})\n`;
      }
      else prefix = `- ${niceName(tree.name)}\n`;
    }

    return prefix + content;
  }
}

let args = yargs
  .wrap(yargs.terminalWidth() - 1)
  .usage('$0 [-d docsDir] ')
  .options({
    docsDir: {
      alias: 'd',
      type: 'string',
      describe: 'Where to look for the documentation (defaults to docs subdir of repo directory)'
    }
  }).argv;

let dir = path.resolve(process.cwd(), args.docsDir || './docs');

try {
  let root = buildTree(dir);
  fs.writeFileSync(path.join(dir, '_sidebar.md'), renderToMd(root));
} catch (e) {
  console.error('Unable to generate sidebar for directory', dir);
  console.error('Reason:', e.message);
  process.exit(1);
}
