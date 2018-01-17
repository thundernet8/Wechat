"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140454
 */
var EventType;
(function (EventType) {
    EventType["SUBSCRIBE"] = "subscribe";
    EventType["UNSUBSCRIBE"] = "unsubscribe";
    EventType["SCAN"] = "SCAN";
    EventType["LOCATION"] = "LOCATION";
    EventType["CLICK"] = "CLICK";
    EventType["VIEW"] = "VIEW";
    EventType["UNKNOWN"] = "unknown";
})(EventType || (EventType = {}));
exports.default = EventType;
