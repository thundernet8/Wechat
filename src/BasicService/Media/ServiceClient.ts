import BaseServiceClient from "../../Core/ServiceClient";
import MediaType from "../../Core/Enum/MediaType";
import { Stream } from "stream";

/**
 * Implement methods of Media resources management service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 上传图片临时素材
     * @param filePath 图片路径
     * @return string media_id
     */
    public uploadImage(filePath: string) {
        return this.httpFormUpload<{ type: MediaType; media_id: string; created_at: number }>(
            "/cgi-bin/media/upload",
            filePath,
            MediaType.IMAGE
        ).then(resp => resp.media_id);
    }

    /**
     * 上传语音临时素材
     * @param filePath 语音文件路径
     * @return string media_id
     */
    public uploadVoice(filePath: string) {
        return this.httpFormUpload<{ type: MediaType; media_id: string; created_at: number }>(
            "/cgi-bin/media/upload",
            filePath,
            MediaType.VOICE
        ).then(resp => resp.media_id);
    }

    /**
     * 上传视频临时素材
     * @param filePath 视频路径
     * @return string media_id
     */
    public uploadVideo(filePath: string, title: string, description?: string) {
        return this.httpFormUpload<{ type: MediaType; media_id: string; created_at: number }>(
            "/cgi-bin/media/upload",
            filePath,
            MediaType.VIDEO,
            {
                title,
                description
            }
        ).then(resp => resp.media_id);
    }

    /**
     * 上传缩略图临时素材
     * @param filePath 缩略图路径
     * @return string media_id
     */
    public uploadThumb(filePath: string) {
        return this.httpFormUpload<{ type: MediaType; media_id: string; created_at: number }>(
            "/cgi-bin/media/upload",
            filePath,
            MediaType.THUMB
        ).then(resp => resp.media_id);
    }

    // public uploadVideoForBroadcasting(path: string, title: string, description?: string) {
    //     // TODO
    // }

    // public createVideoForBroadcasting(mediaId: string, title: string, description?: string) {
    //     // TODO
    // }

    /**
     * 获取临时素材
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738727
     * @param mediaId
     */
    public getMediaStream(mediaId: string): Promise<Stream> {
        const params = {
            media_id: mediaId
        };
        return this.requestRaw("GET", "/cgi-bin/media/get", params).then(resp => {
            if (resp.headers["content-type"].indexOf("text") > -1) {
                return this.httpGetDownload(resp.data.video_url) as any;
            }
            return resp.data;
        });
    }
}
