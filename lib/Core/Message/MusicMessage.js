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
 * 音乐消息(仅开发者回复可用)
 */
var MusicMessage = /** @class */ (function (_super) {
    __extends(MusicMessage, _super);
    function MusicMessage(title, description, musicUrl, hqMusicUrl, thumbMediaId) {
        var _this = _super.call(this, MessageType_1.default.MUSIC) || this;
        _this._title = title;
        _this._description = description;
        _this._musicUrl = musicUrl;
        _this._hqMusicUrl = hqMusicUrl;
        _this._thumbMediaId = thumbMediaId;
        return _this;
    }
    MusicMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            Title: this._title,
            Description: this._description,
            MusicURL: this._musicUrl,
            HQMusicUrl: this._hqMusicUrl,
            ThumbMediaId: this._thumbMediaId
        });
    };
    return MusicMessage;
}(Message_1.default));
exports.default = MusicMessage;
