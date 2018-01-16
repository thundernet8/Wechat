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
var VideoMessage_1 = require("../Message/VideoMessage");
/**
 * 视频消息回复
 */
var VideoReply = /** @class */ (function (_super) {
    __extends(VideoReply, _super);
    function VideoReply(mediaId, title, description) {
        return _super.call(this, "", mediaId, title, description) || this;
    }
    return VideoReply;
}(VideoMessage_1.default));
exports.default = VideoReply;
