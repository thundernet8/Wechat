import BroadcastMessage from "./BroadcastMessage";
import BroadcastMessageType from "../Enum/BroadcastMessageType";

export default class TextBroadcastMessage extends BroadcastMessage {
    private _content: string;

    public constructor(content: string) {
        super(BroadcastMessageType.TEXT);
        this._content = content;
    }

    public toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            text: {
                content: this._content
            }
        });
    }
}
