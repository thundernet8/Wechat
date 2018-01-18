import MessageType from "../Enum/MessageType";
import EventType from "../Enum/EventType";
import Message from "./Message";
import TextMessage from "./TextMessage";
import ImageMessage from "./ImageMessage";
import VoiceMessage from "./VoiceMessage";
import VideoMessage from "./VideoMessage";
import ShortVideoMessage from "./ShortVideoMessage";
import LocationMessage from "./LocationMessage";
import LinkMessage from "./LinkMessage";
import UnknownMessage from "./UnknownMessage";
import EventMessage from "./EventMessage";
import SubscribeEvent from "../Event/SubscribeEvent";
import UnsubscribeEvent from "../Event/UnsubscribeEvent";
import ScanEvent from "../Event/ScanEvent";
import LocationEvent from "../Event/LocationEvent";
import ClickEvent from "../Event/ClickEvent";
import ViewEvent from "../Event/ViewEvent";
import UnknownEvent from "../Event/UnknownEvent";

function assembleEventMessage(xmlBody: { [key: string]: string }) {
    const { Event, EventKey, Ticket, Latitude, Longitude, Precision } = xmlBody;

    let msg: EventMessage;
    switch (Event) {
        case EventType.SUBSCRIBE:
            msg = new SubscribeEvent(EventKey, Ticket);
            break;
        case EventType.UNSUBSCRIBE:
            msg = new UnsubscribeEvent();
            break;
        case EventType.SCAN:
            msg = new ScanEvent(EventKey, Ticket);
            break;
        case EventType.LOCATION:
            msg = new LocationEvent(Latitude, Longitude, Precision);
            break;
        case EventType.CLICK:
            msg = new ClickEvent(EventKey);
            break;
        case EventType.VIEW:
            msg = new ViewEvent(EventKey);
            break;
        default:
            msg = new UnknownEvent();
    }

    return msg;
}

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
        case MessageType.EVENT:
            msg = assembleEventMessage(xmlBody);
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
