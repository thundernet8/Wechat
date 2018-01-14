import Message from "./Message";
import MessageType from "../Enum/MessageType";

export default class TextMessage extends Message {
    public constructor(id: string, from: string, to: string, content: string, createTime: number) {
        super(id, MessageType.TEXT, from, to, content, createTime);
    }

    protected toPOJO() {
        return {
            ToUserName: this.to,
            FromUserName: this.from,
            CreateTime: this.createTime,
            MsgType: this.type,
            Content: this.content
        };
    }
}
