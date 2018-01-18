import EventMessage from "../Message/EventMessage";
import EventType from "../Enum/EventType";

/**
 * 未知事件
 */
export default class UnknownEvent extends EventMessage {
    public constructor() {
        super(EventType.UNKNOWN);
    }
}
