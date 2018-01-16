"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "text";
    MessageType["IMAGE"] = "image";
    MessageType["VOICE"] = "voice";
    MessageType["VIDEO"] = "video";
    MessageType["MUSIC"] = "music";
    MessageType["NEWS"] = "news";
    MessageType["SHORT_VIDEO"] = "shortvideo";
    MessageType["LOCATION"] = "location";
    MessageType["LINK"] = "link";
    // DEVICE_EVENT = "deviceevent",
    // DEVICE_TEXT = "devicetext",
    // FILE = "file",
    // TEXT_CARD = "textcard",
    // TRANSFER = "transfer",
    MessageType["EVENT"] = "event";
    MessageType["UNKNOWN"] = "unknown";
})(MessageType || (MessageType = {}));
exports.default = MessageType;
