import BroadcastMessage from "./BroadcastMessage";
import BroadcastMessageType from "../Enum/BroadcastMessageType";

export default class VideoBroadcastMessage extends BroadcastMessage {
    private _mediaId: string;

    public constructor(mediaId: string) {
        super(BroadcastMessageType.MP_VIDEO);
        this._mediaId = mediaId;
    }

    public toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            mpvideo: {
                media_id: this._mediaId
            }
        });
    }
}
