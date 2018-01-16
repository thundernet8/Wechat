import TextMessage from "../Message/TextMessage";

/**
 * 文本消息回复
 */
export default class TextReply extends TextMessage {
    public constructor(content: string) {
        super(content);
    }
}
