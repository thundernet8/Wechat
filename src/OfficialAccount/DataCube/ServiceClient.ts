import BaseServiceClient from "../../Core/ServiceClient";
import {
    IGetUserSummaryResp,
    IGetUserCumulateResp,
    IGetArticleSummaryResp,
    IGetArticleTotalResp,
    IGetReadSummaryResp,
    IGetReadHourlyResp,
    IGetShareSummaryResp,
    IGetShareHourlyResp,
    IGetUpstreamMsgResp,
    IGetUpstreamMsgHourlyResp,
    IGetUpstreamMsgWeeklyResp,
    IGetUpstreamMsgMonthResp,
    IGetUpstreamMsgDistResp,
    IGetUpstreamMsgDistWeeklyResp,
    IGetUpstreamMsgDistMonthlyResp,
    IGetInterfaceSummaryResp,
    IGetInterfaceSummaryHourlyResp,
    IGetCardSummaryResp,
    IGetFreeCardSummaryResp,
    IGetMemberCardSummaryResp,
    IGetMemberCardDetailResp
} from "../Interface/IDataCube";

/**
 * Implement methods of Date Cube service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141082
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141084
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141085
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141086
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 获取用户增减数据
     * @param from
     * @param to
     */
    public userSummary(from: string, to: string) {
        return this.query<IGetUserSummaryResp>("/datacube/getusersummary", from, to);
    }

    /**
     * 获取累计用户数据
     * @param from
     * @param to
     */
    public userCumulate(from: string, to: string) {
        return this.query<IGetUserCumulateResp>("/datacube/getusercumulate", from, to);
    }

    /**
     * 获取图文群发每日数据
     * @param from
     * @param to
     */
    public articleSummary(from: string, to: string) {
        return this.query<IGetArticleSummaryResp>("/datacube/getarticlesummary", from, to);
    }

    /**
     * 获取图文群发总数据
     * @param from
     * @param to
     */
    public articleTotal(from: string, to: string) {
        return this.query<IGetArticleTotalResp>("/datacube/getarticletotal", from, to);
    }

    /**
     * 获取图文阅读统计数据
     * @param from
     * @param to
     */
    public userReadSummary(from: string, to: string) {
        return this.query<IGetReadSummaryResp>("/datacube/getuserread", from, to);
    }

    /**
     * 获取图文阅读统计分时数据
     * @param from
     * @param to
     */
    public userReadHourly(from: string, to: string) {
        return this.query<IGetReadHourlyResp>("/datacube/getuserreadhour", from, to);
    }

    /**
     * 获取图文分享转发数据
     * @param from
     * @param to
     */
    public userShareSummary(from: string, to: string) {
        return this.query<IGetShareSummaryResp>("/datacube/getusershare", from, to);
    }

    /**
     * 获取图文分享转发分时数据
     * @param from
     * @param to
     */
    public userShareHourly(from: string, to: string) {
        return this.query<IGetShareHourlyResp>("/datacube/getusersharehour", from, to);
    }

    /**
     * 获取消息发送概况数据
     * @param from
     * @param to
     */
    public upstreamMessageSummary(from: string, to: string) {
        return this.query<IGetUpstreamMsgResp>("/datacube/getupstreammsg", from, to);
    }

    /**
     * 获取消息发送分时数据
     * @param from
     * @param to
     */
    public upstreamMessageHourly(from: string, to: string) {
        return this.query<IGetUpstreamMsgHourlyResp>("/datacube/getupstreammsghour", from, to);
    }

    /**
     * 获取消息发送周数据
     * @param from
     * @param to
     */
    public upstreamMessageWeekly(from: string, to: string) {
        return this.query<IGetUpstreamMsgWeeklyResp>("/datacube/getupstreammsgweek", from, to);
    }

    /**
     * 获取消息发送月数据
     * @param from
     * @param to
     */
    public upstreamMessageMonthly(from: string, to: string) {
        return this.query<IGetUpstreamMsgMonthResp>("/datacube/getupstreammsgmonth", from, to);
    }

    /**
     * 获取消息发送分布数据
     * @param from
     * @param to
     */
    public upstreamMessageDistSummary(from: string, to: string) {
        return this.query<IGetUpstreamMsgDistResp>("/datacube/getupstreammsgdist", from, to);
    }

    /**
     * 获取消息发送分布周数据
     * @param from
     * @param to
     */
    public upstreamMessageDistWeekly(from: string, to: string) {
        return this.query<IGetUpstreamMsgDistWeeklyResp>(
            "/datacube/getupstreammsgdistweek",
            from,
            to
        );
    }

    /**
     * 获取消息发送分布月数据
     * @param from
     * @param to
     */
    public upstreamMessageDistMonthly(from: string, to: string) {
        return this.query<IGetUpstreamMsgDistMonthlyResp>(
            "/datacube/getupstreammsgdistmonth",
            from,
            to
        );
    }

    /**
     * 获取接口分析数据
     * @param from
     * @param to
     */
    public interfaceSummary(from: string, to: string) {
        return this.query<IGetInterfaceSummaryResp>("/datacube/getinterfacesummary", from, to);
    }

    /**
     * 获取接口分析分时数据
     * @param from
     * @param to
     */
    public interfaceSummaryHourly(from: string, to: string) {
        return this.query<IGetInterfaceSummaryHourlyResp>(
            "/datacube/getinterfacesummaryhour",
            from,
            to
        );
    }

    /**
     * 拉取卡券概况数据接口
     * @param from
     * @param to
     * @param condSource
     */
    public cardSummary(from: string, to: string, condSource: number) {
        const extData = {
            cond_source: condSource
        };
        return this.query<IGetCardSummaryResp>("/datacube/getcardbizuininfo", from, to, extData);
    }

    /**
     * 获取免费券数据接口
     * @param from
     * @param to
     * @param condSource
     * @param cardId
     */
    public freeCardSummary(from: string, to: string, condSource: number = 0, cardId: string = "") {
        const extData = {
            cond_source: condSource,
            card_id: cardId
        };
        return this.query<IGetFreeCardSummaryResp>("/datacube/getcardcardinfo", from, to, extData);
    }

    /**
     * 拉取会员卡数据接口
     * @param from
     * @param to
     * @param condSource 卡券来源，0为公众平台创建的卡券数据、1是API创建的卡券数据
     */
    public memberCardSummary(from: string, to: string, condSource: number) {
        const extData = {
            cond_source: condSource
        };
        return this.query<IGetMemberCardSummaryResp>(
            "/datacube/getcardmembercardinfo",
            from,
            to,
            extData
        );
    }

    /**
     * 拉取单张会员卡数据接口
     * @param from
     * @param to
     * @param cardId
     */
    public memberCardDetail(from: string, to: string, cardId: string) {
        const extData = {
            card_id: cardId
        };
        return this.query<IGetMemberCardDetailResp>(
            "/datacube/getcardmembercarddetail",
            from,
            to,
            extData
        );
    }

    private query<T>(
        endpoint: string,
        from: string,
        to: string,
        extData?: { [key: string]: any }
    ): Promise<T> {
        const data = Object.assign(
            {
                begin_date: from,
                end_date: to
            },
            extData
        );

        return this.httpPost<T>(endpoint, data);
    }
}
