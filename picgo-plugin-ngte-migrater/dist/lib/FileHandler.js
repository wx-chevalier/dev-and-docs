"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-useless-escape */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileHandler {
    constructor(ctx) {
        this.ctx = ctx;
        this.fileList = {};
        this.urlList = {};
    }
    read(file) {
        if (!fs_1.default.existsSync(file) && !(path_1.default.extname(file) === '.md')) {
            this.ctx.log.warn(`${file} is not exists`);
            return;
        }
        const content = fs_1.default.readFileSync(file, 'utf8');
        this.fileList[file] = content;
        this.getUrlListFromFileContent(file);
    }
    getUrlListFromFileContent(file) {
        const content = this.fileList[file] || '';
        const markdownURLList = (content.match(/\!\[.*\]\(.*\)/g) || []).map((item) => {
            const res = item.match(/\!\[.*\]\((.*?)( ".*")?\)/);
            if (res) {
                return res[1];
            }
            return null;
        }).filter(item => item);
        const imageTagURLList = (content.match(/<img.*?(?:>|\/>)/gi) || []).map((item) => {
            const res = item.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i);
            if (res) {
                return res[1];
            }
            return null;
        }).filter(item => item);
        const urls = markdownURLList.concat(imageTagURLList);
        this.urlList[file] = {};
        for (const url of urls) {
            this.urlList[file][url] = url;
        }
    }
    write(file, data, newSuffix = '_new', oldContentWriteToNewFile = false) {
        const baseName = path_1.default.basename(file, '.md');
        const dirName = path_1.default.dirname(file);
        const resultFileName = path_1.default.join(dirName, baseName + newSuffix + '.md');
        try {
            if (!oldContentWriteToNewFile) {
                fs_1.default.writeFileSync(resultFileName, data, 'utf8');
            }
            else {
                const oldContent = this.fileList[file] || '';
                fs_1.default.writeFileSync(resultFileName, oldContent, 'utf8');
                fs_1.default.writeFileSync(file, data, 'utf8');
            }
            this.ctx.log.success(`Write ${resultFileName} successfully`);
        }
        catch (e) {
            this.ctx.log.error(e);
        }
    }
    getFileList() {
        return this.fileList;
    }
    getUrlList() {
        return this.urlList;
    }
    getFileUrlList(file) {
        return this.urlList[file];
    }
    getFileContent(file) {
        return this.fileList[file];
    }
}
exports.default = FileHandler;
