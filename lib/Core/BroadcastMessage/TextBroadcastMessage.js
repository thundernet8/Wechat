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
var BroadcastMessage_1 = require("./BroadcastMessage");
var BroadcastMessageType_1 = require("../Enum/BroadcastMessageType");
var TextBroadcastMessage = /** @class */ (function (_super) {
    __extends(TextBroadcastMessage, _super);
    function TextBroadcastMessage(content) {
        var _this = _super.call(this, BroadcastMessageType_1.default.TEXT) || this;
        _this._content = content;
        return _this;
    }
    TextBroadcastMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            text: {
                content: this._content
            }
        });
    };
    return TextBroadcastMessage;
}(BroadcastMessage_1.default));
exports.default = TextBroadcastMessage;
