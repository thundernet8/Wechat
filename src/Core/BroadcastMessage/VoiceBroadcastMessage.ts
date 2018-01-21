import BroadcastMessage from "./BroadcastMessage";
import BroadcastMessageType from "../Enum/BroadcastMessageType";

export default class VoiceBroadcastMessage extends BroadcastMessage {
    private _mediaId: string;

    public constructor(mediaId: string) {
        super(BroadcastMessageType.VOICE);
        this._mediaId = mediaId;
    }

    public toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            voice: {
                media_id: this._mediaId
            }
        });
    }
}
