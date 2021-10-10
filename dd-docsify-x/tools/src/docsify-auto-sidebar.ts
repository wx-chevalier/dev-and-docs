#!/usr/bin/env node

import * as fs from "fs-extra";
import * as path from "path";
import * as yargs from "yargs";

let ignores = /node_modules|^\.|sidebar|_sidebar|_docsify|code|examples/;
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

function buildTree(
  dirPath: string,
  name = "",
  dirLink = "",
  withSequenceNumber = false
): Entry {
  let children: Entry[] = [];

  // 判断是否存在 .index ，如果存在则进行排序
  let fileNames = fs.readdirSync(dirPath);

  if (fs.existsSync(path.resolve(dirPath, ".index"))) {
    const indexLines = fs
      .readFileSync(path.resolve(dirPath, ".index"))
      .toString()
      .split("\n");

    fileNames = fileNames.sort(
      (f1, f2) => indexLines.indexOf(f1) - indexLines.indexOf(f2)
    );
  }

  for (let fileName of fileNames) {
    if (ignores.test(fileName)) continue;

    const fileLink = dirLink + "/" + fileName;
    const filePath = path.join(dirPath, fileName);
    if (fs.statSync(filePath).isDirectory()) {
      const sub = buildTree(filePath, fileName, fileLink, withSequenceNumber);
      if (sub.children != null && sub.children.length > 0) children.push(sub);
    } else if (isDoc.test(fileName)) {
      children.push({ name: fileName, link: fileLink });
    }
  }

  // 最后构建 .more
  if (fileNames.includes(".more")) {
    const fileName = "参考资料";
    const filePath = path.join(dirPath, '.more');
    const fileLink = dirLink + "/" + '.more';

    const sub = buildTree(filePath, fileName, fileLink, withSequenceNumber);
    if (sub.children != null && sub.children.length > 0) { children.push(sub) };
  }

  return { name, children, link: dirLink };
}

function renderToMd(
  tree: Entry,
  linkDir = false,
  withSequenceNumber = false,
  i: number | undefined = undefined,
  baseSequence: string = ""
): string {
  const sequencePrefix =
    withSequenceNumber && typeof i !== "undefined"
      ? `${baseSequence}${i + 1}.`
      : "";

  if (!tree.children) {
    return `- [${sequencePrefix} ${niceName(
      path.basename(tree.name, ".md")
    )}](${tree.link.replace(/ /g, "%20")})`.replace(". ", " ");
  } else {
    let fileNames = new Set(
      tree.children.filter((c) => !c.children).map((c) => c.name)
    );
    let dirNames = new Set(
      tree.children.filter((c) => c.children).map((c) => c.name + ".md")
    );

    let content = tree.children
      .filter(
        (c) =>
          (!fileNames.has(c.name) || !dirNames.has(c.name)) &&
          c.name != "README.md"
      )
      .map((c, i) =>
        renderToMd(
          c,
          dirNames.has(c.name + ".md") && fileNames.has(c.name + ".md"),
          withSequenceNumber,
          i,
          sequencePrefix
        )
      )
      .join("\n")
      .split("\n")
      .map((item) => "  " + item)
      .join("\n");

    let prefix = "";

    if (tree.name) {
      const childrenNum = (tree.children||[]).filter(c=>!c.name.includes("README")).length;

      if (linkDir || fileNames.has("README.md")) {
        let linkPath = tree.link.replace(/ /g, "%20");

        if (fileNames.has("README.md")) {
          linkPath += "/README.md";
        }

        prefix = `- [${sequencePrefix} ${niceName(
          path.basename(tree.name, ".md")
        )}${childrenNum?` [${childrenNum}]`:""}](${linkPath})\n`;
      } else {
        prefix = `- ${sequencePrefix} ${niceName(tree.name)}${childrenNum?` [${childrenNum}]`:""}\n`;
      }
    }

    return prefix.replace(". ", " ") + content;
  }
}

let args = yargs
  .wrap(yargs.terminalWidth() - 1)
  .usage("$0 [-d docsDir] ")
  .options({
    docsDir: {
      alias: "d",
      type: "string",
      describe:
        "Where to look for the documentation (defaults to docs subdir of repo directory)",
    },
    withSequenceNumber: {
      alias: "s",
      type: "boolean",
      describe: "Where to enable sequence number in list",
    },
  }).argv;

let dir = path.resolve(process.cwd(), args.docsDir || "./docs");
let withSequenceNumber = args.withSequenceNumber;

try {
  let root = buildTree(dir, "", "", withSequenceNumber);
  fs.writeFileSync(
    path.join(dir, "_sidebar.md"),
    renderToMd(root, false, withSequenceNumber)
  );
} catch (e) {
  console.error("Unable to generate sidebar for directory", dir);
  console.error("Reason:", e.message);
  process.exit(1);
}
