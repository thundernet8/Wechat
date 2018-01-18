"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType_1 = require("../Enum/MessageType");
var EventType_1 = require("../Enum/EventType");
var TextMessage_1 = require("./TextMessage");
var ImageMessage_1 = require("./ImageMessage");
var VoiceMessage_1 = require("./VoiceMessage");
var VideoMessage_1 = require("./VideoMessage");
var ShortVideoMessage_1 = require("./ShortVideoMessage");
var LocationMessage_1 = require("./LocationMessage");
var LinkMessage_1 = require("./LinkMessage");
var UnknownMessage_1 = require("./UnknownMessage");
var SubscribeEvent_1 = require("../Event/SubscribeEvent");
var UnsubscribeEvent_1 = require("../Event/UnsubscribeEvent");
var ScanEvent_1 = require("../Event/ScanEvent");
var LocationEvent_1 = require("../Event/LocationEvent");
var ClickEvent_1 = require("../Event/ClickEvent");
var ViewEvent_1 = require("../Event/ViewEvent");
var UnknownEvent_1 = require("../Event/UnknownEvent");
function assembleEventMessage(xmlBody) {
    var Event = xmlBody.Event, EventKey = xmlBody.EventKey, Ticket = xmlBody.Ticket, Latitude = xmlBody.Latitude, Longitude = xmlBody.Longitude, Precision = xmlBody.Precision;
    var msg;
    switch (Event) {
        case EventType_1.default.SUBSCRIBE:
            msg = new SubscribeEvent_1.default(EventKey, Ticket);
            break;
        case EventType_1.default.UNSUBSCRIBE:
            msg = new UnsubscribeEvent_1.default();
            break;
        case EventType_1.default.SCAN:
            msg = new ScanEvent_1.default(EventKey, Ticket);
            break;
        case EventType_1.default.LOCATION:
            msg = new LocationEvent_1.default(Latitude, Longitude, Precision);
            break;
        case EventType_1.default.CLICK:
            msg = new ClickEvent_1.default(EventKey);
            break;
        case EventType_1.default.VIEW:
            msg = new ViewEvent_1.default(EventKey);
            break;
        default:
            msg = new UnknownEvent_1.default();
    }
    return msg;
}
function fromXML(xmlBody) {
    for (var key in xmlBody) {
        var value = xmlBody[key];
        if (Array.isArray(value)) {
            xmlBody[key] = value.length > 0 ? value[0] : "";
        }
    }
    var MsgId = xmlBody.MsgId, MsgType = xmlBody.MsgType, FromUserName = xmlBody.FromUserName, ToUserName = xmlBody.ToUserName, CreateTime = xmlBody.CreateTime, Content = xmlBody.Content, PicUrl = xmlBody.PicUrl, MediaId = xmlBody.MediaId, Format = xmlBody.Format, Recognition = xmlBody.Recognition, ThumbMediaId = xmlBody.ThumbMediaId, Location_X = xmlBody.Location_X, Location_Y = xmlBody.Location_Y, Scale = xmlBody.Scale, Label = xmlBody.Label, Title = xmlBody.Title, Description = xmlBody.Description, Url = xmlBody.Url;
    var msg;
    switch (MsgType) {
        case MessageType_1.default.TEXT:
            msg = new TextMessage_1.default(Content);
            break;
        case MessageType_1.default.IMAGE:
            msg = new ImageMessage_1.default(PicUrl, MediaId);
            break;
        case MessageType_1.default.VOICE:
            msg = new VoiceMessage_1.default(Format, MediaId, Recognition);
            break;
        case MessageType_1.default.VIDEO:
            msg = new VideoMessage_1.default(ThumbMediaId, MediaId);
            break;
        case MessageType_1.default.SHORT_VIDEO:
            msg = new ShortVideoMessage_1.default(ThumbMediaId, MediaId);
            break;
        case MessageType_1.default.LOCATION:
            msg = new LocationMessage_1.default(Location_X, Location_Y, Number(Scale), Label);
            break;
        case MessageType_1.default.LINK:
            msg = new LinkMessage_1.default(Title, Description, Url);
            break;
        case MessageType_1.default.EVENT:
            msg = assembleEventMessage(xmlBody);
            break;
        default:
            msg = new UnknownMessage_1.default();
    }
    msg.id = MsgId;
    msg.from = FromUserName;
    msg.to = ToUserName;
    msg.createTime = parseInt(CreateTime, 10);
    return msg;
}
exports.fromXML = fromXML;
exports.default = {
    fromXML: fromXML
};
