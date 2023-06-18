/// <reference types="node" />
import { IImgInfo, PicGo } from 'picgo';
declare class Migrater {
    ctx: PicGo;
    guiApi: any;
    urlArray: string[];
    baseDir: string;
    constructor(ctx: PicGo, guiApi: any, filePath: string);
    init(urlList: IStringKeyMap): void;
    migrate(): Promise<IMigrateResult>;
    getLocalPath(imgPath: string): string | false;
    getPicFromURL(url: string): Promise<Buffer>;
    handlePicFromLocal(picPath: string, origin: string): Promise<IImgInfo | undefined>;
    handlePicFromURL(url: string): Promise<IImgInfo | undefined>;
}
export default Migrater;
