import MessageType from "../Enum/MessageType";
import Message from "./Message";
import TextMessage from "./TextMessage";

export function fromXML<T extends Message>(xmlBody: { [key: string]: string }): T {
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
