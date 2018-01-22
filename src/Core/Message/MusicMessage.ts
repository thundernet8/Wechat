import Message from "./Message";
import MessageType from "../Enum/MessageType";

/**
 * 音乐消息(仅开发者回复可用)
 */
export default class MusicMessage extends Message {
    private _title: string;
    private _description: string;
    private _musicUrl: string;
    private _hqMusicUrl: string;
    private _thumbMediaId: string;

    public constructor(
        title: string,
        description: string,
        musicUrl: string,
        hqMusicUrl: string,
        thumbMediaId: string
    ) {
        super(MessageType.MUSIC);
        this._title = title;
        this._description = description;
        this._musicUrl = musicUrl;
        this._hqMusicUrl = hqMusicUrl;
        this._thumbMediaId = thumbMediaId;
    }

    public get title() {
        return this._title;
    }

    public get description() {
        return this._description;
    }

    public get musicUrl() {
        return this._musicUrl;
    }

    public get hqMusicUrl() {
        return this._hqMusicUrl;
    }

    public get thumbMediaId() {
        return this._thumbMediaId;
    }

    protected toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            Title: this._title,
            Description: this._description,
            MusicURL: this._musicUrl,
            HQMusicUrl: this._hqMusicUrl,
            ThumbMediaId: this._thumbMediaId
        });
    }
}
