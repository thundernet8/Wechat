import Message from "./Message";
import MessageType from "../Enum/MessageType";

/**
 * 视频消息
 */
export default class VideoMessage extends Message {
    private _thumbMediaId: string;
    private _mediaId: string;
    private _title: string; // 仅开发者回复此类消息时可用
    private _description: string; // 仅开发者回复此类消息时可用

    public constructor(
        thumbMediaId: string,
        mediaId: string,
        title?: string,
        description?: string
    ) {
        super(MessageType.VIDEO);
        this._thumbMediaId = thumbMediaId;
        this._mediaId = mediaId;
        this._title = title || "";
        this._description = description || "";
    }

    public get title() {
        return this._title;
    }

    public get description() {
        return this._description;
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
            MediaId: this._mediaId,
            Title: this._title,
            Description: this._description
        });
    }
}
