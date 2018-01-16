import VoiceMessage from "../Message/VoiceMessage";

/**
 * 语音消息回复
 */
export default class VoiceReply extends VoiceMessage {
    public constructor(mediaId: string) {
        super("", mediaId);
    }
}
