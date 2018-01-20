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
 * Implement methods of Date Cube service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141082
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141084
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141085
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141086
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取用户增减数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.userSummary = function (from, to) {
        return this.query("/datacube/getusersummary", from, to);
    };
    /**
     * 获取累计用户数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.userCumulate = function (from, to) {
        return this.query("/datacube/getusercumulate", from, to);
    };
    /**
     * 获取图文群发每日数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.articleSummary = function (from, to) {
        return this.query("/datacube/getarticlesummary", from, to);
    };
    /**
     * 获取图文群发总数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.articleTotal = function (from, to) {
        return this.query("/datacube/getarticletotal", from, to);
    };
    /**
     * 获取图文阅读统计数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.userReadSummary = function (from, to) {
        return this.query("/datacube/getuserread", from, to);
    };
    /**
     * 获取图文阅读统计分时数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.userReadHourly = function (from, to) {
        return this.query("/datacube/getuserreadhour", from, to);
    };
    /**
     * 获取图文分享转发数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.userShareSummary = function (from, to) {
        return this.query("/datacube/getusershare", from, to);
    };
    /**
     * 获取图文分享转发分时数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.userShareHourly = function (from, to) {
        return this.query("/datacube/getusersharehour", from, to);
    };
    /**
     * 获取消息发送概况数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.upstreamMessageSummary = function (from, to) {
        return this.query("/datacube/getupstreammsg", from, to);
    };
    /**
     * 获取消息发送分时数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.upstreamMessageHourly = function (from, to) {
        return this.query("/datacube/getupstreammsghour", from, to);
    };
    /**
     * 获取消息发送周数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.upstreamMessageWeekly = function (from, to) {
        return this.query("/datacube/getupstreammsgweek", from, to);
    };
    /**
     * 获取消息发送月数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.upstreamMessageMonthly = function (from, to) {
        return this.query("/datacube/getupstreammsgmonth", from, to);
    };
    /**
     * 获取消息发送分布数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.upstreamMessageDistSummary = function (from, to) {
        return this.query("/datacube/getupstreammsgdist", from, to);
    };
    /**
     * 获取消息发送分布周数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.upstreamMessageDistWeekly = function (from, to) {
        return this.query("/datacube/getupstreammsgdistweek", from, to);
    };
    /**
     * 获取消息发送分布月数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.upstreamMessageDistMonthly = function (from, to) {
        return this.query("/datacube/getupstreammsgdistmonth", from, to);
    };
    /**
     * 获取接口分析数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.interfaceSummary = function (from, to) {
        return this.query("/datacube/getinterfacesummary", from, to);
    };
    /**
     * 获取接口分析分时数据
     * @param from
     * @param to
     */
    ServiceClient.prototype.interfaceSummaryHourly = function (from, to) {
        return this.query("/datacube/getinterfacesummaryhour", from, to);
    };
    /**
     * 拉取卡券概况数据接口
     * @param from
     * @param to
     * @param condSource
     */
    ServiceClient.prototype.cardSummary = function (from, to, condSource) {
        var extData = {
            cond_source: condSource
        };
        return this.query("/datacube/getcardbizuininfo", from, to, extData);
    };
    /**
     * 获取免费券数据接口
     * @param from
     * @param to
     * @param condSource
     * @param cardId
     */
    ServiceClient.prototype.freeCardSummary = function (from, to, condSource, cardId) {
        if (condSource === void 0) { condSource = 0; }
        if (cardId === void 0) { cardId = ""; }
        var extData = {
            cond_source: condSource,
            card_id: cardId
        };
        return this.query("/datacube/getcardcardinfo", from, to, extData);
    };
    /**
     * 拉取会员卡数据接口
     * @param from
     * @param to
     * @param condSource 卡券来源，0为公众平台创建的卡券数据、1是API创建的卡券数据
     */
    ServiceClient.prototype.memberCardSummary = function (from, to, condSource) {
        var extData = {
            cond_source: condSource
        };
        return this.query("/datacube/getcardmembercardinfo", from, to, extData);
    };
    /**
     * 拉取单张会员卡数据接口
     * @param from
     * @param to
     * @param cardId
     */
    ServiceClient.prototype.memberCardDetail = function (from, to, cardId) {
        var extData = {
            card_id: cardId
        };
        return this.query("/datacube/getcardmembercarddetail", from, to, extData);
    };
    ServiceClient.prototype.query = function (endpoint, from, to, extData) {
        var data = Object.assign({
            begin_date: from,
            end_date: to
        }, extData);
        return this.httpPost(endpoint, data);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
