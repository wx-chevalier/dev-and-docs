const os = require("os");
const program = require("commander");
const fs = require("fs-extra");

program
  .version("0.0.1")
  .option(
    "-d, --directory [directory]",
    "工作目录，默认为当前目录",
    os.homedir() + "/Desktop"
  );

program.parse(process.argv);

const targetDir = "/Users/zhangzixiong/Desktop/Docs/Web-Series";

const skippedDirs = [".github", ".meta"];

(async () => {
  const files = await fs.lstat(targetDir);
  console.log(files);
})();
