import BroadcastMessage from "./BroadcastMessage";
import BroadcastMessageType from "../Enum/BroadcastMessageType";

export default class CardBroadcastMessage extends BroadcastMessage {
    private _cardId: string;

    public constructor(cardId: string) {
        super(BroadcastMessageType.WX_CARD);
        this._cardId = cardId;
    }

    public toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            wxcard: {
                card_id: this._cardId
            }
        });
    }
}
