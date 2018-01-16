import Message from "./Message";
import MessageType from "../Enum/MessageType";

/**
 * 普通文本消息
 */
export default class TextMessage extends Message {
    private _content: string;

    public constructor(content: string) {
        super(MessageType.TEXT);
        this._content = content;
    }

    /**
     * 文本消息内容
     */
    public get content() {
        return this._content;
    }

    protected toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            Content: this._content
        });
    }
}
