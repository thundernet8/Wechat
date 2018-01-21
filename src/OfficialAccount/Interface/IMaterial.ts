import IWXCommonResp from "../../Core/Interface/IWXCommonResp";
import IArticle from "./IArticle";

interface INewsItem {
    title: string;
    thumb_media_id: string;
    show_cover_pic: 0 | 1;
    author: string;
    digest: string;
    content: string;
    url: string;
    content_source_url: string;
}

interface IMaterialItem {
    media_id: string;
    content: {
        news_item: INewsItem[];
    };
    update_time: string;
}

export interface IUploadCommonResp {
    media_id: string;
    url: string;
}

export interface IUploadNewsImageResp {
    url: string;
}

export interface IUploadNewsResp {
    media_id: string;
}

export interface IGetNewsMaterialResp {
    news_item: INewsItem;
}

export interface IGetVideoMaterialResp {
    title: string;
    description: string;
    down_url: string;
}

export interface IDeleteMaterialResp extends IWXCommonResp {}

export interface IGetMaterialListResp {
    total_count: number;
    item_count: number;
    item: IMaterialItem[];
}

export interface IGetMaterialCountResp {
    voice_count: number;
    video_count: number;
    image_count: number;
    news_count: number;
}
