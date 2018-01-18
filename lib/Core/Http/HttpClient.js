"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var https = require("https");
var fs = require("fs");
var FormData = require("form-data");
var qs = require("querystring");
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
            // debug
            console.log("request " + endpoint + " resp:", resp);
            if (resp.status >= 400) {
                throw new Error(resp.data);
            }
            if (resp.data) {
                var _a = resp.data, errcode = _a.errcode, errmsg = _a.errmsg;
                if (errcode) {
                    throw new Error(errmsg);
                }
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
        var rs = fs.createReadStream(filePath);
        rs.on("error", function (error) {
            return Promise.reject(error.message || error.toString());
        });
        data = data || {};
        var formData = new FormData();
        formData.append("media", rs);
        Object.keys(data).forEach(function (key) {
            formData.append(key, data[key]);
        });
        return this._request("POST", endpoint, qs.stringify(formData), formData.getHeaders());
    };
    return HttpClient;
}());
exports.default = HttpClient;
