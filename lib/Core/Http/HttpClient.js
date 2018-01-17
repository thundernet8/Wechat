"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var https = require("https");
var fs = require("fs");
var HttpClient = /** @class */ (function () {
    function HttpClient(options) {
        this.options = options;
        var baseUrl = options.baseUrl, timeout = options.timeout;
        this.ax = axios_1.default.create({
            baseURL: baseUrl,
            timeout: timeout || 60000,
            withCredentials: false,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            headers: {
                Accept: "*/*"
            }
        });
    }
    HttpClient.prototype._request = function (method, endpoint, params, headers) {
        if (!endpoint.startsWith("/")) {
            endpoint = "/" + endpoint;
        }
        return this.ax
            .request({
            url: endpoint,
            method: method,
            headers: headers || {},
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
    HttpClient.prototype.httpFormUpload = function (endpoint, filePath, data) {
        if (!fs.existsSync(filePath)) {
            return Promise.reject("File on path: " + filePath + " is not exist");
        }
        var size = fs.statSync(filePath).size;
        var headers = {
            "Content-Type": "multipart/form-data",
            "Content-Length": size
        };
        var rs = fs.createReadStream(filePath);
        data = Object.assign({}, data || {}, {
            media: rs
        });
        return this._request("POST", endpoint, data, headers);
    };
    return HttpClient;
}());
exports.default = HttpClient;
