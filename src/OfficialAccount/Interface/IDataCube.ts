// 用户分析数据

export interface IGetUserSummaryResp {
    list: {
        ref_date: string;
        user_source: number;
        new_user: number;
        cancel_user: number;
    }[];
}

export interface IGetUserCumulateResp {
    list: {
        ref_date: string;
        cumulate_user: number;
    }[];
}

// 图文分析数据

interface IReadBase {
    int_page_read_user: number;
    int_page_read_count: number;
    ori_page_read_user: number;
    ori_page_read_count: number;
}

interface IShareBase {
    share_user: number;
    share_count: number;
}

interface IFavoriteBase {
    add_to_fav_user: string;
    add_to_fav_count: string;
}

export interface IGetArticleSummaryResp {
    list: (IReadBase &
        IShareBase &
        IFavoriteBase & {
            ref_date: string;
            msgid: string;
            title: string;
        })[];
}

export interface IGetArticleTotalResp {
    list: {
        ref_date: string;
        msgid: string;
        title: string;
        details: (IReadBase &
            IShareBase &
            IFavoriteBase & {
                stat_date: string;
                target_user: number;
                int_page_from_session_read_user: number;
                int_page_from_session_read_count: number;
                int_page_from_hist_msg_read_user: number;
                int_page_from_hist_msg_read_count: number;
                int_page_from_feed_read_user: number;
                int_page_from_feed_read_count: number;
                int_page_from_friends_read_user: number;
                int_page_from_friends_read_count: number;
                int_page_from_other_read_user: number;
                int_page_from_other_read_count: number;
                feed_share_from_session_user: number;
                feed_share_from_session_cnt: number;
                feed_share_from_feed_user: number;
                feed_share_from_feed_cnt: number;
                feed_share_from_other_user: number;
                feed_share_from_other_cnt: number;
            })[];
    }[];
}

export interface IGetReadSummaryResp {
    list: (IReadBase &
        IShareBase &
        IFavoriteBase & {
            ref_date: string;
        })[];
}

export interface IGetReadHourlyResp {
    list: (IReadBase &
        IShareBase &
        IFavoriteBase & {
            ref_date: string;
            ref_hour: number;
            user_source: number;
        })[];
}

export interface IGetShareSummaryResp {
    list: (IShareBase & {
        ref_date: string;
        share_scene: number;
    })[];
}

export interface IGetShareHourlyResp {
    list: (IShareBase & {
        ref_date: string;
        ref_hour: number;
        share_scene: number;
    })[];
}

// 消息分析数据

interface IMsgBase {
    msg_type: number;
    msg_user: number;
    msg_count: number;
}

export interface IGetUpstreamMsgResp {
    list: (IMsgBase & {
        ref_date: string;
    })[];
}

export interface IGetUpstreamMsgHourlyResp {
    list: (IMsgBase & {
        ref_date: string;
        ref_hour: number;
    })[];
}

export interface IGetUpstreamMsgWeeklyResp {
    list: (IMsgBase & {
        ref_date: string;
    })[];
}

export interface IGetUpstreamMsgMonthResp {
    list: (IMsgBase & {
        ref_date: string;
    })[];
}

export interface IGetUpstreamMsgDistResp {
    list: ({
        ref_date: string;
        count_interval: number;
        msg_user: number;
    })[];
}

export interface IGetUpstreamMsgDistWeeklyResp {
    list: ({
        ref_date: string;
        count_interval: number;
        msg_user: number;
    })[];
}

export interface IGetUpstreamMsgDistMonthlyResp {
    list: ({
        ref_date: string;
        count_interval: number;
        msg_user: number;
    })[];
}

// 接口数据分析

export interface IGetInterfaceSummaryResp {
    list: {
        ref_date: string;
        callback_count: number;
        fail_count: number;
        total_time_cost: number;
        max_time_cost: number;
    }[];
}

export interface IGetInterfaceSummaryHourlyResp {
    list: {
        ref_date: string;
        ref_hour: number;
        callback_count: number;
        fail_count: number;
        total_time_cost: number;
        max_time_cost: number;
    }[];
}

// 卡券概况数据

interface ICardBase {
    view_cnt: number;
    view_user: number;
    receive_cnt: number;
    receive_user: number;
    verify_cnt: number;
    verify_user: number;
    given_cnt: number;
    given_user: number;
    expire_cnt: number;
    expire_user: number;
}

export interface IGetCardSummaryResp {
    list: (ICardBase & {
        ref_date: string;
    })[];
}

export interface IGetFreeCardSummaryResp {
    list: (ICardBase & {
        ref_date: string;
        card_id: string;
        card_type: number;
    })[];
}

interface IMemberCardBase {
    view_cnt: number;
    view_user: number;
    receive_cnt: number;
    receive_user: number;
    active_user: number;
    verify_cnt: number;
    verify_user: number;
    total_user: number;
}

export interface IGetMemberCardSummaryResp {
    list: (IMemberCardBase & {
        ref_date: string;
        total_receive_user: number;
    })[];
}

export interface IGetMemberCardDetailResp {
    list: (IMemberCardBase & {
        ref_date: string;
        merchanttype: number;
        cardid: string;
        submerchantid: number;
        active_cnt: number;
        new_user: number;
        payOriginalFee: number;
        fee: number;
    })[];
}
