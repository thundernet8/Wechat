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
 * Implement methods of URL service
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 长链接转短链接
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1443433600
     * @param url 原始链接
     */
    ServiceClient.prototype.shorten = function (url) {
        return this.httpPost("/cgi-bin/shorturl", {
            action: "long2short",
            long_url: url
        }).then(function (resp) { return resp.short_url; });
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
