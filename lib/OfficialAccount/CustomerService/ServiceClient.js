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
var Url_1 = require("../../Core/Utils/Url");
var BroadcastMessage_1 = require("../../Core/BroadcastMessage/BroadcastMessage");
var TextBroadcastMessage_1 = require("../../Core/BroadcastMessage/TextBroadcastMessage");
/**
 * Implement methods of CustomerService service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458557405
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取客服列表
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
     */
    ServiceClient.prototype.list = function () {
        return this.httpGet("cgi-bin/customservice/getkflist");
    };
    /**
     * 获取在线客服列表
     */
    ServiceClient.prototype.onlineList = function () {
        return this.httpGet("cgi-bin/customservice/getonlinekflist");
    };
    /**
     * 添加客服帐号
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号，帐号前缀最多10个字符，必须是英文、数字字符或者下划线，后缀为公众号微信号，长度不超过30个字符
     * @param nickname 客服昵称，最长16个字
     */
    ServiceClient.prototype.create = function (account, nickname) {
        var data = {
            kf_account: account,
            nickname: nickname
        };
        return this.httpPost("/customservice/kfaccount/add", data);
    };
    /**
     * 设置客服信息
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param nickname 客服昵称，最长16个字
     */
    ServiceClient.prototype.update = function (account, nickname) {
        var data = {
            kf_account: account,
            nickname: nickname
        };
        return this.httpPost("/customservice/kfaccount/update", data);
    };
    /**
     * 删除客服帐号
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     */
    ServiceClient.prototype.delete = function (account) {
        var params = {
            kf_account: account
        };
        return this.httpGet("/customservice/kfaccount/del", params);
    };
    /**
     * 邀请绑定客服帐号
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param wechatId 接收绑定邀请的客服微信号
     */
    ServiceClient.prototype.invite = function (account, wechatId) {
        var data = {
            kf_account: account,
            invite_wx: wechatId
        };
        return this.httpPost("/customservice/kfaccount/inviteworker", data);
    };
    /**
     * 上传客服头像
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param imagePath 图片路径
     */
    ServiceClient.prototype.uploadAvatar = function (account, imagePath) {
        var params = {
            kf_account: account
        };
        var endpoint = Url_1.addUrlQuery("/customservice/kfaccount/uploadheadimg", params);
        return this.httpFormUpload(endpoint, imagePath);
    };
    /**
     * 客服接口-发消息
     * @param message 文本或BroadcastMessage子类实例
     * @param to 目标用户OpenId
     * @param kfAccount 以某个客服帐号来发消息(可选)
     */
    ServiceClient.prototype.sendMessage = function (message, to, kfAccount) {
        if (typeof message === "string") {
            message = new TextBroadcastMessage_1.default(message);
        }
        if (!(message instanceof BroadcastMessage_1.default)) {
            throw new Error("Invalid message");
        }
        var data = message.toPOJO();
        data["touser"] = to;
        if (kfAccount) {
            data["customservice"] = {
                kf_account: kfAccount
            };
        }
        return this.httpPost("/cgi-bin/message/custom/send", data);
    };
    /**
     * 客服输入状态
     * @param to 目标用户OpenId
     */
    ServiceClient.prototype.sendTypingStatus = function (to) {
        var data = {
            touser: to,
            command: "Typing"
        };
        return this.httpPost("/cgi-bin/message/custom/typing", data);
    };
    /**
     * 获取聊天记录
     * @param startTime 起始时间，unix时间戳
     * @param endTime 结束时间，unix时间戳，每次查询时段不能超过24小时
     * @param msgId 消息id顺序从小到大，从1开始
     * @param count 每次获取条数，最多10000条
     */
    ServiceClient.prototype.messageHistory = function (startTime, endTime, msgId, count) {
        if (msgId === void 0) { msgId = 1; }
        if (count === void 0) { count = 10000; }
        var data = {
            starttime: startTime,
            endtime: endTime,
            msgid: msgId,
            number: count
        };
        return this.httpPost("/customservice/msgrecord/getmsglist", data);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
