import BroadcastMessage from "./BroadcastMessage";
import BroadcastMessageType from "../Enum/BroadcastMessageType";

export default class NewsBroadcastMessage extends BroadcastMessage {
    private _mediaId: string;
    private _ignoreReprint: boolean;

    /**
     * @param mediaId
     * @param ignoreReprint 图文消息被判定为转载时，是否继续群发。 1为继续群发（转载），0为停止群发。 该参数默认为0
     */
    public constructor(mediaId: string, ignoreReprint: boolean = false) {
        super(BroadcastMessageType.MP_NEWS);
        this._mediaId = mediaId;
        this._ignoreReprint = !!ignoreReprint;
    }

    public toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            mpnews: {
                media_id: this._mediaId
            },
            send_ignore_reprint: this._ignoreReprint ? 1 : 0
        });
    }
}
