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
 * Implement methods of CustomerService session control service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044820
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取客服会话列表
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     */
    ServiceClient.prototype.list = function (account) {
        var params = {
            kf_account: account
        };
        return this.httpGet("/customservice/kfsession/getsessionlist", params);
    };
    /**
     * 获取未接入会话列表
     */
    ServiceClient.prototype.waitingList = function () {
        return this.httpGet("/customservice/kfsession/getwaitcase");
    };
    /**
     * 创建会话
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param openId 粉丝的openid
     */
    ServiceClient.prototype.create = function (account, openId) {
        var data = {
            kf_account: account,
            openid: openId
        };
        return this.httpPost("/customservice/kfsession/create", data);
    };
    /**
     * 关闭会话
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param openId 粉丝的openid
     */
    ServiceClient.prototype.close = function (account, openId) {
        var data = {
            kf_account: account,
            openid: openId
        };
        return this.httpPost("/customservice/kfsession/close", data);
    };
    /**
     * 获取客户会话状态
     * @param openId 粉丝的openid
     */
    ServiceClient.prototype.stats = function (openId) {
        var params = {
            openid: openId
        };
        return this.httpGet("/customservice/kfsession/getsession", params);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
