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
 * Implement methods of General Card service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=215143440770UT7Y
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 通用卡接口激活
     * @param info
     */
    ServiceClient.prototype.active = function (info) {
        return this.httpPost("/card/generalcard/activate", info);
    };
    /**
     * 通用卡撤销激活
     * @param cardId
     * @param code
     */
    ServiceClient.prototype.deactivate = function (cardId, code) {
        var data = {
            card_id: cardId,
            code: code
        };
        return this.httpPost("/card/generalcard/unactivate", data);
    };
    /**
     *  更新用户礼品卡信息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=215143440770UT7Y
     * @param params
     */
    ServiceClient.prototype.updateUser = function (params) {
        return this.httpPost("/card/generalcard/updateuser", params);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
