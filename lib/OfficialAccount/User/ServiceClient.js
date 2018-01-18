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
 * Implement methods of User management service
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 创建用户标签
     * @param name 用户标签名
     */
    ServiceClient.prototype.createTag = function (name) {
        return this.httpPost("/cgi-bin/tags/create", {
            tag: { name: name }
        });
    };
    /**
     * 获取用户标签列表
     */
    ServiceClient.prototype.getTags = function () {
        return this.httpGet("/cgi-bin/tags/get");
    };
    /**
     * 编辑用户标签
     * @param tagId 标签ID
     * @param tagName 标签名称
     */
    ServiceClient.prototype.updateTag = function (tagId, tagName) {
        return this.httpPost("/cgi-bin/tags/update", { tag: { id: tagId, name: tagName } });
    };
    /**
     * 删除用户标签
     * @param tagId 标签ID
     */
    ServiceClient.prototype.deleteTag = function (tagId) {
        return this.httpPost("/cgi-bin/tags/delete", { tag: { id: tagId } });
    };
    /**
     * 获取标签下粉丝列表
     * @param tagId 标签ID
     * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
     */
    ServiceClient.prototype.getTagUserList = function (tagId, nextOpenId) {
        return this.httpGet("/cgi-bin/user/tag/get", {
            tagid: tagId,
            next_openid: nextOpenId || ""
        });
    };
    /**
     * 批量为用户打标签
     * @param tagId 标签ID
     * @param userList 用户列表(OpenId)
     */
    ServiceClient.prototype.tagUsers = function (tagId, userList) {
        return this.httpPost("/cgi-bin/tags/members/batchtagging", {
            openid_list: userList,
            tagid: tagId
        });
    };
    /**
     * 批量为用户取消标签
     * @param tagId 标签ID
     * @param userList 用户列表(OpenId)
     */
    ServiceClient.prototype.untagUsers = function (tagId, userList) {
        return this.httpPost("/cgi-bin/tags/members/batchuntagging", {
            openid_list: userList,
            tagid: tagId
        });
    };
    /**
     * 获取用户身上的标签列表
     * @param userId 用户ID(OpenId)
     */
    ServiceClient.prototype.getUserTags = function (userId) {
        return this.httpPost("/cgi-bin/tags/getidlist", {
            openid: userId
        });
    };
    /**
     * 设置用户备注名(该接口暂时开放给微信认证的服务号)
     * @param userId 用户ID(OpenId)
     * @param remark 备注名
     */
    ServiceClient.prototype.setRemark = function (userId, remark) {
        return this.httpPost("/cgi-bin/user/info/updateremark", {
            openid: userId,
            remark: remark
        });
    };
    /**
     * 获取用户基本信息
     * @param userId 用户ID(OpenId)
     * @param lang 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
     */
    ServiceClient.prototype.getInfo = function (userId, lang) {
        if (lang === void 0) { lang = "zh_CN"; }
        return this.httpGet("/cgi-bin/user/info", {
            openid: userId,
            lang: lang
        });
    };
    /**
     * 批量获取用户基本信息
     * @param userList
     */
    ServiceClient.prototype.batchGetInfo = function (userList) {
        return this.httpPost("/cgi-bin/user/info/batchget", {
            user_list: userList
        });
    };
    /**
     * 获取用户列表
     * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
     */
    ServiceClient.prototype.list = function (nextOpenId) {
        return this.httpGet("/cgi-bin/user/get", { next_openid: nextOpenId || "" });
    };
    /**
     * 获取黑名单用户列表
     * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
     */
    ServiceClient.prototype.blacklist = function (nextOpenId) {
        return this.httpPost("/cgi-bin/tags/members/getblacklist", {
            begin_openid: nextOpenId || ""
        });
    };
    /**
     * 拉黑用户
     * @param userList 用户ID列表(OpenId)
     */
    ServiceClient.prototype.drop = function (userList) {
        return this.httpPost("/cgi-bin/tags/members/batchblacklist", {
            openid_list: userList
        });
    };
    /**
     *  取消拉黑用户
     * @param userList 用户ID列表(OpenId)
     */
    ServiceClient.prototype.recover = function (userList) {
        return this.httpPost("/cgi-bin/tags/members/batchunblacklist", {
            openid_list: userList
        });
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
