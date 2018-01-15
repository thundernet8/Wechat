"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType_1 = require("../Enum/MessageType");
var TextMessage_1 = require("./TextMessage");
function fromXML(xmlBody) {
    var MsgId = xmlBody.MsgId, MsgType = xmlBody.MsgType, Content = xmlBody.Content, FromUserName = xmlBody.FromUserName, ToUserName = xmlBody.ToUserName, CreateTime = xmlBody.CreateTime;
    switch (MsgType) {
        case MessageType_1.default.TEXT:
            return new TextMessage_1.default(MsgId, FromUserName, ToUserName, Content, parseInt(CreateTime, 10));
        default:
            return new TextMessage_1.default(MsgId, FromUserName, ToUserName, Content, parseInt(CreateTime, 10));
    }
}
exports.fromXML = fromXML;
exports.default = {
    fromXML: fromXML
};
