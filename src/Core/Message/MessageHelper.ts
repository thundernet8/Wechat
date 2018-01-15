import MessageType from "../Enum/MessageType";
import Message from "./Message";
import TextMessage from "./TextMessage";

export function fromXML<T extends Message>(xmlBody: { [key: string]: string }): T {
    for (let key in xmlBody) {
        const value = xmlBody[key];
        if (Array.isArray(value)) {
            xmlBody[key] = value.length > 0 ? value[0] : "";
        }
    }
    const { MsgId, MsgType, Content, FromUserName, ToUserName, CreateTime } = xmlBody;
    switch (MsgType) {
        case MessageType.TEXT:
            return new TextMessage(
                MsgId,
                FromUserName,
                ToUserName,
                Content,
                parseInt(CreateTime, 10)
            ) as any;
        default:
            return new TextMessage(
                MsgId,
                FromUserName,
                ToUserName,
                Content,
                parseInt(CreateTime, 10)
            ) as any;
    }
}

export default {
    fromXML
};
