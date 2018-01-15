"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json2xml = require("json2xml");
var MessageType_1 = require("../Enum/MessageType");
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
    Message.prototype.toJSON = function () {
        return JSON.stringify(this.toPOJO());
    };
    Message.prototype.toXML = function () {
        return json2xml(this.toPOJO(), { header: false });
    };
    return Message;
}());
exports.default = Message;
