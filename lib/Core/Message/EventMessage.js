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
 * 事件消息
 */
var EventMessage = /** @class */ (function (_super) {
    __extends(EventMessage, _super);
    function EventMessage(event) {
        var _this = _super.call(this, MessageType_1.default.EVENT) || this;
        _this._event = event;
        return _this;
    }
    Object.defineProperty(EventMessage.prototype, "event", {
        /**
         * 事件类型
         */
        get: function () {
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    return EventMessage;
}(Message_1.default));
exports.default = EventMessage;
