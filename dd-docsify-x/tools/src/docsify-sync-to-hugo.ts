#!/usr/bin/env node

import * as fs from "fs-extra";
import * as path from "path";
import * as yargs from "yargs";
import _ from "lodash";

const walkSync = require("walk-sync");

let ignores = /node_modules|^\.|sidebar|_sidebar|_docsify|codes|examples/;
let isDoc = /.md$/;

type Entry = {
  name: string;
  link: string;
  children?: Entry[];
};

function niceName(name: string) {
  let splitName = name.split("-");
  if (Number.isNaN(Number(splitName[0]))) return splitName.join(" ");
  return splitName.slice(1).join(" ");
}

function syncDir(srcDir: string, targetDir: string) {
  const relativePaths: string[] = walkSync(srcDir, {
    ignore: [".git", ".github", ".meta", 'examples'],
    directories: true
  });
  const repoName = _.last(srcDir.split("/"))

  for (let relativePath of relativePaths) {
    if (ignores.test(relativePath)) continue;

    const srcFilePath = path.join(srcDir, relativePath);

    let segments: string[] = relativePath.split("/");


    if (_.last(segments) === "") {
      segments.pop()
    }
    let fileName = segments[segments.length - 1];

    // 判断是文件还是文件夹
    if (fs.lstatSync(srcFilePath).isDirectory()) {

      // 判断是否存在 README，不存在则写入
      if (!fs.existsSync(path.join(srcFilePath, "README.md"))) {
        const targetFilePath = path.join(targetDir, repoName, relativePath, "_index.md").toLowerCase();
        fs.ensureFileSync(targetFilePath);
        // 写入内容
        fs.writeFileSync(targetFilePath,
          `
---
title: ${fileName.replace(".md", "")}
linktitle: ${fileName.replace(".md", "")}
type: book
commentable: true
---
`
        );
      }
    } else {

      if (!isDoc.test(relativePath)) { continue }

      if (fileName === "README.md") {
        fileName = segments.length > 1 ? segments[segments.length - 2] : repoName;
      }

      fileName = fileName.replace(":", "：").replace("[", "").replace("]", '');

      // hugo 仅支持路径小写
      const targetFilePath = path.join(targetDir, repoName, relativePath.replace("README.md", "_index.md")).toLowerCase();

      if (fs.existsSync(targetFilePath)) {
        {
          fs.removeSync(targetFilePath);
        }
      }

      // 读取内容
      const fileContent = fs.readFileSync(srcFilePath, { encoding: "utf-8" });

      // 前缀添加
      const finalContent =
        `
---
title: ${fileName.replace(".md", "")}
linktitle: ${fileName.replace(".md", "")}
type: book
commentable: true
---

${fileContent}
    `
      fs.ensureFileSync(targetFilePath);
      // 写入内容
      fs.writeFileSync(targetFilePath, finalContent);
    }
  }


}


let args = yargs
  .wrap(yargs.terminalWidth() - 1)
  .usage("$0 [-d srcDir] [-t targetDir]")
  .options({
    srcDir: {
      alias: "d",
      type: "string",
      describe:
        "Where to look for the documentation (defaults to docs subdir of repo directory)",
    },
    targetDir: {
      alias: "t",
      type: "string",
    },
  }).argv;

let srcDir = path.resolve(process.cwd(), args.srcDir || "./docs");
let targetDir = args.targetDir;

// let srcDir = "/Users/zhangzixiong/Desktop/Docs/Awesome/Awesome-Lists";
// let targetDir = "/Users/zhangzixiong/Desktop/Workspace/Github/ngte/seo-markdown-blog-site/hugo/content/books";

try {
  console.log("sync directory", srcDir, "to", targetDir);

  syncDir(srcDir, targetDir);
} catch (e) {
  console.error("Unable to sync directory", srcDir, " to ", targetDir);
  console.error("Reason:", e.message);
  process.exit(1);
}
