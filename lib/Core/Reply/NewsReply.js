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
var NewsMessage_1 = require("../Message/NewsMessage");
/**
 * 图文消息回复
 */
var NewsReply = /** @class */ (function (_super) {
    __extends(NewsReply, _super);
    function NewsReply() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NewsReply;
}(NewsMessage_1.default));
exports.default = NewsReply;
