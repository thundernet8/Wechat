"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = require("url");
var qs = require("querystring");
function addUrlQuery(_url, kvs) {
    var urlObj = url.parse(_url);
    var queryKvs = Object.assign({}, qs.parse(urlObj.query || ""), kvs);
    var query = "?" +
        Object.keys(queryKvs)
            .map(function (key) { return key + "=" + queryKvs[key]; })
            .join("&");
    var protocol = urlObj.protocol, hostname = urlObj.hostname, port = urlObj.port, pathname = urlObj.pathname;
    return "" + (protocol ? protocol + "//" : "") + (hostname || "") + (pathname || "/") + query;
}
exports.addUrlQuery = addUrlQuery;
