"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUrlEncode =
  exports.isUrlEncode =
  exports.isUrl =
  exports.getImageSize =
    void 0;
const image_size_1 = __importDefault(require("image-size"));
const getImageSize = (buffer) => {
  try {
    const size = (0, image_size_1.default)(buffer);
    return {
      real: true,
      width: size.width,
      height: size.height,
      type: size.type,
    };
  } catch (e) {
    // fallback to default size
    return {
      real: false,
      width: 200,
      height: 200,
      type: ".png",
    };
  }
};
exports.getImageSize = getImageSize;
const isUrl = (url) => url.startsWith("http://") || url.startsWith("https://");
exports.isUrl = isUrl;
const isUrlEncode = (url) => {
  url = url || "";
  try {
    // the whole url encode or decode shold not use encodeURIComponent or decodeURIComponent
    return url !== decodeURI(url);
  } catch (e) {
    // if some error caught, try to let it go
    return true;
  }
};
exports.isUrlEncode = isUrlEncode;
const handleUrlEncode = (url) => {
  if (!(0, exports.isUrlEncode)(url)) {
    url = encodeURI(url);
  }
  return url;
};
exports.handleUrlEncode = handleUrlEncode;
