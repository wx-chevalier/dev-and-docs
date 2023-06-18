/// <reference types="node" />
import { IImgSize } from 'picgo';
interface IImgSizeInfo extends IImgSize {
    type?: string;
}
export declare const getImageSize: (buffer: Buffer) => IImgSizeInfo;
export declare const isUrl: (url: string) => boolean;
export declare const isUrlEncode: (url: string) => boolean;
export declare const handleUrlEncode: (url: string) => string;
export {};
