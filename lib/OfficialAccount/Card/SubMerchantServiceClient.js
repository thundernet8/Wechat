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
 * Implement methods of Sub Merchant Card service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 创建子商户
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
     * @param info
     */
    ServiceClient.prototype.create = function (info) {
        var data = {
            info: info
        };
        return this.httpPost("/card/submerchant/submit", data);
    };
    /**
     * 更新子商户
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
     * @param merchantId
     * @param info
     */
    ServiceClient.prototype.update = function (merchantId, info) {
        var data = {
            info: Object.assign({
                merchant_id: merchantId
            }, info)
        };
        return this.httpPost("/card/submerchant/update", data);
    };
    /**
     * 获取子商户信息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
     * @param merchantId
     */
    ServiceClient.prototype.stats = function (merchantId) {
        var data = {
            merchant_id: merchantId
        };
        return this.httpPost("/card/submerchant/get", data);
    };
    /**
     * 批量获取子商户信息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
     * @param beginId 起始的子商户id，一个母商户公众号下唯一
     * @param limit 拉取的子商户的个数，最大值为100
     * @param status 子商户审核状态，填入后，只会拉出当前状态的子商户
     */
    ServiceClient.prototype.list = function (beginId, limit, status) {
        if (beginId === void 0) { beginId = 0; }
        if (limit === void 0) { limit = 50; }
        if (status === void 0) { status = "CHECKING"; }
        var data = {
            begin_id: beginId,
            limit: limit,
            status: status
        };
        return this.httpPost("/card/submerchant/batchget", data);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
