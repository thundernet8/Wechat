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
 * Implement methods of Semantic service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141241
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 语义理解查询
     * @param keyword
     * @param categories
     * @param optional
     */
    ServiceClient.prototype.query = function (keyword, categories, optional) {
        var data = Object.assign({
            query: keyword,
            category: categories,
            appid: this.app.appid
        }, optional || {});
        return this.httpPost("/semantic/semproxy/search", data);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
