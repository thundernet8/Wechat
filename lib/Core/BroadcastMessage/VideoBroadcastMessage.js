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
var VideoBroadcastMessage = /** @class */ (function (_super) {
    __extends(VideoBroadcastMessage, _super);
    function VideoBroadcastMessage(mediaId) {
        var _this = _super.call(this, BroadcastMessageType_1.default.MP_VIDEO) || this;
        _this._mediaId = mediaId;
        return _this;
    }
    VideoBroadcastMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            mpvideo: {
                media_id: this._mediaId
            }
        });
    };
    return VideoBroadcastMessage;
}(BroadcastMessage_1.default));
exports.default = VideoBroadcastMessage;
