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
 * 地理位置消息
 */
var LocationMessage = /** @class */ (function (_super) {
    __extends(LocationMessage, _super);
    function LocationMessage(locationX, locationY, scale, label) {
        var _this = _super.call(this, MessageType_1.default.LOCATION) || this;
        _this._locationX = locationX;
        _this._locationY = locationY;
        _this._scale = scale;
        _this._label = label;
        return _this;
    }
    Object.defineProperty(LocationMessage.prototype, "locationX", {
        /**
         * 地理位置维度
         */
        get: function () {
            return this._locationX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationMessage.prototype, "locationY", {
        /**
         * 地理位置经度
         */
        get: function () {
            return this._locationY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationMessage.prototype, "scale", {
        /**
         * 地图缩放大小
         */
        get: function () {
            return this._scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationMessage.prototype, "label", {
        /**
         * 地理位置信息
         */
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    LocationMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            Location_X: this._locationX,
            Location_Y: this._locationY,
            Scale: this._scale,
            Label: this._label
        });
    };
    return LocationMessage;
}(Message_1.default));
exports.default = LocationMessage;
