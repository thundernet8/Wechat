import Message from "./Message";
import MessageType from "../Enum/MessageType";

/**
 * 视频消息
 */
export default class VideoMessage extends Message {
    private _thumbMediaId: string;
    private _mediaId: string;

    public constructor(thumbMediaId: string, mediaId: string) {
        super(MessageType.VIDEO);
        this._thumbMediaId = thumbMediaId;
        this._mediaId = mediaId;
    }

    /**
     * 视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据
     */
    public get thumbMediaId() {
        return this._thumbMediaId;
    }

    /**
     * 视频消息媒体id，可以调用多媒体文件下载接口拉取数据
     */
    public get mediaId() {
        return this._mediaId;
    }

    protected toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            ThumbMediaId: this._thumbMediaId,
            MediaId: this._mediaId
        });
    }
}
