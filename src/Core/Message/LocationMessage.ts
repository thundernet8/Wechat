import Message from "./Message";
import MessageType from "../Enum/MessageType";

/**
 * 地理位置消息
 */
export default class LocationMessage extends Message {
    private _locationX: string;
    private _locationY: string;
    private _scale: number;
    private _label: string;

    public constructor(locationX: string, locationY: string, scale: number, label: string) {
        super(MessageType.LOCATION);
        this._locationX = locationX;
        this._locationY = locationY;
        this._scale = scale;
        this._label = label;
    }

    /**
     * 地理位置维度
     */
    public get locationX() {
        return this._locationX;
    }

    /**
     * 地理位置经度
     */
    public get locationY() {
        return this._locationY;
    }

    /**
     * 地图缩放大小
     */
    public get scale() {
        return this._scale;
    }

    /**
     * 地理位置信息
     */
    public get label() {
        return this._label;
    }

    protected toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            Location_X: this._locationX,
            Location_Y: this._locationY,
            Scale: this._scale,
            Label: this._label
        });
    }
}
