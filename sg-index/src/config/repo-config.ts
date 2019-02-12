// @ts-check
// 存放每个仓库的配置

export interface ReposityConfig {
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

const baseLocalDir = '/Users/apple/Workspace/Repos/Docs';

// 所有仓库的声明
const repos: { [key: string]: ReposityConfig } = {
  'Awesome-Lists': {
    description:
      'Awesome Lists, Guide to Galaxy, curated, worthy and up-to-date links/reading list for ITCS-Coding/Algorithm/SoftwareArchitecture/AI. ITCS-编程/算法/软件架构/人工智能等领域的文章/书籍/资料/项目链接精选，岁月沉淀的美好',
    sUrl: 'https://github.com/wxyyxc1992/Awesome-Lists',
    chapterHeader: 'https://parg.co/UGo',
    depth: 2,
    localPath: `${baseLocalDir}/Awesome-Lists`
  },

  'Awesome-CS-Books-Warehouse': {
    description:
      ':books: Awesome CS Books/Series(.pdf by git lfs) Warehouse, ProgrammingLanguage, SoftwareEngineering, Web, AI, ServerSideApplication, Infrastructure, FE etc. :dizzy: 优秀计算机科学与技术领域相关的书籍归档',
    sUrl: 'https://github.com/wxyyxc1992/Awesome-CS-Books-Warehouse',
    chapterHeader: 'https://parg.co/UGo',
    depth: 2,
    localPath: `${baseLocalDir}/Awesome-CS-Books-Warehouse`
  },

  'Awesome-CheatSheets': {
    description:
      'Awesome-CheatSheets, :books: Ultimate CheatSheets(Tutorials&MindMap), overview of syntax, features and practical tips, collection of useful code snippets, go from zero to hero at fly. :dizzy:  干货满满的全栈开发速学速查手册集锦',
    sUrl: 'https://github.com/wxyyxc1992/Awesome-CheatSheets',
    chapterHeader: 'https://parg.co/UCb',
    depth: 2,
    localPath: `${baseLocalDir}/Awesome-CheatSheets`
  },

  'ProgrammingLanguage-Series': {
    description:
      ':books: 编程语言语法基础与工程实践，JavaScript | Java | Python | Go | Rust | CPP | Swift',
    sUrl: 'https://github.com/wxyyxc1992/ProgrammingLanguage-Series',
    chapterHeader: 'https://parg.co/USw',
    depth: 1,
    localPath: `${baseLocalDir}/ProgrammingLanguage-Series`
  },

  'Web-Series': {
    description:
      ':books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇',
    sUrl: 'https://github.com/wxyyxc1992/Web-Series',
    chapterHeader: 'https://parg.co/U0y',
    depth: 1,
    localPath: `${baseLocalDir}/Web-Series`
  },

  'AIDL-Series': {
    description:
      ':books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇',
    sUrl: 'https://github.com/wxyyxc1992/AIDL-Series',
    chapterHeader: 'https://parg.co/U0y',
    depth: 1,
    localPath: `${baseLocalDir}/AIDL-Series`
  },

  'Backend-Series': {
    description:
      ':books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇',
    sUrl: 'https://github.com/wxyyxc1992/Backend-Series',
    chapterHeader: 'https://parg.co/U0y',
    depth: 1,
    localPath: `${baseLocalDir}/Backend-Series`
  },

  'Distributed-Infrastructure-Series': {
    description:
      ':books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇',
    sUrl: 'https://github.com/wxyyxc1992/Distributed-Infrastructure-Series',
    chapterHeader: 'https://parg.co/U0y',
    depth: 1,
    localPath: `${baseLocalDir}/Distributed-Infrastructure-Series`
  },

  'Frontend-Series': {
    description:
      ':books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇',
    sUrl: 'https://github.com/wxyyxc1992/Frontend-Series',
    chapterHeader: 'https://parg.co/U0y',
    depth: 1,
    localPath: `${baseLocalDir}/Frontend-Series`
  },

  'SoftwareEngineering-Series': {
    description:
      ':books: 现代 Web 开发，现代 Web 开发导论 | 基础篇 | 进阶篇 | 架构优化篇 | React 篇 | Vue 篇',
    sUrl: 'https://github.com/wxyyxc1992/SoftwareEngineering-Series',
    chapterHeader: 'https://parg.co/U0y',
    depth: 1,
    localPath: `${baseLocalDir}/SoftwareEngineering-Series`
  }
};

export default repos;
