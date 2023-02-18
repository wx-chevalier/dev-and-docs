#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-extra"));
const path = tslib_1.__importStar(require("path"));
const yargs = tslib_1.__importStar(require("yargs"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const walkSync = require("walk-sync");
let ignores = /node_modules|^\.|sidebar|_sidebar|_docsify|code|examples/;
let isDoc = /.md$/;
function niceName(name) {
    let splitName = name.split("-");
    if (Number.isNaN(Number(splitName[0])))
        return splitName.join(" ");
    return splitName.slice(1).join(" ");
}
function syncDir(srcDir, targetDir) {
    const reolativePaths = walkSync(srcDir, {
        ignore: [".git", ".github", ".meta"],
        directories: false
    });
    const dirName = lodash_1.default.last(srcDir.split("/"));
    for (let relativePath of reolativePaths) {
        if (ignores.test(relativePath) || !isDoc.test(relativePath))
            continue;
        let segments = relativePath.split("/");
        let fileName = segments[segments.length - 1];
        if (fileName === "README.md") {
            fileName = segments.length > 1 ? segments[segments.length - 2] : dirName;
        }
        const srcFilePath = path.join(srcDir, relativePath);
        // hugo 仅支持路径小写
        const targetFilePath = path.join(targetDir, dirName, relativePath.replace("README.md", "_index.md")).toLowerCase();
        if (fs.existsSync(targetFilePath)) {
            {
                fs.removeSync(targetFilePath);
            }
        }
        // 读取内容
        const fileContent = fs.readFileSync(srcFilePath, { encoding: "utf-8" });
        // 前缀添加
        const finalContent = `
---
title: ${fileName.replace(".md", "")}
linktitle: ${fileName.replace(".md", "")}
type: book
---

    ${fileContent}
    `;
        fs.ensureFileSync(targetFilePath);
        // 写入内容
        fs.writeFileSync(targetFilePath, finalContent);
    }
}
let args = yargs
    .wrap(yargs.terminalWidth() - 1)
    .usage("$0 [-d srcDir] [-t targetDir]")
    .options({
    srcDir: {
        alias: "d",
        type: "string",
        describe: "Where to look for the documentation (defaults to docs subdir of repo directory)",
    },
    targetDir: {
        alias: "t",
        type: "string",
    },
}).argv;
let srcDir = path.resolve(process.cwd(), args.srcDir || "./docs");
let targetDir = args.targetDir;
// let srcDir = "/Users/zhangzixiong/Desktop/Docs/Business/Business-Series";
// let targetDir = "/Users/zhangzixiong/Desktop/Workspace/Github/ngte/seo-markdown-blog-site/hugo/content/books";
try {
    console.log("sync directory", srcDir, "to", targetDir);
    syncDir(srcDir, targetDir);
}
catch (e) {
    console.error("Unable to sync directory", srcDir, " to ", targetDir);
    console.error("Reason:", e.message);
    process.exit(1);
}
//# sourceMappingURL=docsify-sync-to-hugo.js.map