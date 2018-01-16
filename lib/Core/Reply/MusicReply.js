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
var MusicMessage_1 = require("../Message/MusicMessage");
/**
 * 音乐消息回复
 */
var MusicReply = /** @class */ (function (_super) {
    __extends(MusicReply, _super);
    function MusicReply() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MusicReply;
}(MusicMessage_1.default));
exports.default = MusicReply;
