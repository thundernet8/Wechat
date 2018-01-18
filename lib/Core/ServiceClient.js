"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpClient_1 = require("./Http/HttpClient");
var Constants_1 = require("./Constants");
var Url_1 = require("./Utils/Url");
/**
 * Base Service Client
 */
var ServiceClient = /** @class */ (function () {
    function ServiceClient(app, accessToken) {
        this._app = app;
        this._accessToken = accessToken;
        this._httpClient = new HttpClient_1.default({
            baseUrl: Constants_1.WX_API_BASE
        });
    }
    Object.defineProperty(ServiceClient.prototype, "app", {
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });
    ServiceClient.prototype.getAccessToken = function () {
        return this._accessToken
            .getToken()
            .then(function (accessToken) {
            // TODO log
            return accessToken;
        })
            .catch(function (error) {
            // TODO log
            throw error;
        });
    };
    ServiceClient.prototype.httpGet = function (endpoint, params) {
        var _this = this;
        return this.getAccessToken().then(function (accessToken) {
            params = Object.assign({}, params || {}, { access_token: accessToken });
            return _this._httpClient.httpGet(endpoint, params);
        });
    };
    ServiceClient.prototype.httpPost = function (endpoint, data) {
        var _this = this;
        return this.getAccessToken().then(function (accessToken) {
            endpoint = Url_1.addUrlQuery(endpoint, { access_token: accessToken });
            return _this._httpClient.httpPost(endpoint, data);
        });
    };
    ServiceClient.prototype.httpFormUpload = function (endpoint, filePath, type, data) {
        var _this = this;
        return this.getAccessToken().then(function (accessToken) {
            endpoint = Url_1.addUrlQuery(endpoint, { access_token: accessToken, type: type });
            return _this._httpClient.httpFormUpload(endpoint, filePath, data);
        });
    };
    return ServiceClient;
}());
exports.default = ServiceClient;
