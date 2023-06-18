"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-async-promise-executor */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
class Migrater {
  constructor(ctx, guiApi, filePath) {
    this.guiApi = guiApi;
    this.ctx = ctx;
    this.baseDir = path_1.default.dirname(filePath);
  }
  init(urlList) {
    this.urlArray = Object.keys(urlList);
  }
  async migrate() {
    const originTransformer = this.ctx.getConfig("picBed.transformer");
    this.ctx.setConfig({
      "picBed.transformer": "base64",
    });
    this.ctx.output = []; // a bug before picgo v1.2.2
    const include =
      this.ctx.getConfig("picgo-plugin-ngte-migrater.include") || null;
    const exclude =
      this.ctx.getConfig("picgo-plugin-ngte-migrater.exclude") || null;
    const includesReg = new RegExp(include);
    const excludesReg = new RegExp(exclude);
    const result = {
      urls: [],
      success: 0,
      total: 0,
    };
    if (!this.urlArray || this.urlArray.length === 0) {
      return result;
    }
    const toUploadURLs = this.urlArray
      .filter(
        (url) =>
          (!include || includesReg.test(url)) &&
          (!exclude || !excludesReg.test(url))
      )
      .map(async (url) => {
        return await new Promise(async (resolve, reject) => {
          result.total += 1;
          try {
            let imgInfo;
            const isUrlPath = (0, utils_1.isUrl)(url);
            if (isUrlPath) {
              imgInfo = await this.handlePicFromURL(url);
            } else {
              const picPath = this.getLocalPath(url);
              if (picPath) {
                imgInfo = await this.handlePicFromLocal(picPath, url);
              } else {
                imgInfo = undefined;
              }
            }
            resolve(imgInfo);
          } catch (err) {
            // dont reject
            resolve(undefined);
            this.ctx.log.error(err);
          }
        });
      });
    const toUploadImgs = await Promise.all(toUploadURLs).then((imgs) =>
      imgs.filter((img) => img !== undefined)
    );
    // upload
    let output = [];
    if (toUploadImgs && toUploadImgs.length > 0) {
      if (this.guiApi) {
        output = await this.guiApi.upload(toUploadImgs);
      } else {
        try {
          const res = await this.ctx.upload(toUploadImgs);
          if (Array.isArray(res)) {
            output = res;
          }
        } catch (e) {
          // fake output
          this.ctx.log.error(e);
          output = this.ctx.output;
        }
      }
    }
    result.urls = output
      .filter((item) => item.imgUrl && item.imgUrl !== item.origin)
      .map((item) => {
        return {
          original: item.origin,
          new: item.imgUrl,
        };
      });
    result.success = result.urls.length;
    this.ctx.setConfig({
      "picBed.transformer": originTransformer, // for GUI reset config
    });
    return result;
  }
  getLocalPath(imgPath) {
    let localPath = imgPath;
    if (!path_1.default.isAbsolute(localPath)) {
      localPath = path_1.default.join(this.baseDir, localPath);
    }
    if (fs_1.default.existsSync(localPath)) {
      console.log("1", localPath);
      return localPath;
    } else {
      // if path is url encode, try decode
      if ((0, utils_1.isUrlEncode)(imgPath)) {
        localPath = decodeURI(imgPath);
        if (!path_1.default.isAbsolute(localPath)) {
          localPath = path_1.default.join(this.baseDir, localPath);
        }
        if (fs_1.default.existsSync(localPath)) {
          console.log("2", localPath);
          return localPath;
        }
      }
      console.log(localPath, false);
      return false;
    }
  }
  async getPicFromURL(url) {
    const res = await this.ctx.request({
      url,
      encoding: null,
      responseType: "arraybuffer",
    });
    return res;
  }
  async handlePicFromLocal(picPath, origin) {
    if (fs_1.default.existsSync(picPath)) {
      const fileName = path_1.default.basename(picPath);
      const buffer = fs_1.default.readFileSync(picPath);
      const imgSize = (0, utils_1.getImageSize)(buffer);
      return {
        buffer,
        fileName,
        width: imgSize.width,
        height: imgSize.height,
        extname: path_1.default.extname(picPath),
        origin,
      };
    } else {
      return undefined;
    }
  }
  async handlePicFromURL(url) {
    try {
      const buffer = await this.getPicFromURL(url);
      const fileName = path_1.default.basename(url).split("?")[0].split("#")[0];
      const imgSize = (0, utils_1.getImageSize)(buffer);
      console.log(imgSize);
      return {
        buffer,
        fileName,
        width: imgSize.width,
        height: imgSize.height,
        extname: `.${imgSize.type || "png"}`,
        origin: url,
      };
    } catch (e) {
      this.ctx.log.error(
        `handle pic from url ${url} fail: ${JSON.stringify(e)}`
      );
      return undefined;
    }
  }
}
exports.default = Migrater;
