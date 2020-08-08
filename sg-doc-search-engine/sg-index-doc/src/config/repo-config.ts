// @ts-check
// 存放每个仓库的配置

export interface ReposityConfig {
  // 仓库名
  name?: string;

  // 文章标题
  title: string;

  // 描述
  description: string;

  // 仓库对应的短链接
  sUrl: string;

  // 书中每一章节需要插入的章节头
  chapterHeader: string;

  // 目录层级
  depth?: number;

  // 本地仓库路径
  localPath?: string;
}

const baseLocalDir = "/Users/zhangzixiong/Desktop/Docs";

// 所有仓库的声明
const repos: { [key: string]: ReposityConfig } = {
  "Awesome-Lists": {
    title: "精而全的技术资料索引",
    description:
      "Awesome Lists, Guide to Galaxy, curated, worthy and up-to-date links/reading list for ITCS-Coding/Algorithm/SoftwareArchitecture/AI. ITCS-编程/算法/软件架构/人工智能等领域的文章/书籍/资料/项目链接精选，岁月沉淀的美好",
    sUrl: "https://github.com/wxyyxc1992/Awesome-Lists",
    chapterHeader: "https://parg.co/UGo",
    depth: 2,
    localPath: `${baseLocalDir}/Awesome-Lists`
  },

  "Awesome-CS-Books": {
    title: "藏书阁",
    description:
      ":books: Awesome CS Books/Series(.pdf by git lfs) Warehouse, ProgrammingLanguage, SoftwareEngineering, Web, AI, ServerSideApplication, Infrastructure, FE etc. :dizzy: 优秀计算机科学与技术领域相关的书籍归档",
    sUrl: "https://github.com/wxyyxc1992/Awesome-CS-Books",
    chapterHeader: "https://parg.co/UGo",
    depth: 2,
    localPath: `${baseLocalDir}/Awesome-CS-Books`
  },

  "Awesome-CheatSheets": {
    title: "全栈开发速学速查手册集锦",
    description:
      "Awesome-CheatSheets, :books: Ultimate CheatSheets(Tutorials&MindMap), overview of syntax, features and practical tips, collection of useful code snippets, go from zero to hero at fly. :dizzy:  干货满满的全栈开发速学速查手册集锦",
    sUrl: "https://github.com/wxyyxc1992/Awesome-CheatSheets",
    chapterHeader: "https://parg.co/UCb",
    depth: 2,
    localPath: `${baseLocalDir}/Awesome-CheatSheets`
  },

  "ProgrammingLanguage-Series": {
    title: "编程语言语法基础与工程实践",
    description:
      ":books: 编程语言语法基础与工程实践，JavaScript | Java | Python | Go | Rust | CPP | Swift",
    sUrl: "https://github.com/wxyyxc1992/ProgrammingLanguage-Series",
    chapterHeader: "https://parg.co/USw",
    depth: 1,
    localPath: `${baseLocalDir}/ProgrammingLanguage-Series`
  },

  "Web-Series": {
    title: "现代 Web 开发基础、工程实践与架构优化",
    description:
      ":books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇",
    sUrl: "https://github.com/wxyyxc1992/Web-Series",
    chapterHeader: "https://parg.co/U0y",
    depth: 1,
    localPath: `${baseLocalDir}/Web-Series`
  },

  "AIDL-Series": {
    title: "数据科学与人工智能",
    description:
      ":books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇",
    sUrl: "https://github.com/wxyyxc1992/AIDL-Series",
    chapterHeader: "https://parg.co/U0y",
    depth: 1,
    localPath: `${baseLocalDir}/AIDL-Series`
  },

  "Backend-Series": {
    title: "服务端开发与架构",
    description:
      ":books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇",
    sUrl: "https://github.com/wxyyxc1992/Backend-Series",
    chapterHeader: "https://parg.co/U0y",
    depth: 1,
    localPath: `${baseLocalDir}/Backend-Series`
  },

  "Spring-Series": {
    title: "Spring 实战",
    description:
      "Spring & Spring Boot & Spring Cloud & Alibaba Cloud 微服务与云原生实战",
    sUrl: "https://github.com/wxyyxc1992/Spring-Series",
    chapterHeader: "https://parg.co/U0y",
    depth: 1,
    localPath: `${baseLocalDir}/Spring-Series`
  },

  "DistributedSystem-Series": {
    title: "分布式基础架构",
    description:
      ":books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇",
    sUrl: "https://github.com/wxyyxc1992/DistributedSystem-Series",
    chapterHeader: "https://parg.co/U0y",
    depth: 1,
    localPath: `${baseLocalDir}/DistributedSystem-Series`
  },

  "Frontend-Series": {
    title: "大前端与数据可视化",
    description:
      ":books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇",
    sUrl: "https://github.com/wxyyxc1992/Frontend-Series",
    chapterHeader: "https://parg.co/U0y",
    depth: 1,
    localPath: `${baseLocalDir}/Frontend-Series`
  },

  "SoftwareEngineering-Series": {
    title: "软件工程与系统架构",
    description:
      ":books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇",
    sUrl: "https://github.com/wxyyxc1992/SoftwareEngineering-Series",
    chapterHeader: "https://parg.co/U0y",
    depth: 1,
    localPath: `${baseLocalDir}/SoftwareEngineering-Series`
  },

  "Product-Series": {
    title: "产品设计与交互体验",
    description:
      ":books: 产品迷思，不仅仅是产品经理，对于产品设计、交互体验、项目管理、行业视点等多方面的思考",
    sUrl: "https://github.com/wxyyxc1992/Product-Series",
    chapterHeader: "https://parg.co/U0y",
    depth: 1,
    localPath: `${baseLocalDir}/Product-Series`
  }
};

export default repos;
