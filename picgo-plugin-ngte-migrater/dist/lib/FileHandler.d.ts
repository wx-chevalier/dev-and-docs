import { PicGo } from 'picgo';
declare class FileHandler {
    ctx: PicGo;
    fileList: IFileList;
    urlList: IURLList;
    constructor(ctx: PicGo);
    read(file: string): void;
    getUrlListFromFileContent(file: string): void;
    write(file: string, data: string, newSuffix?: string, oldContentWriteToNewFile?: boolean): void;
    getFileList(): IFileList;
    getUrlList(): IURLList;
    getFileUrlList(file: string): IStringKeyMap;
    getFileContent(file: string): string;
}
export default FileHandler;
