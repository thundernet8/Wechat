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
 * Implement methods of Card service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141229
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取卡券颜色列表
     */
    ServiceClient.prototype.colors = function () {
        return this.httpGet("/card/getcolors");
    };
    /**
     * 卡券开放类目查询接口
     */
    ServiceClient.prototype.categories = function () {
        return this.httpGet("/card/getapplyprotocol");
    };
    /**
     * 创建卡券
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025056
     * @param cardType
     * @param attributes
     */
    ServiceClient.prototype.create = function (cardType, attributes) {
        var data = {
            card: (_a = {
                    card_type: cardType.toLowerCase()
                },
                _a[cardType.toLowerCase()] = attributes,
                _a)
        };
        return this.httpPost("/card/create", data);
        var _a;
    };
    /**
     * 查看卡券详情
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param cardId
     */
    ServiceClient.prototype.stats = function (cardId) {
        var data = {
            card_id: cardId
        };
        return this.httpPost("/card/get", data);
    };
    /**
     * 批量查询卡券列表
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param offset
     * @param count
     * @param statusList "CARD_STATUS_VERIFY_OK|CARD_STATUS_NOT_VERIFY|CARD_STATUS_VERIFY_FAIL|CARD_STATUS_DELETE|CARD_STATUS_DISPATCH"
     */
    ServiceClient.prototype.list = function (offset, count, statusList) {
        if (offset === void 0) { offset = 0; }
        if (count === void 0) { count = 10; }
        if (statusList === void 0) { statusList = ["CARD_STATUS_VERIFY_OK"]; }
        var data = {
            offset: offset,
            count: count,
            status_list: statusList
        };
        return this.httpPost("/card/batchget", data);
    };
    /**
     * 更改卡券信息接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param cardId
     * @param type WechatOne.Core.CardType
     * @param attributes
     */
    ServiceClient.prototype.update = function (cardId, type, attributes) {
        var data = (_a = {
                card_id: cardId
            },
            _a[type.toLowerCase()] = attributes,
            _a);
        return this.httpPost("/card/update", data);
        var _a;
    };
    /**
     * 删除卡券接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param cardId
     */
    ServiceClient.prototype.delete = function (cardId) {
        var data = {
            card_id: cardId
        };
        return this.httpPost("/card/delete", data);
    };
    /**
     * 创建二维码
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param cards
     */
    ServiceClient.prototype.createQrCode = function (cards) {
        var isMulti = Array.isArray(cards);
        var data = {
            action_name: isMulti ? "QR_MULTIPLE_CARD" : "QR_CARD",
            action_info: isMulti ? { multiple_card: { card_list: cards } } : { card: cards }
        };
        if (!isMulti && cards["expire_seconds"]) {
            data["expire_seconds"] = cards["expire_seconds"];
            delete cards["expire_seconds"];
        }
        return this.httpPost("/card/qrcode/create", data);
    };
    /**
     * 通过ticket换取二维码链接
     * @param ticket
     */
    ServiceClient.prototype.getQrCodeUrl = function (ticket) {
        return "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket;
    };
    /**
     * 创建货架接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param banner 页面的banner图片链接，须调用，建议尺寸为640*300
     * @param pageTitle 页面的title
     * @param canShare 页面是否可以分享
     * @param scene 投放页面的场景值； SCENE_NEAR_BY 附近 SCENE_MENU 自定义菜单 SCENE_QRCODE 二维码 SCENE_ARTICLE 公众号文章 SCENE_H5 h5页面 SCENE_IVR 自动回复 SCENE_CARD_CUSTOM_CELL 卡券自定义cell
     * @param cardList 卡券列表，每个item有两个字段: 1.card_id-所要在页面投放的card_id 2.thumb_url-缩略图url
     */
    ServiceClient.prototype.createLandingPage = function (banner, pageTitle, canShare, scene, cardList) {
        var data = {
            banner: banner,
            page_title: pageTitle,
            can_share: canShare,
            scene: scene,
            card_list: cardList
        };
        return this.httpPost("/landingpage/create", data);
    };
    /**
     * 图文消息群发卡券
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param cardId
     */
    ServiceClient.prototype.getHtml = function (cardId) {
        var data = {
            card_id: cardId
        };
        return this.httpPost("/card/mpnews/gethtml", data);
    };
    /**
     * 设置测试白名单
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param openIds 用户的OpenId或用户名列表
     * @param isUsername 是否提交的用户名
     */
    ServiceClient.prototype.setTestWhitelist = function (openIds, isUsername) {
        if (isUsername === void 0) { isUsername = false; }
        var data = isUsername
            ? {
                username: openIds
            }
            : {
                openid: openIds
            };
        return this.httpPost("/card/testwhitelist/set", data);
    };
    /**
     * 获取用户已领取卡券
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param openId 需要查询的用户openid
     * @param cardId 卡券ID。不填写时默认查询当前appid下的卡券
     */
    ServiceClient.prototype.getUserCards = function (openId, cardId) {
        if (cardId === void 0) { cardId = ""; }
        var data = {
            openid: openId,
            card_id: cardId
        };
        return this.httpPost("/card/user/getcardlist", data);
    };
    /**
     * 设置买单接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025056
     * @param cardId
     * @param isOpen
     */
    ServiceClient.prototype.setPayCell = function (cardId, isOpen) {
        if (isOpen === void 0) { isOpen = true; }
        var data = {
            card_id: cardId,
            is_open: isOpen
        };
        return this.httpPost("/card/paycell/set", data);
    };
    /**
     * 增加卡券库存
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param cardId
     * @param amount
     */
    ServiceClient.prototype.increaseStock = function (cardId, amount) {
        return this.updateStock(cardId, amount, "increase");
    };
    /**
     * 减少卡券库存
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param cardId
     * @param amount
     */
    ServiceClient.prototype.reduceStock = function (cardId, amount) {
        return this.updateStock(cardId, amount, "reduce");
    };
    /**
     * 修改库存接口
     * @param cardId
     * @param amount
     * @param action
     */
    ServiceClient.prototype.updateStock = function (cardId, amount, action) {
        if (action === void 0) { action = "increase"; }
        var data = (_a = {
                card_id: cardId
            },
            _a[action === "increase" ? "increase_stock_value" : "reduce_stock_value"] = Math.abs(amount),
            _a);
        return this.httpPost("/card/modifystock", data);
        var _a;
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
