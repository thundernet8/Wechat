import IWXCommonResp from "../../Core/Interface/IWXCommonResp";

export interface ISendBroadcastMessageResp extends IWXCommonResp {
    msg_id: number;
    msg_data_id: number;
}

export interface IPreviewBroadcastMessageResp extends IWXCommonResp {
    msg_id: number;
}

export interface IDeleteBroadMessageResp extends IWXCommonResp {}

export interface IGetBroadMessageResp {
    msg_id: number;
    msg_status: string;
}
