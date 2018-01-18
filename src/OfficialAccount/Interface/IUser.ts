export interface IUserTag {
    id: number;
    name: string;
}

export interface ICreateTagResp {
    tag: IUserTag;
}

export interface IGetTagsResp {
    tags: (IUserTag & { count: number })[];
}

export interface IGetTagUserListResp {
    count: number;
    data: {
        openid: string[];
    };
    next_openid: string; //拉取列表最后一个用户的openid
}

export interface IGetUserTagsResp {
    tagid_list: number[];
}

export interface IGetUserInfoResp {
    subscribe: number;
    openid: string;
    nickname: string;
    sex: number;
    language: string;
    city: string;
    province: string;
    country: string;
    headimgurl: string;
    subscribe_time: number;
    unionid: string;
    remark: string;
    groupid: number;
    tagid_list: number[];
}

export interface IGetUserListResp {
    total: number;
    count: number;
    data: {
        openid: string[];
        next_openid: string;
    };
}

export interface IGetUserBlackListResp {
    total: number;
    count: number;
    data: {
        openid: string[];
    };
    next_openid: string;
}
