import Message from "./Message";
import MessageType from "../Enum/MessageType";

/**
 * 图片消息
 */
export default class ImageMessage extends Message {
    private _picUrl: string;
    private _mediaId: string;

    public constructor(picUrl: string, mediaId: string) {
        super(MessageType.IMAGE);
        this._picUrl = picUrl;
        this._mediaId = mediaId;
    }

    /**
     * PicUrl field of xml
     */
    public get picUrl() {
        return this._picUrl;
    }

    /**
     * MediaId field of xml
     */
    public get mediaId() {
        return this._mediaId;
    }

    protected toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            PicUrl: this._picUrl,
            MediaId: this._mediaId
        });
    }
}
