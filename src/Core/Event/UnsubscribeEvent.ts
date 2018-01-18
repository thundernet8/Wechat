import EventMessage from "../Message/EventMessage";
import EventType from "../Enum/EventType";

/**
 * 取消关注事件
 */
export default class UnsubscribeEvent extends EventMessage {
    public constructor() {
        super(EventType.UNSUBSCRIBE);
    }
}
