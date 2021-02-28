import * as walkSync from "walk-sync";

const destDir = "/Users/zhangzixiong/Desktop/UT/docs/发票";

const files = walkSync(destDir);

console.log(
  files.reduce((prev, cur) => {
    const fileName = cur.split("/")[1];

    if (!fileName) {
      return prev;
    }

    console.log(fileName, Number(fileName.split("-")[0]));

    return prev + (Number(fileName.split("-")[0]) || 0);
  }, 0)
);
