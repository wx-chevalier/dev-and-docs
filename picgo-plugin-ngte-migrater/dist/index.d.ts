import { IGuiMenuItem, PicGo, IPluginConfig } from 'picgo';
declare const _default: (ctx: PicGo) => {
    register: () => void;
    config: (ctx: PicGo) => IPluginConfig[];
    guiMenu: (ctx: PicGo) => IGuiMenuItem[];
    migrateFiles: any;
};
export = _default;
