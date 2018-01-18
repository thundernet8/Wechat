import BaseServiceClient from "../../Core/ServiceClient";
import MediaType from "../../Core/Enum/MediaType";

/**
 * Implement methods of Media resources management service
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

    // public getMediaStream(mediaId: string) {
    //     // TODO
    // }
}
