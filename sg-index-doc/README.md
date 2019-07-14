# sg-index-doc | 文档工具

- 索引构建

```sh
# 建立文章索引
$ npm run ts ./src/cli/build-index.ts doc

# 建立链接索引
$ npm run ts ./src/cli/build-index.ts link
```

- 目录构建

```sh
# 为本地的某个仓库生成目录文件
$ npm run ts ./src/cli/generate-toc.ts

# 为所有的仓库生成 GitBook Summary
$ npm run ts ./src/cli/generate-summary.ts
```

- 文章同步

```sh
# 同步 Wiz 中的文章
$ npm run ts ./src/cli/sync-wiz.ts
```

- 数据统计

```sh
# 建立文章索引
$ npm run ts ./src/cli/stats stats
```
