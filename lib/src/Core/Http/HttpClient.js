"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var https_1 = require("https");
var HttpClient = /** @class */ (function () {
    function HttpClient(options) {
        this.options = options;
        var baseUrl = options.baseUrl, timeout = options.timeout;
        this.ax = axios_1.default.create({
            baseURL: baseUrl,
            timeout: timeout || 60000,
            withCredentials: false,
            httpsAgent: new https_1.default.Agent({
                rejectUnauthorized: false
            }),
            headers: {
                Accept: "*/*"
            }
        });
    }
    HttpClient.prototype._request = function (method, endpoint, params) {
        if (!endpoint.startsWith("/")) {
            endpoint = "/" + endpoint;
        }
        return this.ax
            .request({
            url: endpoint,
            method: method,
            params: method.toUpperCase() === "GET" ? params : null,
            data: method.toUpperCase() !== "GET" ? params : null,
            validateStatus: function (status) {
                return status >= 200 && status < 500;
            }
        })
            .then(function (resp) {
            if (resp.status >= 400) {
                throw new Error(resp.data);
            }
            return resp.data;
        });
    };
    HttpClient.prototype.httpGet = function (endpoint, params) {
        return this._request("GET", endpoint, params);
    };
    HttpClient.prototype.httpPost = function (endpoint, params) {
        return this._request("POST", endpoint, params);
    };
    return HttpClient;
}());
exports.default = HttpClient;
