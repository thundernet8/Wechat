import Message from "./Message";
import MessageType from "../Enum/MessageType";
import EventType from "../Enum/EventType";

/**
 * 事件消息
 */
export default class EventMessage extends Message {
    private _event: EventType;

    public constructor(event: EventType) {
        super(MessageType.EVENT);
        this._event = event;
    }

    /**
     * 事件类型
     */
    public get event() {
        return this._event;
    }
}
