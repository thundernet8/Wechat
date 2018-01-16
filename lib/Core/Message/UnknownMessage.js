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
 * 未知消息
 */
var UnknownMessage = /** @class */ (function (_super) {
    __extends(UnknownMessage, _super);
    function UnknownMessage() {
        return _super.call(this, MessageType_1.default.UNKNOWN) || this;
    }
    return UnknownMessage;
}(Message_1.default));
exports.default = UnknownMessage;
