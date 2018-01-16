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
var ImageMessage_1 = require("../Message/ImageMessage");
/**
 * 图片消息回复
 */
var ImageReply = /** @class */ (function (_super) {
    __extends(ImageReply, _super);
    function ImageReply(mediaId) {
        return _super.call(this, "", mediaId) || this;
    }
    return ImageReply;
}(ImageMessage_1.default));
exports.default = ImageReply;
