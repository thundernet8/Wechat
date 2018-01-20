import IWXCommonResp from "../../Core/Interface/IWXCommonResp";

export interface IGetIndustryResp {
    primary_industry: { first_class: string; second_class: string };
    secondary_industry: { first_class: string; second_class: string };
}

export interface IAddTemplateResp extends IWXCommonResp {
    template_id: string;
}

export interface IGetTemplateListResp {
    template_list: {
        template_id: string;
        title: string;
        primary_industry: string;
        deputy_industry: string;
        content: string;
        example: string;
    }[];
}

export interface IDelTemplateResp extends IWXCommonResp {}

export interface ISendTemplateMessageReq {
    touser: string;
    template_id: string;
    url?: string;
    miniprogram?: {
        appid: string;
        pagepath: string;
    };
    scene?: string;
    title?: string;
    data: { [key: string]: { value: string; color?: string } };
}

export interface ISendTemplateMessageResp extends IWXCommonResp {
    msgid: number;
}

export interface ISendSubscribeTemplateMessageResp extends IWXCommonResp {}
