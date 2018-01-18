import EventMessage from "../Message/EventMessage";
import EventType from "../Enum/EventType";

/**
 * 上报地理位置事件
 */
export default class LocationEvent extends EventMessage {
    private _latitude: string;
    private _longitude: string;
    private _precision: string;

    public constructor(latitude: string, longitude: string, precision: string) {
        super(EventType.LOCATION);
        this._latitude = latitude || "";
        this._longitude = longitude || "";
        this._precision = precision || "";
    }

    /**
     * 地理位置纬度
     */
    public get latitude() {
        return this._latitude;
    }

    /**
     * 地理位置经度
     */
    public get longitude() {
        return this._longitude;
    }

    /**
     * 地理位置精度
     */
    public get precision() {
        return this._precision;
    }
}
