"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType_1 = require("../Enum/MessageType");
var MessageHelper_1 = require("./MessageHelper");
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
    Message.prototype.toPOJO = function () {
        return {
            ToUserName: this.to,
            FromUserName: this.from,
            CreateTime: this.createTime,
            MsgType: this.type
        };
    };
    Message.prototype.toJSON = function () {
        return JSON.stringify(this.toPOJO());
    };
    Message.prototype.toXML = function () {
        return MessageHelper_1.renderXML(this.toPOJO());
    };
    return Message;
}());
exports.default = Message;
