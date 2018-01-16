import Message from "./Message";
import MessageType from "../Enum/MessageType";

/**
 * 语音消息
 */
export default class VoiceMessage extends Message {
    private _format: string;
    private _mediaId: string;
    private _recognition: string;

    public constructor(format: string, mediaId: string, recognition?: string) {
        super(MessageType.VOICE);
        this._format = format;
        this._mediaId = mediaId;
        this._recognition = recognition || "";
    }

    /**
     * 语音格式，如amr，speex等
     */
    public get format() {
        return this._format;
    }

    /**
     * 语音消息媒体id，可以调用多媒体文件下载接口拉取数据
     */
    public get mediaId() {
        return this._mediaId;
    }

    /**
     * Recognition field of xml(语音识别结果)
     */
    public get recognition() {
        return this._recognition;
    }

    protected toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            Format: this._format,
            MediaId: this._mediaId,
            Recognition: this._recognition
        });
    }
}
