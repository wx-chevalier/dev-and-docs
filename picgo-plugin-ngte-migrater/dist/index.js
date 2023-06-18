"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
const fs_1 = __importDefault(require("fs"));
const globby_1 = __importDefault(require("globby"));
const path_1 = __importDefault(require("path"));
const FileHandler_1 = __importDefault(require("./lib/FileHandler"));
const Migrater_1 = __importDefault(require("./lib/Migrater"));
const compare_versions_1 = require("compare-versions");
const i18n_1 = require("./i18n");
const replaceAll = (content, originText, replaceText) => {
  if (originText === replaceText) {
    return content;
  }
  content = content.replace(new RegExp(originText, "g"), replaceText);
  return content;
};
const checkVersion = (ctx, guiApi) => {
  if (guiApi) {
    const picgoVersion = ctx.GUI_VERSION || "1.0.0";
    if ((0, compare_versions_1.compare)(picgoVersion, "2.3.0", "<")) {
      ctx.emit("notification", {
        title: "PicGo version is lower than 2.3.0",
        body: "please upgrade PicGo version",
      });
      throw Error(
        "[ngte-migrater] picgo version is lower than 2.3.0, some features will not work, please upgrade PicGo version"
      );
    }
  } else {
    const picgoVersion = ctx.VERSION || "1.0.0";
    if ((0, compare_versions_1.compare)(picgoVersion, "1.5.0-alpha.1", "<")) {
      ctx.emit("notification", {
        title: "PicGo-Core version is lower than 1.5.0-alpha.1",
        body: "please upgrade PicGo-Core version or PicGo version",
      });
      throw Error(
        "[ngte-migrater] picgo-core version is lower than 1.5.0, some features will not work, please upgrade PicGo-Core version"
      );
    }
  }
};
const migrateFiles = async (ctx, files, guiApi = undefined) => {
  checkVersion(ctx, guiApi);
  const $T = (0, i18n_1.T)(ctx);

  if (guiApi) {
    guiApi.showNotification({
      title: $T("PIC_MIGRATER_PROCESSING"),
      body: $T("PIC_MIGRATER_BE_PATIENT"),
    });
  }
  ctx.log.info("Migrating...");
  let total = 0;
  let success = 0;
  for (const file of files) {
    const fileHandler = new FileHandler_1.default(ctx);
    // read File
    fileHandler.read(file);
    const migrater = new Migrater_1.default(ctx, guiApi, file);
    migrater.init(fileHandler.getFileUrlList(file));
    // migrate pics
    const result = await migrater.migrate();
    if (result.total === 0) {
      // early next
      continue;
    }
    total += result.total;
    success += result.success;
    if (result.success === 0 && result.total !== 0) {
      ctx.log.warn(
        `Please check your configuration, since no images migrated successfully in ${file}`
      );
      if (guiApi) {
        guiApi.showNotification({
          title: $T("PIC_MIGRATER_FAIL", {
            file,
          }),
          body: $T("PIC_MIGRATER_FAIL_TIP"),
        });
      }
    } else {
      let content = fileHandler.getFileContent(file);
      // replace content
      result.urls.forEach((item) => {
        content = replaceAll(content, item.original, item.new);
      });
      fileHandler.write(file, content, "", false);
    }
  }
  ctx.log.info(`Success: ${success} pics, Fail: ${total - success} pics`);
  if (guiApi) {
    guiApi.showNotification({
      title: $T("PIC_MIGRATER_SUCCESS"),
      body: $T("PIC_MIGRATER_SUCCESS_TIP", {
        success,
        fail: total - success,
      }),
    });
  }
  return {
    total,
    success,
  };
};
const guiMenu = (ctx) => {
  const $T = (0, i18n_1.T)(ctx);
  const userConfig = ctx.getConfig("picgo-plugin-ngte-migrater");
  return [
    {
      label: $T("PIC_MIGRATER_CHOOSE_FILE"),
      async handle(ctx, guiApi) {
        if (!userConfig) {
          return guiApi.showNotification({
            title: $T("PIC_MIGRATER_CONFIG_TIP_TITLE"),
            body: $T("PIC_MIGRATER_CONFIG_TIP_BODY"),
          });
        }
        try {
          let files = await guiApi.showFileExplorer({
            properties: ["openFile", "multiSelections"],
            filters: [
              {
                name: "Markdown Files",
                extensions: ["md"],
              },
            ],
          });
          if (files) {
            if (typeof files === "string") {
              files = [files];
            }
            await migrateFiles(ctx, files, guiApi);
          } else {
            return false;
          }
        } catch (e) {
          ctx.log.error(e);
        }
      },
    },
    {
      label: $T("PIC_MIGRATER_CHOOSE_FOLDER"),
      async handle(ctx, guiApi) {
        if (!userConfig) {
          return guiApi.showNotification({
            title: $T("PIC_MIGRATER_CONFIG_TIP_TITLE"),
            body: $T("PIC_MIGRATER_CONFIG_TIP_BODY"),
          });
        }
        const result = await guiApi.showFileExplorer({
          properties: ["openDirectory"],
        });
        if (result) {
          const sourceDir = result[0];
          let files = await (0, globby_1.default)(["**/*.md"], {
            cwd: sourceDir,
            dot: true,
          });
          files = files.map((file) => path_1.default.join(sourceDir, file));
          if (files.length > 0) {
            await migrateFiles(ctx, files, guiApi);
          }
        } else {
          return false;
        }
      },
    },
  ];
};
const config = (ctx) => {
  const $T = (0, i18n_1.T)(ctx);
  let userConfig = ctx.getConfig("picgo-plugin-ngte-migrater");
  if (!userConfig) {
    userConfig = {};
  }
  const config = [
    {
      name: "newFileSuffix",
      get alias() {
        return $T("PIC_MIGRATER_CONFIG_NEW_FILE_SUFFIX");
      },
      type: "input",
      message: "_new",
      default: userConfig.newFileSuffix,
      required: false,
    },
    {
      name: "include",
      get alias() {
        return $T("PIC_MIGRATER_CONFIG_INCLUDE");
      },
      get message() {
        return $T("PIC_MIGRATER_CONFIG_TIPS");
      },
      type: "input",
      default: userConfig.include || "",
      required: false,
    },
    {
      name: "exclude",
      get alias() {
        return $T("PIC_MIGRATER_CONFIG_EXCLUDE");
      },
      get message() {
        return $T("PIC_MIGRATER_CONFIG_TIPS");
      },
      type: "input",
      default: userConfig.exclude || "",
      required: false,
    },
    {
      name: "oldContentWriteToNewFile",
      get alias() {
        return $T("PIC_MIGRATER_CONFIG_OLD_CONTENT_WRITE_TO_NEW_FILE");
      },
      type: "confirm",
      default: false,
      required: false,
    },
  ];
  return config;
};
module.exports = (ctx) => {
  (0, i18n_1.initI18n)(ctx);
  const register = () => {
    ctx.cmd.register("migrate", {
      handle(ctx) {
        ctx.cmd.program
          .command("migrate <files...>")
          .description("migrating pictures url from markdown files")
          .action(async (files) => {
            const userConfig = ctx.getConfig("picgo-plugin-ngte-migrater");

            if (!userConfig) {
              ctx.log.warn("You should configurate this plugin first!");
              ctx.log.info("picgo set plugin ngte-migrater");
              return;
            }
            files = files.map((item) => path_1.default.resolve(item));
            let inputFiles = [];
            for (const filePath of files) {
              // make sure filePath exists
              if (fs_1.default.existsSync(filePath)) {
                const status = fs_1.default.statSync(filePath);
                if (status.isDirectory()) {
                  let mdFiles = await (0, globby_1.default)(["**/*.md"], {
                    cwd: filePath,
                    dot: true,
                  });
                  mdFiles = mdFiles.map((file) =>
                    path_1.default.resolve(filePath, file)
                  );
                  inputFiles = inputFiles.concat(mdFiles);
                } else if (status.isFile()) {
                  inputFiles.push(filePath);
                }
              }
            }
            if (inputFiles.length > 0) {
              await migrateFiles(ctx, inputFiles);
            }
          })
          .on("--help", () => {
            console.log(
              `
              Note:
              You should configurate this plugin first!
              picgo set plugin ngte-migrater

              Examples:
                # migrate file or files
                $ picgo migrate ./test.md ./test1.md

                # migrate markdown files in folder
                $ picgo migrate ./test/
                `.replace(/  +/g, "")
            );
          });
      },
    });
  };
  return {
    register,
    config,
    guiMenu,
    migrateFiles: migrateFiles.bind(null, ctx),
  };
};
