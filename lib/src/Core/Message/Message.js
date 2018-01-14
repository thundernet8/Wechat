"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json2xml = require("json2xml");
var MessageType_1 = require("../Enum/MessageType");
var TextMessage_1 = require("./TextMessage");
var Message = /** @class */ (function () {
    function Message(id, type, from, to, content, createTime) {
        /**
         * MsgType of xml
         */
        this.type = MessageType_1.default.TEXT;
        this.id = id;
        this.type = type;
        this.from = from;
        this.to = to;
        this.content = content;
        this.createTime = createTime;
    }
    Message.fromXML = function (xmlBody) {
        var MsgId = xmlBody.MsgId, MsgType = xmlBody.MsgType, Content = xmlBody.Content, FromUserName = xmlBody.FromUserName, ToUserName = xmlBody.ToUserName, CreateTime = xmlBody.CreateTime;
        switch (MsgType) {
            case MessageType_1.default.TEXT:
                return new TextMessage_1.default(MsgId, FromUserName, ToUserName, Content, parseInt(CreateTime, 10));
            default:
                return new TextMessage_1.default(MsgId, FromUserName, ToUserName, Content, parseInt(CreateTime, 10));
        }
    };
    Message.prototype.toJSON = function () {
        return JSON.stringify(this.toPOJO());
    };
    Message.prototype.toXML = function () {
        return json2xml(this.toPOJO(), { header: false });
    };
    return Message;
}());
exports.default = Message;
