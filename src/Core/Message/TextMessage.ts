import Message from "./Message";
import MessageType from "../Enum/MessageType";

/**
 * 普通文本消息
 */
export default class TextMessage extends Message {
    public constructor(id: string, from: string, to: string, content: string, createTime: number) {
        super(id, MessageType.TEXT, from, to, content, createTime);
    }

    protected toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            Content: this.content
        });
    }
}
