"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.T = exports.initI18n = void 0;
const zh_CN_1 = require("./zh-CN");
const en_1 = require("./en");
const initI18n = (ctx) => {
    var _a;
    // init i18n
    if ((_a = ctx === null || ctx === void 0 ? void 0 : ctx.i18n) === null || _a === void 0 ? void 0 : _a.addLocale) {
        ctx.i18n.addLocale('zh-CN', zh_CN_1.zh);
        ctx.i18n.addLocale('en', en_1.en);
    }
};
exports.initI18n = initI18n;
const T = (ctx) => (key, args = {}) => {
    var _a;
    if ((_a = ctx === null || ctx === void 0 ? void 0 : ctx.i18n) === null || _a === void 0 ? void 0 : _a.translate) {
        return ctx.i18n.translate(key, args) || zh_CN_1.zh[key];
    }
    return zh_CN_1.zh[key];
};
exports.T = T;
