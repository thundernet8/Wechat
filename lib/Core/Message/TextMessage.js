"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("./Message");
var MessageType_1 = require("../Enum/MessageType");
/**
 * 普通文本消息
 */
var TextMessage = /** @class */ (function (_super) {
    __extends(TextMessage, _super);
    function TextMessage(id, from, to, content, createTime) {
        return _super.call(this, id, MessageType_1.default.TEXT, from, to, content, createTime) || this;
    }
    TextMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            Content: this.content
        });
    };
    return TextMessage;
}(Message_1.default));
exports.default = TextMessage;
