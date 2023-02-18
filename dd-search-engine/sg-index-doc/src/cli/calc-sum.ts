import * as walkSync from "walk-sync";

// const destDir = "/Users/zhangzixiong/Downloads/张梓雄/替换 5240";
const destDir =
  "/Users/zhangzixiong/Library/Containers/com.kingsoft.wpsoffice.mac/Data/Library/Application Support/Kingsoft/WPS Cloud Files/userdata/qing/filecache/27701737/联泰/财务、采购、公共关系/发票/2022/待报销/张梓雄/B3";

// const destDir =
//   "/Users/zhangzixiong/Library/Containers/com.kingsoft.wpsoffice.mac/Data/Library/Application Support/Kingsoft/WPS Cloud Files/userdata/qing/filecache/27701737/联泰/财务、采购、公共关系/发票/2022/待分配";

const files = walkSync(destDir);
let count = 0;
const totalNum = files.reduce((prev, cur) => {
  const fileName = cur.split("/")[0];

  if (!fileName && !fileName.endsWith("pdf")) {
    return prev;
  }

  count++;

  if (fileName.includes("(")) {
    console.log(fileName, Number(fileName.split("-")[0]));
  }

  return prev + (Number(fileName.split("-")[0]) || 0);
}, 0);

console.log(count, totalNum);
