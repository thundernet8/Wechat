import EventMessage from "../Message/EventMessage";
import EventType from "../Enum/EventType";

/**
 * 关注事件(包括扫码触发的关注事件)
 */
export default class SubscribeEvent extends EventMessage {
    private _eventKey: string;
    private _ticket: string;

    public constructor(eventKey?: string, ticket?: string) {
        super(EventType.SUBSCRIBE);
        this._eventKey = eventKey || "";
        this._ticket = ticket || "";
    }

    /**
     * 事件KEY值，qrscene_为前缀，后面为二维码的参数值(扫描带参数二维码事件未关注的先关注公众号)
     */
    public get eventKey() {
        return this._eventKey;
    }

    /**
     * 二维码的ticket，可用来换取二维码图片(扫描二维码关注时)
     */
    public get ticket() {
        return this._ticket;
    }
}
