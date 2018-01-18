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
var EventMessage_1 = require("../Message/EventMessage");
var EventType_1 = require("../Enum/EventType");
/**
 * 自定义菜单事件(点击菜单跳转链接时的事件推送)
 */
var SubscribeEvent = /** @class */ (function (_super) {
    __extends(SubscribeEvent, _super);
    function SubscribeEvent(eventKey) {
        var _this = _super.call(this, EventType_1.default.VIEW) || this;
        _this._eventKey = eventKey || "";
        return _this;
    }
    Object.defineProperty(SubscribeEvent.prototype, "eventKey", {
        /**
         * 事件KEY值，设置的跳转URL
         */
        get: function () {
            return this._eventKey;
        },
        enumerable: true,
        configurable: true
    });
    return SubscribeEvent;
}(EventMessage_1.default));
exports.default = SubscribeEvent;
