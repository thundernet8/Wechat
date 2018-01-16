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
 * 链接消息
 */
var LinkMessage = /** @class */ (function (_super) {
    __extends(LinkMessage, _super);
    function LinkMessage(title, description, url) {
        var _this = _super.call(this, MessageType_1.default.LINK) || this;
        _this._title = title;
        _this._description = description;
        _this._url = url;
        return _this;
    }
    Object.defineProperty(LinkMessage.prototype, "title", {
        /**
         * 消息标题
         */
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkMessage.prototype, "description", {
        /**
         * 消息描述
         */
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkMessage.prototype, "url", {
        /**
         * 消息链接
         */
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    LinkMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            Title: this._title,
            Description: this._description,
            Url: this._url
        });
    };
    return LinkMessage;
}(Message_1.default));
exports.default = LinkMessage;
