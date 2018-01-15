import MessageType from "../Enum/MessageType";
import { renderXML } from "./MessageHelper";

export default abstract class Message {
    protected constructor(
        id: string,
        type: MessageType,
        from: string,
        to: string,
        content: string,
        createTime: number
    ) {
        this.id = id;
        this.type = type;
        this.from = from;
        this.to = to;
        this.content = content;
        this.createTime = createTime;
    }

    /**
     * MsgId field of xml
     */
    public id?: string;

    /**
     * MsgType of xml
     */
    public type: MessageType = MessageType.TEXT;

    /**
     * ToUserName field of xml
     */
    public to: string;

    /**
     * FromUserName field of xml
     */
    public from: string;

    /**
     * CreateTime field of xml(string)
     */
    public createTime: number;

    /**
     * Content field of xml
     */
    public content: any;

    protected toPOJO() {
        return {
            ToUserName: this.to,
            FromUserName: this.from,
            CreateTime: this.createTime,
            MsgType: this.type
        };
    }

    public toJSON() {
        return JSON.stringify(this.toPOJO());
    }

    public toXML() {
        return renderXML(this.toPOJO());
    }
}
