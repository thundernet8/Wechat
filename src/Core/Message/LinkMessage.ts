import Message from "./Message";
import MessageType from "../Enum/MessageType";

/**
 * 链接消息
 */
export default class LinkMessage extends Message {
    private _title: string;
    private _description: string;
    private _url: string;

    public constructor(title: string, description: string, url: string) {
        super(MessageType.LINK);
        this._title = title;
        this._description = description;
        this._url = url;
    }

    /**
     * 消息标题
     */
    public get title() {
        return this._title;
    }

    /**
     * 消息描述
     */
    public get description() {
        return this._description;
    }

    /**
     * 消息链接
     */
    public get url() {
        return this._url;
    }

    protected toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            Title: this._title,
            Description: this._description,
            Url: this._url
        });
    }
}
