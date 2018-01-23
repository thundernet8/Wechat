export interface ICustomerKF {
    kf_account: string;
    kf_headimgurl: string;
    kf_id: string;
    kf_nick: string;
    kf_wx: string;
    invite_wx?: string;
    invite_expire_time?: number;
    invite_status?: string;
}

export interface ICustomerKFOnline {
    kf_account: string;
    status: number;
    kf_id: string;
    accepted_case: number;
}

export interface IGetCustomerKFListResp {
    kf_list: ICustomerKF[];
}

export interface IGetCustomerKFOnlineListResp {
    kf_online_list: ICustomerKFOnline[];
}

export interface ICustomerKFMessageRecord {
    openid: string;
    opercode: number;
    text: string;
    time: number;
    worker: string;
}

export interface IGetCustomerKFMessageListResp {
    recordlist: ICustomerKFMessageRecord[];
}

export interface IGetKFSessionListResp {
    sessionlist: {
        createtime: number;
        openid: string;
    }[];
}

export interface IGetKFSessionWaitingListResp {
    count: number;
    waitcaselist: {
        latest_time: number;
        openid: string;
    }[];
}

export interface IGetCustomerSessionResp {
    createtime: number;
    kf_account: string;
}
