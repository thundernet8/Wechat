import BroadcastMessageType from "../Enum/BroadcastMessageType";

export default abstract class BroadcastMessage {
    protected _type: BroadcastMessageType = BroadcastMessageType.TEXT;

    public constructor(type: BroadcastMessageType) {
        this._type = type;
    }

    public get type() {
        return this._type;
    }

    public toPOJO() {
        return {
            msgtype: this._type
        };
    }
}
