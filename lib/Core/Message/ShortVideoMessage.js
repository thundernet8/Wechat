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
 * 小视频消息
 */
var ShortVideoMessage = /** @class */ (function (_super) {
    __extends(ShortVideoMessage, _super);
    function ShortVideoMessage(thumbMediaId, mediaId) {
        var _this = _super.call(this, MessageType_1.default.SHORT_VIDEO) || this;
        _this._thumbMediaId = thumbMediaId;
        _this._mediaId = mediaId;
        return _this;
    }
    Object.defineProperty(ShortVideoMessage.prototype, "thumbMediaId", {
        /**
         * 视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据
         */
        get: function () {
            return this._thumbMediaId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShortVideoMessage.prototype, "mediaId", {
        /**
         * 视频消息媒体id，可以调用多媒体文件下载接口拉取数据
         */
        get: function () {
            return this._mediaId;
        },
        enumerable: true,
        configurable: true
    });
    ShortVideoMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            ThumbMediaId: this._thumbMediaId,
            MediaId: this._mediaId
        });
    };
    return ShortVideoMessage;
}(Message_1.default));
exports.default = ShortVideoMessage;
