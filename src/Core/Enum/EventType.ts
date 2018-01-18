/**
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140454
 */
enum EventType {
    SUBSCRIBE = "subscribe",
    UNSUBSCRIBE = "unsubscribe",
    SCAN = "SCAN",
    LOCATION = "LOCATION",
    CLICK = "CLICK",
    VIEW = "VIEW",
    UNKNOWN = "unknown"
}

export default EventType;
