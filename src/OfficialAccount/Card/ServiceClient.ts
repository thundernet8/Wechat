import BaseServiceClient from "../../Core/ServiceClient";
import {
    IGetCardColorsResp,
    IGetCardCategoriesResp,
    IGetCardDetailResp,
    IGetCardListResp,
    IUpdateCardResp,
    IQrScanCardInfo,
    IGetCardQrCodeResp,
    ICreateLandingPageResp,
    IGetNewsBroadcastCardHtmlResp,
    IGetUserCardListResp
} from "../Interface/ICard";
import CardType from "../../Core/Enum/CardType";

/**
 * Implement methods of Card service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141229
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 获取卡券颜色列表
     */
    public colors() {
        return this.httpGet<IGetCardColorsResp>("/card/getcolors");
    }

    /**
     * 卡券开放类目查询接口
     */
    public categories() {
        return this.httpGet<IGetCardCategoriesResp>("/card/getapplyprotocol");
    }

    /**
     * 创建卡券
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025056
     * @param cardType
     * @param attributes
     */
    public create(cardType: string | CardType, attributes: { [key: string]: any }) {
        const data = {
            card: {
                card_type: cardType.toLowerCase(),
                [cardType.toLowerCase()]: attributes
            }
        };

        return this.httpPost<any>("/card/create", data);
    }

    /**
     * 查看卡券详情
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param cardId
     */
    public stats(cardId: string) {
        const data = {
            card_id: cardId
        };

        return this.httpPost<IGetCardDetailResp>("/card/get", data);
    }

    /**
     * 批量查询卡券列表
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param offset
     * @param count
     * @param statusList "CARD_STATUS_VERIFY_OK|CARD_STATUS_NOT_VERIFY|CARD_STATUS_VERIFY_FAIL|CARD_STATUS_DELETE|CARD_STATUS_DISPATCH"
     */
    public list(
        offset: number = 0,
        count: number = 10,
        statusList: string[] = ["CARD_STATUS_VERIFY_OK"]
    ) {
        const data = {
            offset,
            count,
            status_list: statusList
        };

        return this.httpPost<IGetCardListResp>("/card/batchget", data);
    }

    /**
     * 更改卡券信息接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param cardId
     * @param type WechatOne.Core.CardType
     * @param attributes
     */
    public update(cardId: string, type: string, attributes: { [key: string]: any }) {
        const data = {
            card_id: cardId,
            [type.toLowerCase()]: attributes
        };

        return this.httpPost<IUpdateCardResp>("/card/update", data);
    }

    /**
     * 删除卡券接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param cardId
     */
    public delete(cardId: string) {
        const data = {
            card_id: cardId
        };

        return this.httpPost<string>("/card/delete", data);
    }

    /**
     * 创建二维码
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param cards
     */
    public createQrCode(cards: IQrScanCardInfo | IQrScanCardInfo[]) {
        const isMulti = Array.isArray(cards);
        const data = {
            action_name: isMulti ? "QR_MULTIPLE_CARD" : "QR_CARD",
            action_info: isMulti ? { multiple_card: { card_list: cards } } : { card: cards }
        };

        if (!isMulti && cards["expire_seconds"]) {
            data["expire_seconds"] = cards["expire_seconds"];
            delete cards["expire_seconds"];
        }

        return this.httpPost<IGetCardQrCodeResp>("/card/qrcode/create", data);
    }

    /**
     * 通过ticket换取二维码链接
     * @param ticket
     */
    public getQrCodeUrl(ticket: string) {
        return `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`;
    }

    /**
     * 创建货架接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param banner 页面的banner图片链接，须调用，建议尺寸为640*300
     * @param pageTitle 页面的title
     * @param canShare 页面是否可以分享
     * @param scene 投放页面的场景值； SCENE_NEAR_BY 附近 SCENE_MENU 自定义菜单 SCENE_QRCODE 二维码 SCENE_ARTICLE 公众号文章 SCENE_H5 h5页面 SCENE_IVR 自动回复 SCENE_CARD_CUSTOM_CELL 卡券自定义cell
     * @param cardList 卡券列表，每个item有两个字段: 1.card_id-所要在页面投放的card_id 2.thumb_url-缩略图url
     */
    public createLandingPage(
        banner: string,
        pageTitle: string,
        canShare: boolean,
        scene: string,
        cardList: { card_id: string; thumb_url: string }[]
    ) {
        const data = {
            banner,
            page_title: pageTitle,
            can_share: canShare,
            scene,
            card_list: cardList
        };

        return this.httpPost<ICreateLandingPageResp>("/landingpage/create", data);
    }

    /**
     * 图文消息群发卡券
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param cardId
     */
    public getHtml(cardId: string) {
        const data = {
            card_id: cardId
        };

        return this.httpPost<IGetNewsBroadcastCardHtmlResp>("/card/mpnews/gethtml", data);
    }

    /**
     * 设置测试白名单
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param openIds 用户的OpenId或用户名列表
     * @param isUsername 是否提交的用户名
     */
    public setTestWhitelist(openIds: string[], isUsername: boolean = false) {
        const data = isUsername
            ? {
                  username: openIds
              }
            : {
                  openid: openIds
              };

        return this.httpPost<string>("/card/testwhitelist/set", data);
    }

    /**
     * 获取用户已领取卡券
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param openId 需要查询的用户openid
     * @param cardId 卡券ID。不填写时默认查询当前appid下的卡券
     */
    public getUserCards(openId: string, cardId: string = "") {
        const data = {
            openid: openId,
            card_id: cardId
        };

        return this.httpPost<IGetUserCardListResp>("/card/user/getcardlist", data);
    }

    /**
     * 设置买单接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025056
     * @param cardId
     * @param isOpen
     */
    public setPayCell(cardId: string, isOpen: boolean = true) {
        const data = {
            card_id: cardId,
            is_open: isOpen
        };

        return this.httpPost<string>("/card/paycell/set", data);
    }

    /**
     * 增加卡券库存
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param cardId
     * @param amount
     */
    public increaseStock(cardId: string, amount: number) {
        return this.updateStock(cardId, amount, "increase");
    }

    /**
     * 减少卡券库存
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param cardId
     * @param amount
     */
    public reduceStock(cardId: string, amount: number) {
        return this.updateStock(cardId, amount, "reduce");
    }

    /**
     * 修改库存接口
     * @param cardId
     * @param amount
     * @param action
     */
    private updateStock(cardId: string, amount: number, action: string = "increase") {
        const data = {
            card_id: cardId,
            [action === "increase" ? "increase_stock_value" : "reduce_stock_value"]: Math.abs(
                amount
            )
        };

        return this.httpPost<string>("/card/modifystock", data);
    }
}
