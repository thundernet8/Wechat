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
 * 图文消息(仅开发者回复可用)
 */
var NewsMessage = /** @class */ (function (_super) {
    __extends(NewsMessage, _super);
    function NewsMessage(title, description, picUrl, url, articles) {
        var _this = _super.call(this, MessageType_1.default.NEWS) || this;
        _this._title = title;
        _this._description = description;
        _this._picUrl = picUrl;
        _this._url = url;
        _this._articles = articles || [];
        _this._articleCount = _this._articles.length + 1;
        return _this;
    }
    NewsMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            Title: this._title,
            Description: this._description,
            PicUrl: this._picUrl,
            Url: this._url,
            Articles: this._articles,
            ArticleCount: this._articleCount
        });
    };
    return NewsMessage;
}(Message_1.default));
exports.default = NewsMessage;
