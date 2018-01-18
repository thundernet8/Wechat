import EventMessage from "../Message/EventMessage";
import EventType from "../Enum/EventType";

/**
 * 扫码事件(已经关注了公众号)
 */
export default class ScanEvent extends EventMessage {
    private _eventKey: number;
    private _ticket: string;

    public constructor(eventKey?: string, ticket?: string) {
        super(EventType.SCAN);
        this._eventKey = Number(eventKey) || 0;
        this._ticket = ticket || "";
    }

    /**
     * 事件KEY值，是一个32位无符号整数，即创建二维码时的二维码scene_id
     */
    public get eventKey() {
        return this._eventKey;
    }

    /**
     * 二维码的ticket，可用来换取二维码图片
     */
    public get ticket() {
        return this._ticket;
    }
}
