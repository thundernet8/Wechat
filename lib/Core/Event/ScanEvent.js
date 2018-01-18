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
 * 扫码事件(已经关注了公众号)
 */
var ScanEvent = /** @class */ (function (_super) {
    __extends(ScanEvent, _super);
    function ScanEvent(eventKey, ticket) {
        var _this = _super.call(this, EventType_1.default.SCAN) || this;
        _this._eventKey = Number(eventKey) || 0;
        _this._ticket = ticket || "";
        return _this;
    }
    Object.defineProperty(ScanEvent.prototype, "eventKey", {
        /**
         * 事件KEY值，是一个32位无符号整数，即创建二维码时的二维码scene_id
         */
        get: function () {
            return this._eventKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScanEvent.prototype, "ticket", {
        /**
         * 二维码的ticket，可用来换取二维码图片
         */
        get: function () {
            return this._ticket;
        },
        enumerable: true,
        configurable: true
    });
    return ScanEvent;
}(EventMessage_1.default));
exports.default = ScanEvent;
