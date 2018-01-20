import IWXCommonResp from "../../Core/Interface/IWXCommonResp";

export interface IGetCommentListResp extends IWXCommonResp {
    total: number;
    comment: IComment[];
}

export interface IComment {
    user_comment_id: number;
    openid: string;
    create_time: number;
    content: string;
    comment_type: number; //是否精选评论，0为即非精选，1为true，即精选
    reply: IReply;
}

export interface IReply {
    content: string; //作者回复内容
    create_time: number;
}
