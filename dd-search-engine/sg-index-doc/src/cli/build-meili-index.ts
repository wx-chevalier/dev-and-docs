const program = require("commander");
import * as fs from "fs-extra";
import * as path from "path";
import { ReposityConfig } from "../config/repo-config";

import { buildDocIndex } from "../service/index/buildDocIndexWithMeili";

program
  .command("doc")
  .description("index docs from several repos")
  .action(async function () {
    const baseLocalDir = "/Users/zhangzixiong/Desktop/Docs";

    // 读取所有文章目录列表
    const firstDirs = fs.readdirSync(baseLocalDir);

    const ignores = [
      ".DS_Store",
      ".vscode",
      "tmp.txt",
      "commit-all.sh",
      "Private",
      "Playground",
      "Awesome-Lists",
      "Awesome-CS-Books-and-Digests",
    ];

    firstDirs
      .filter((d) => !ignores.includes(d))
      .forEach(async (dir) => {
        try {
          const dirPath = path.join(baseLocalDir, dir);

          const repos = fs
            .readdirSync(dirPath)
            .filter((d) => !ignores.includes(d))
            .map(
              (repoDirName) =>
                ({
                  name: repoDirName,
                  title: repoDirName,
                  localPath: path.join(dirPath, repoDirName),
                  description: repoDirName,
                  sUrl: `https://ng-tech.icu/${repoDirName}`,
                } as ReposityConfig)
            );

          await buildDocIndex(repos);
        } catch (e) {
          console.error(e);
        }
      });
  });

program.parse(process.argv);
