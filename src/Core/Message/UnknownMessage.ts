import Message from "./Message";
import MessageType from "../Enum/MessageType";

/**
 * 未知消息
 */
export default class UnknownMessage extends Message {
    public constructor() {
        super(MessageType.UNKNOWN);
    }
}
