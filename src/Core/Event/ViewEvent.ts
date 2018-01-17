import EventMessage from "../Message/EventMessage";
import EventType from "../Enum/EventType";

/**
 * 自定义菜单事件(点击菜单跳转链接时的事件推送)
 */
export default class SubscribeEvent extends EventMessage {
    private _eventKey: string;

    public constructor(eventKey: string) {
        super(EventType.VIEW);
        this._eventKey = eventKey || "";
    }

    /**
     * 事件KEY值，设置的跳转URL
     */
    public get eventKey() {
        return this._eventKey;
    }
}
