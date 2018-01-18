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
 * 未知事件
 */
var UnknownEvent = /** @class */ (function (_super) {
    __extends(UnknownEvent, _super);
    function UnknownEvent() {
        return _super.call(this, EventType_1.default.UNKNOWN) || this;
    }
    return UnknownEvent;
}(EventMessage_1.default));
exports.default = UnknownEvent;
