import EventMessage from "../Message/EventMessage";
import EventType from "../Enum/EventType";

/**
 * 自定义菜单事件(点击菜单拉取消息时的事件推送)
 */
export default class SubscribeEvent extends EventMessage {
    private _eventKey: string;

    public constructor(eventKey: string) {
        super(EventType.CLICK);
        this._eventKey = eventKey || "";
    }

    /**
     * 事件KEY值，与自定义菜单接口中KEY值对应
     */
    public get eventKey() {
        return this._eventKey;
    }
}
