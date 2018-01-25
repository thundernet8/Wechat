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
 * Implement methods of Member Card service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141229
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 会员卡接口激活
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
     * @param info
     */
    ServiceClient.prototype.active = function (info) {
        return this.httpPost("/card/membercard/activate", info);
    };
    /**
     * 设置开卡字段
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
     * @param cardId
     * @param settings
     */
    ServiceClient.prototype.setActivationForm = function (cardId, settings) {
        var data = Object.assign(settings, { card_id: cardId });
        return this.httpPost("/card/membercard/activateuserform/set", data);
    };
    /**
     * 拉取会员信息接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
     * @param cardId
     * @param code
     */
    ServiceClient.prototype.getUser = function (cardId, code) {
        var data = {
            card_id: cardId,
            code: code
        };
        return this.httpPost("/card/membercard/userinfo/get", data);
    };
    /**
     *  更新会员信息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
     * @param params
     */
    ServiceClient.prototype.updateUser = function (params) {
        return this.httpPost("/card/membercard/updateuser", params);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
