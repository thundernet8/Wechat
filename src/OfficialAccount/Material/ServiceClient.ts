import BaseServiceClient from "../../Core/ServiceClient";
import MediaType from "../../Core/Enum/MediaType";
import {
    IUploadCommonResp,
    IUploadNewsImageResp,
    IUploadNewsResp,
    IGetNewsMaterialResp,
    IGetVideoMaterialResp,
    IDeleteMaterialResp,
    IGetMaterialListResp,
    IGetMaterialCountResp
} from "../Interface/IMaterial";
import IArticle from "../Interface/IArticle";
import { Stream } from "stream";

/**
 * Implement methods of Material management service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * Allowed media types
     */
    private allowTypes: MediaType[] = [
        MediaType.IMAGE,
        MediaType.VOICE,
        MediaType.VIDEO,
        MediaType.THUMB,
        MediaType.NEWS_IMAGE
    ];

    /**
     * 上传图片永久素材
     * @param path
     */
    public uploadImage(path: string) {
        return this.upload<IUploadCommonResp>(MediaType.IMAGE, path);
    }

    /**
     * 上传语音永久素材
     * @param path
     */
    public uploadVoice(path: string) {
        return this.upload<IUploadCommonResp>(MediaType.VOICE, path);
    }

    /**
     * 上传缩略图永久素材
     * @param path
     */
    public uploadThumb(path: string) {
        return this.upload<IUploadCommonResp>(MediaType.THUMB, path);
    }

    /**
     * 上传视频永久素材
     * @param path
     * @param title
     * @param description
     */
    public uploadVideo(path: string, title: string, description: string) {
        const data = {
            description: JSON.stringify({
                title,
                introduction: description
            })
        };
        return this.upload(MediaType.VIDEO, path, data);
    }

    /**
     * 新增永久图文消息素材
     * @param articles
     */
    public uploadArticle(articles: IArticle[]) {
        const data = {
            articles
        };
        return this.httpPost<IUploadNewsResp>("/cgi-bin/material/add_news", data);
    }

    /**
     * 修改永久图文素材
     * @param mediaId
     * @param article
     * @param index
     */
    public updateArticle(mediaId: string, article: IArticle, index: number = 0) {
        const data = {
            media_id: mediaId,
            index,
            articles: article
        };
        return this.httpPost<string>("/cgi-bin/material/update_news", data);
    }

    /**
     * 上传图文消息内的图片获取URL
     * @param path
     */
    public uploadArticleImage<IUploadNewsImageResp>(path: string) {
        return this.upload<IUploadNewsImageResp>(MediaType.NEWS_IMAGE, path);
    }

    /**
     * 获取永久素材
     * @param mediaId
     */
    public get(mediaId: string): Promise<IGetNewsMaterialResp | IGetVideoMaterialResp | Stream> {
        const data = {
            media_id: mediaId
        };
        return this.requestRaw("POST", "/cgi-bin/material/get_material", data).then(
            resp => resp.data
        );
    }

    /**
     * 删除永久素材
     * @param mediaId
     */
    public delete(mediaId: string) {
        const data = {
            media_id: mediaId
        };
        return this.httpPost<IDeleteMaterialResp>("/cgi-bin/material/del_material", data);
    }

    /**
     * 获取素材列表
     * @param type
     * @param offset
     * @param count
     */
    public list(type: string, offset: number = 0, count: number = 20) {
        const data = {
            type,
            offset,
            count: Math.min(20, count)
        };
        return this.httpPost<IGetMaterialListResp>("/cgi-bin/material/batchget_material", data);
    }

    /**
     * 获取素材总数
     */
    public stats() {
        return this.httpGet<IGetMaterialCountResp>("/cgi-bin/material/get_materialcount");
    }

    /**
     * Upload media
     * @param type
     * @param filePath
     * @param data
     */
    private upload<T>(type: MediaType, filePath: string, data?: { [key: string]: any }) {
        if (!this.allowTypes.includes(type)) {
            throw new Error(`Invalid media type ${type}`);
        }
        const endpoint =
            type === "news_image" ? "/cgi-bin/media/uploadimg" : "/cgi-bin/material/add_material";
        return this.httpFormUpload<T>(endpoint, filePath, type, data);
    }
}
