import BaseServiceClient from "../../Core/ServiceClient";
import {
    IActiveCardCoinAccountResp,
    IGetCardCoinPayPriceResp,
    IGetCardCoinSummaryInfoResp,
    IChargeCardCoinResp,
    IGetCardCoinOrderResp,
    IGetCardCoinOrderListResp
} from "../Interface/ICard";

/**
 * Implement methods of Card Coin service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1480492203_5tWvG
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 开通券点账户
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     */
    public active() {
        return this.httpPost<IActiveCardCoinAccountResp>("/card/pay/active");
    }

    /**
     * 对优惠券批价
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     * @param cardId 需要来配置库存的card_id
     * @param quantity 本次需要兑换的库存数目
     */
    public getPrice(cardId: string, quantity: number) {
        const data = {
            card_id: cardId,
            quantity
        };

        return this.httpPost<IGetCardCoinPayPriceResp>("/card/pay/getpayprice", data);
    }

    /**
     * 查询券点余额
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     */
    public summary() {
        return this.httpGet<IGetCardCoinSummaryInfoResp>("/card/pay/getcoinsinfo");
    }

    /**
     * 充值券点
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     * @param count 需要充值的券点数目，1点=1元
     */
    public recharge(count: number) {
        const data = {
            coin_count: count
        };

        return this.httpPost<IChargeCardCoinResp>("/card/pay/recharge", data);
    }

    /**
     * 查询订单详情
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     * @param orderId 充值券点接口中获得的订单号，作为一次交易的唯一凭证
     */
    public order(orderId: string) {
        const data = {
            order_id: orderId
        };

        return this.httpPost<IGetCardCoinOrderResp>("/card/pay/getorder", data);
    }

    /**
     * 查询券点流水详情
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     * @param filters
     */
    public orders(filters: { [key: string]: any }) {
        return this.httpPost<IGetCardCoinOrderListResp>("/card/pay/getorderlist", filters);
    }

    /**
     * 确认兑换库存
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
     * @param cardId 需要来兑换库存的card_id
     * @param orderId 仅可以使用优惠券批价得到的订单号，保证批价有效性
     * @param quantity 本次需要兑换的库存数目
     */
    public confirm(cardId: string, orderId: string, quantity: number) {
        const data = {
            card_id: cardId,
            order_id: orderId,
            quantity
        };

        return this.httpPost<string>("/card/pay/confirm", data);
    }
}
