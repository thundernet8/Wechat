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
 * 图片消息
 */
var ImageMessage = /** @class */ (function (_super) {
    __extends(ImageMessage, _super);
    function ImageMessage(picUrl, mediaId) {
        var _this = _super.call(this, MessageType_1.default.IMAGE) || this;
        _this._picUrl = picUrl;
        _this._mediaId = mediaId;
        return _this;
    }
    Object.defineProperty(ImageMessage.prototype, "picUrl", {
        /**
         * PicUrl field of xml
         */
        get: function () {
            return this._picUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageMessage.prototype, "mediaId", {
        /**
         * MediaId field of xml
         */
        get: function () {
            return this._mediaId;
        },
        enumerable: true,
        configurable: true
    });
    ImageMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            PicUrl: this._picUrl,
            MediaId: this._mediaId
        });
    };
    return ImageMessage;
}(Message_1.default));
exports.default = ImageMessage;
