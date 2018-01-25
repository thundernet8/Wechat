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
 * Implement methods of Card Coin service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1480492203_5tWvG
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 开通券点账户
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     */
    ServiceClient.prototype.active = function () {
        return this.httpPost("/card/pay/active");
    };
    /**
     * 对优惠券批价
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     * @param cardId 需要来配置库存的card_id
     * @param quantity 本次需要兑换的库存数目
     */
    ServiceClient.prototype.getPrice = function (cardId, quantity) {
        var data = {
            card_id: cardId,
            quantity: quantity
        };
        return this.httpPost("/card/pay/getpayprice", data);
    };
    /**
     * 查询券点余额
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     */
    ServiceClient.prototype.summary = function () {
        return this.httpGet("/card/pay/getcoinsinfo");
    };
    /**
     * 充值券点
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     * @param count 需要充值的券点数目，1点=1元
     */
    ServiceClient.prototype.recharge = function (count) {
        var data = {
            coin_count: count
        };
        return this.httpPost("/card/pay/recharge", data);
    };
    /**
     * 查询订单详情
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     * @param orderId 充值券点接口中获得的订单号，作为一次交易的唯一凭证
     */
    ServiceClient.prototype.order = function (orderId) {
        var data = {
            order_id: orderId
        };
        return this.httpPost("/card/pay/getorder", data);
    };
    /**
     * 查询券点流水详情
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     * @param filters
     */
    ServiceClient.prototype.orders = function (filters) {
        return this.httpPost("/card/pay/getorderlist", filters);
    };
    /**
     * 确认兑换库存
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     * @param cardId 需要来兑换库存的card_id
     * @param orderId 仅可以使用优惠券批价得到的订单号，保证批价有效性
     * @param quantity 本次需要兑换的库存数目
     */
    ServiceClient.prototype.confirm = function (cardId, orderId, quantity) {
        var data = {
            card_id: cardId,
            order_id: orderId,
            quantity: quantity
        };
        return this.httpPost("/card/pay/confirm", data);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
