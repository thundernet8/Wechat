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
 * 语音消息
 */
var VoiceMessage = /** @class */ (function (_super) {
    __extends(VoiceMessage, _super);
    function VoiceMessage(format, mediaId, recognition) {
        var _this = _super.call(this, MessageType_1.default.VOICE) || this;
        _this._format = format;
        _this._mediaId = mediaId;
        _this._recognition = recognition || "";
        return _this;
    }
    Object.defineProperty(VoiceMessage.prototype, "format", {
        /**
         * 语音格式，如amr，speex等
         */
        get: function () {
            return this._format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoiceMessage.prototype, "mediaId", {
        /**
         * 语音消息媒体id，可以调用多媒体文件下载接口拉取数据
         */
        get: function () {
            return this._mediaId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VoiceMessage.prototype, "recognition", {
        /**
         * Recognition field of xml(语音识别结果)
         */
        get: function () {
            return this._recognition;
        },
        enumerable: true,
        configurable: true
    });
    VoiceMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            Format: this._format,
            MediaId: this._mediaId,
            Recognition: this._recognition
        });
    };
    return VoiceMessage;
}(Message_1.default));
exports.default = VoiceMessage;
