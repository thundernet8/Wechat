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
 * 关注事件(包括扫码触发的关注事件)
 */
var SubscribeEvent = /** @class */ (function (_super) {
    __extends(SubscribeEvent, _super);
    function SubscribeEvent(eventKey, ticket) {
        var _this = _super.call(this, EventType_1.default.SUBSCRIBE) || this;
        _this._eventKey = eventKey || "";
        _this._ticket = ticket || "";
        return _this;
    }
    Object.defineProperty(SubscribeEvent.prototype, "eventKey", {
        /**
         * 事件KEY值，qrscene_为前缀，后面为二维码的参数值(扫描带参数二维码事件未关注的先关注公众号)
         */
        get: function () {
            return this._eventKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SubscribeEvent.prototype, "ticket", {
        /**
         * 二维码的ticket，可用来换取二维码图片(扫描二维码关注时)
         */
        get: function () {
            return this._ticket;
        },
        enumerable: true,
        configurable: true
    });
    return SubscribeEvent;
}(EventMessage_1.default));
exports.default = SubscribeEvent;
