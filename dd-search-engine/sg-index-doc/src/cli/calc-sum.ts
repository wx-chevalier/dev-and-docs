import * as walkSync from "walk-sync";

const destDir =
  "/Users/zhangzixiong/Library/Containers/com.kingsoft.wpsoffice.mac/Data/Library/Application Support/Kingsoft/WPS Cloud Files/userdata/qing/filecache/27701737/联泰/财务、采购、公共关系/发票";

const files = walkSync(destDir);

console.log(
  files.reduce((prev, cur) => {
    const fileName = cur.split("/")[2];

    if (!fileName || !fileName.endsWith("pdf")) {
      return prev;
    }

    console.log(fileName, Number(fileName.split("-")[0]));

    return prev + (Number(fileName.split("-")[0]) || 0);
  }, 0)
);
