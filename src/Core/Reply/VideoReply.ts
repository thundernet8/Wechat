import VideoMessage from "../Message/VideoMessage";

/**
 * 视频消息回复
 */
export default class VideoReply extends VideoMessage {
    public constructor(mediaId: string, title: string, description: string) {
        super("", mediaId, title, description);
    }
}
