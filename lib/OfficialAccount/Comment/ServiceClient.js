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
var ServiceClient_1 = require("../../Core/ServiceClient");
/**
 * Implement methods of Comment service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 打开已群发文章评论
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     */
    ServiceClient.prototype.open = function (msgId, index) {
        return this.httpPost("/cgi-bin/comment/open", {
            msg_data_id: msgId,
            index: index || 0
        });
    };
    /**
     * 关闭已群发文章评论
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     */
    ServiceClient.prototype.close = function (msgId, index) {
        return this.httpPost("/cgi-bin/comment/close", {
            msg_data_id: msgId,
            index: index || 0
        });
    };
    /**
     * 查看指定文章的评论数据
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认返回该msg_data_id的第一篇图文
     * @param begin 起始位置
     * @param count 获取数目（>=50会被拒绝）
     * @param type type=0 普通评论&精选评论 type=1 普通评论 type=2 精选评论
     */
    ServiceClient.prototype.list = function (msgId, index, begin, count, type) {
        var data = {
            msg_data_id: msgId,
            index: index,
            begin: begin,
            count: count,
            type: type
        };
        return this.httpPost("/cgi-bin/comment/list", data);
    };
    /**
     * 将评论标记精选
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     * @param commentId 用户评论id
     */
    ServiceClient.prototype.markElect = function (msgId, index, commentId) {
        var data = {
            msg_data_id: msgId,
            index: index,
            user_comment_id: commentId
        };
        return this.httpPost("/cgi-bin/comment/markelect", data);
    };
    /**
     * 将评论取消精选
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     * @param commentId 用户评论id
     */
    ServiceClient.prototype.unmarkElect = function (msgId, index, commentId) {
        var data = {
            msg_data_id: msgId,
            index: index,
            user_comment_id: commentId
        };
        return this.httpPost("/cgi-bin/comment/unmarkelect", data);
    };
    /**
     * 删除评论
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     * @param commentId 用户评论id
     */
    ServiceClient.prototype.delete = function (msgId, index, commentId) {
        var data = {
            msg_data_id: msgId,
            index: index,
            user_comment_id: commentId
        };
        return this.httpPost("/cgi-bin/comment/delete", data);
    };
    /**
     * 回复评论
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     * @param commentId 用户评论id
     * @param content 回复内容
     */
    ServiceClient.prototype.reply = function (msgId, index, commentId, content) {
        var data = {
            msg_data_id: msgId,
            index: index,
            user_comment_id: commentId,
            content: content
        };
        return this.httpPost("/cgi-bin/comment/reply/add", data);
    };
    /**
     * 删除回复
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     * @param commentId 用户评论id
     */
    ServiceClient.prototype.deleteReply = function (msgId, index, commentId) {
        var data = {
            msg_data_id: msgId,
            index: index,
            user_comment_id: commentId
        };
        return this.httpPost("/cgi-bin/comment/reply/delete", data);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
