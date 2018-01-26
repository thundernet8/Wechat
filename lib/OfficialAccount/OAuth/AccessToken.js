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
var HttpClient_1 = require("../../Core/Http/HttpClient");
var AccessToken_1 = require("../../Core/AccessToken");
var OAuthAccessToken = /** @class */ (function (_super) {
    __extends(OAuthAccessToken, _super);
    function OAuthAccessToken(container) {
        var _this = _super.call(this, container) || this;
        _this.TOKEN_CACHE_KEY = "_wechat_one_oauth_access_token";
        _this.apiBase = "https://api.weixin.qq.com";
        return _this;
    }
    OAuthAccessToken.prototype.getStore = function () {
        return OAuthAccessToken.store;
    };
    OAuthAccessToken.prototype.setStore = function (store) {
        OAuthAccessToken.store = store;
    };
    OAuthAccessToken.prototype.getEndpoint = function () {
        return "/sns/oauth2/access_token";
    };
    OAuthAccessToken.prototype.getCredentials = function () {
        var _a = this.app, appid = _a.appid, secret = _a.secret;
        return {
            appid: appid,
            secret: secret,
            code: this.extInfo ? this.extInfo.code : "",
            grant_type: "authorization_code"
        };
    };
    /**
     * 刷新access_token
     */
    OAuthAccessToken.prototype.refreshToken = function () {
        var _this = this;
        if (!this.originalToken || !this.originalToken.refresh_token) {
            throw new Error("refresh_token is not existed");
        }
        var refresh_token = this.originalToken.refresh_token;
        var params = {
            appid: this.app.appid,
            grant_type: "refresh_token",
            refresh_token: refresh_token
        };
        var httpClient = new HttpClient_1.default({ baseUrl: this.apiBase });
        return httpClient
            .httpGet("/sns/oauth2/refresh_token", params)
            .then(function (resp) {
            if (resp.access_token && resp.expires_in) {
                _this.setToken(resp.access_token, resp.expires_in, resp);
                _this.originalToken = resp;
                return resp;
            }
            throw new Error(resp.errmsg);
        });
    };
    /**
     * 检验授权凭证（access_token）是否有效
     * @param accessToken
     * @param openId
     */
    OAuthAccessToken.prototype.verifyToken = function (accessToken, openId) {
        var params = {
            access_token: accessToken,
            openid: openId
        };
        var httpClient = new HttpClient_1.default({ baseUrl: this.apiBase });
        return httpClient
            .httpGet("/sns/auth", params)
            .then(function () {
            return true;
        })
            .catch(function () {
            return false;
        });
    };
    /**
     * 拉取用户信息(需scope为 snsapi_userinfo)
     * @param lang 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
     */
    OAuthAccessToken.prototype.getUserInfo = function (lang) {
        if (!this.originalToken || !this.originalToken.access_token) {
            throw new Error("access_token is not granted");
        }
        var _a = this.originalToken, access_token = _a.access_token, openid = _a.openid;
        var params = {
            access_token: access_token,
            openid: openid,
            lang: lang
        };
        var httpClient = new HttpClient_1.default({ baseUrl: this.apiBase });
        return httpClient.httpGet("/sns/userinfo", params);
    };
    /**
     * Memory cache store(if no cacher provided)
     */
    OAuthAccessToken.store = {};
    return OAuthAccessToken;
}(AccessToken_1.default));
exports.default = OAuthAccessToken;
