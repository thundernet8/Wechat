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
 * 上报地理位置事件
 */
var LocationEvent = /** @class */ (function (_super) {
    __extends(LocationEvent, _super);
    function LocationEvent(latitude, longitude, precision) {
        var _this = _super.call(this, EventType_1.default.LOCATION) || this;
        _this._latitude = latitude || "";
        _this._longitude = longitude || "";
        _this._precision = precision || "";
        return _this;
    }
    Object.defineProperty(LocationEvent.prototype, "latitude", {
        /**
         * 地理位置纬度
         */
        get: function () {
            return this._latitude;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationEvent.prototype, "longitude", {
        /**
         * 地理位置经度
         */
        get: function () {
            return this._longitude;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocationEvent.prototype, "precision", {
        /**
         * 地理位置精度
         */
        get: function () {
            return this._precision;
        },
        enumerable: true,
        configurable: true
    });
    return LocationEvent;
}(EventMessage_1.default));
exports.default = LocationEvent;
