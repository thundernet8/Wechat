"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpClient_1 = require("./Http/HttpClient");
var AccessToken = /** @class */ (function () {
    function AccessToken() {
        this.apiBase = "https://api.weixin.qq.com";
    }
    AccessToken.prototype.setToken = function (token, expires) {
        AccessToken.store = Object.assign({}, AccessToken.store, {
            token: token,
            expires: Date.now() + expires * 1000
        });
    };
    AccessToken.prototype.getToken = function (fresh) {
        var _this = this;
        if (fresh === void 0) { fresh = false; }
        var _a = AccessToken.store, token = _a.token, expires = _a.expires;
        if (!fresh && token && expires - Date.now() >= 10 * 60 * 1000) {
            return Promise.resolve(token);
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
                console.log(new Date().toISOString() + ": Get access token " + resp.access_token);
                _this.setToken(resp.access_token, resp.expires_in);
                return resp.access_token;
            }
            throw new Error(resp.errmsg);
        });
    };
    AccessToken.prototype.getFreshToken = function () {
        return this.getToken(true);
    };
    /**
     * Memory cache store
     */
    AccessToken.store = {};
    return AccessToken;
}());
exports.default = AccessToken;
