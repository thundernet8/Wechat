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
 * Implement methods of Base service
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取微信服务器IP地址
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140187
     */
    ServiceClient.prototype.getValidIps = function () {
        return this.httpGet("/cgi-bin/getcallbackip").then(function (resp) {
            return resp.ip_list;
        });
    };
    /**
     * 公众号调用或第三方平台帮公众号调用对公众号的所有api调用（包括第三方帮其调用）次数进行清零
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433744592
     */
    ServiceClient.prototype.clearQuota = function () {
        return this.httpPost("/cgi-bin/clear_quota", { appid: this.app.appid });
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
