import { promisify } from "util";
import * as fs from "fs-extra";
import * as md5 from "md5";
import * as walkSync from "walk-sync";
import { MeiliSearch } from "meilisearch";

import { ReposityConfig } from "../../config/repo-config";
import { readMarkdownHeadersFromFile } from "../../util/fs/file";
import { MEILI_PRIVATE_KEY } from "../../config/private";

const meiliClient = new MeiliSearch({
  host: "https://meili.search.unionfab.com",
  apiKey: MEILI_PRIVATE_KEY,
});

const readFileAsync: (
  arg1: string | number | Buffer,
  args: { encoding: string }
) => Promise<string> = promisify(fs.readFile);

export async function buildDocIndex(repos: ReposityConfig[]) {
  const index = meiliClient.index("docs");

  // 设置相关性
  index.updateSettings({
    searchableAttributes: ["fileName", "repo", "categories", "desc", "content"],
    attributesForFaceting: ["categories", "repo"],
  });

  for (const repo of repos) {
    try {
      console.log(`>>>${repo.name}>>>start`);

      // 获取仓库的配置信息
      const files = walkSync(repo.localPath).filter(
        (path) =>
          (path.endsWith(".md") || path.endsWith(".pdf")) &&
          path !== "README.md" &&
          path.indexOf("Weekly") === -1 &&
          path.indexOf("examples") === -1
      );

      console.log(`>>>${repo.name}>>>${files.length}`);

      for (const file of files) {
        try {
          // 封装出 href
          const href = `${repo.sUrl}/blob/master/${file}`;
          const absoluteFile = `${repo.localPath}/${file}`;
          let fileName: string = file.split("/").reverse()[0];

          // 判断是否为 PDF
          if (file.endsWith("pdf")) {
            index.addDocuments([
              {
                id: md5(href),
                fileName,
                repo: repo.name,
                categories: file
                  .split("/")
                  .filter(
                    (c) =>
                      Number.isNaN(parseInt(c, 10)) && c.indexOf(".md") === -1
                  ),
                href,
                desc: fileName,
                content: fileName,
              },
            ]);

            continue;
          }

          // 读取文件内容
          const content = await readFileAsync(absoluteFile, {
            encoding: "utf-8",
          });
          const desc = (await readMarkdownHeadersFromFile(absoluteFile)).join(
            ", "
          );

          if (!content) {
            continue;
          }

          // 这里对文件内容进行预处理
          const filteredContent = (content as string)
            .replace(/\n/g, "")
            .replace(/\[(.*)\]\(http.*\)/g, (_, __) => __)
            .replace(/```\w*.*```/g, "");

          const contents = [filteredContent];

          if (!contents) {
            continue;
          }

          // 分割过长内容
          const objs = contents.map((content, index) => ({
            id: index ? md5(`${href}${index}`) : md5(href),
            fileName,
            repo: repo.name,
            categories: file
              .split("/")
              .filter(
                (c) => Number.isNaN(parseInt(c, 10)) && c.indexOf(".md") === -1
              ),
            href,
            desc,
            content,
          }));

          index.addDocuments(objs);
        } catch (e) {
          console.error(e);
        }
      }

      console.log(`${repo.name} indexed finally.`);
    } catch (e) {
      console.error(e);
    }
  }
}
