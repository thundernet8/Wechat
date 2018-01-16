import MessageType from "../Enum/MessageType";
import Message from "./Message";
import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";
import VoiceMessage from "./VoiceMessage";
import VideoMessage from "./VideoMessage";
import ShortVideoMessage from "./ShortVideoMessage";
import LocationMessage from "./LocationMessage";
import LinkMessage from "./LinkMessage";
import UnknownMessage from "./UnknownMessage";

export function fromXML<T extends Message>(xmlBody: { [key: string]: string }): T {
    for (let key in xmlBody) {
        const value = xmlBody[key];
        if (Array.isArray(value)) {
            xmlBody[key] = value.length > 0 ? value[0] : "";
        }
    }
    const {
        MsgId,
        MsgType,
        FromUserName,
        ToUserName,
        CreateTime,
        Content,
        PicUrl,
        MediaId,
        Format,
        Recognition,
        ThumbMediaId,
        Location_X,
        Location_Y,
        Scale,
        Label,
        Title,
        Description,
        Url
    } = xmlBody;
    let msg: Message;
    switch (MsgType) {
        case MessageType.TEXT:
            msg = new TextMessage(Content);
            break;
        case MessageType.IMAGE:
            msg = new ImageMessage(PicUrl, MediaId);
            break;
        case MessageType.VOICE:
            msg = new VoiceMessage(Format, MediaId, Recognition);
            break;
        case MessageType.VIDEO:
            msg = new VideoMessage(ThumbMediaId, MediaId);
            break;
        case MessageType.SHORT_VIDEO:
            msg = new ShortVideoMessage(ThumbMediaId, MediaId);
            break;
        case MessageType.LOCATION:
            msg = new LocationMessage(Location_X, Location_Y, Number(Scale), Label);
            break;
        case MessageType.LINK:
            msg = new LinkMessage(Title, Description, Url);
            break;
        default:
            msg = new UnknownMessage();
    }

    msg.id = MsgId;
    msg.from = FromUserName;
    msg.to = ToUserName;
    msg.createTime = parseInt(CreateTime, 10);

    return msg as any;
}

export default {
    fromXML
};
