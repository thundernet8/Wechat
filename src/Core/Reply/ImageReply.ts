import ImageMessage from "../Message/ImageMessage";

/**
 * 图片消息回复
 */
export default class ImageReply extends ImageMessage {
    public constructor(mediaId: string) {
        super("", mediaId);
    }
}
