import * as json2xml from "json2xml";
import MessageType from "../Enum/MessageType";
import TextMessage from "./TextMessage";

export default abstract class Message {
    public static fromXML<T extends Message>(xmlBody: { [key: string]: string }) {
        const { MsgId, MsgType, Content, FromUserName, ToUserName, CreateTime } = xmlBody;
        switch (MsgType) {
            case MessageType.TEXT:
                return new TextMessage(
                    MsgId,
                    FromUserName,
                    ToUserName,
                    Content,
                    parseInt(CreateTime, 10)
                );
            default:
                return new TextMessage(
                    MsgId,
                    FromUserName,
                    ToUserName,
                    Content,
                    parseInt(CreateTime, 10)
                );
        }
    }

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
    public id: string;

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
    public content: string;

    protected abstract toPOJO();

    public toJSON() {
        return JSON.stringify(this.toPOJO());
    }

    public toXML() {
        return json2xml(this.toPOJO(), { header: false });
    }
}
