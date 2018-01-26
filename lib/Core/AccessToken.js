"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpClient_1 = require("./Http/HttpClient");
var AccessToken = /** @class */ (function () {
    function AccessToken(container) {
        this.TOKEN_CACHE_KEY = "_wechat_one_access_token";
        this.apiBase = "https://api.weixin.qq.com";
        this.app = container;
    }
    AccessToken.prototype.getStore = function () {
        return AccessToken.store;
    };
    AccessToken.prototype.setStore = function (store) {
        AccessToken.store = store;
    };
    AccessToken.prototype.setCache = function (data) {
        if (this.app.cacher) {
            this.app.cacher.setter(this.TOKEN_CACHE_KEY, JSON.stringify(data));
            return;
        }
        this.setStore(data);
    };
    AccessToken.prototype.getCache = function () {
        if (this.app.cacher) {
            var cache = this.app.cacher.getter(this.TOKEN_CACHE_KEY);
            return cache ? JSON.parse(cache) : null;
        }
        return this.getStore();
    };
    AccessToken.prototype.setToken = function (token, expires, originalToken) {
        var data = Object.assign({}, AccessToken.store, {
            token: token,
            expires: Date.now() + expires * 1000,
            originalToken: originalToken
        });
        this.setCache(data);
    };
    AccessToken.prototype.getToken = function (fresh, extInfo) {
        var _this = this;
        if (fresh === void 0) { fresh = false; }
        this.extInfo = extInfo;
        var data = this.getCache() || {};
        var token = data.token, expires = data.expires, originalToken = data.originalToken;
        if (!fresh && token && expires - Date.now() >= 10 * 60 * 1000) {
            this.originalToken = originalToken;
            return Promise.resolve(originalToken);
        }
        var endpoint = this.getEndpoint();
        if (!endpoint) {
            throw new Error("Access token request should have a endpoint");
        }
        var credentials = this.getCredentials();
        if (!credentials || !credentials.appid || !credentials.secret) {
            throw new Error("Access token request requires APPID and APPSECRET information");
        }
        var httpClient = new HttpClient_1.default({
            baseUrl: this.apiBase
        });
        return httpClient.httpGet(endpoint, credentials).then(function (resp) {
            if (resp.access_token && resp.expires_in) {
                _this.setToken(resp.access_token, resp.expires_in, resp);
                _this.originalToken = resp;
                return resp;
            }
            throw new Error(resp.errmsg);
        });
    };
    AccessToken.prototype.getFreshToken = function (extInfo) {
        return this.getToken(true, extInfo);
    };
    /**
     * Memory cache store(if no cacher provided)
     */
    AccessToken.store = {};
    return AccessToken;
}());
exports.default = AccessToken;
