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
 * 视频消息
 */
var VideoMessage = /** @class */ (function (_super) {
    __extends(VideoMessage, _super);
    function VideoMessage(thumbMediaId, mediaId, title, description) {
        var _this = _super.call(this, MessageType_1.default.VIDEO) || this;
        _this._thumbMediaId = thumbMediaId;
        _this._mediaId = mediaId;
        _this._title = title || "";
        _this._description = description || "";
        return _this;
    }
    Object.defineProperty(VideoMessage.prototype, "thumbMediaId", {
        /**
         * 视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据
         */
        get: function () {
            return this._thumbMediaId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoMessage.prototype, "mediaId", {
        /**
         * 视频消息媒体id，可以调用多媒体文件下载接口拉取数据
         */
        get: function () {
            return this._mediaId;
        },
        enumerable: true,
        configurable: true
    });
    VideoMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            ThumbMediaId: this._thumbMediaId,
            MediaId: this._mediaId,
            Title: this._title,
            Description: this._description
        });
    };
    return VideoMessage;
}(Message_1.default));
exports.default = VideoMessage;
