import IWXCommonResp from "../../Core/Interface/IWXCommonResp";

interface IBusiness {
    base_info: {
        sid: string;
        business_name: string;
        branch_name: string;
        province: string;
        city: string;
        address: string;
        telephone: string;
        categories: string[];
        offset_type: number;
        longitude: string;
        latitude: string;
        photo_list: { photo_url: string }[];
        recommend: string;
        special: string;
        introduction: string;
        open_time: string;
        avg_price: number;
        available_state: number;
        update_status: number;
    };
}

export interface IGetPOIResp extends IWXCommonResp {
    business: IBusiness;
}

export interface IGetPOIListResp extends IWXCommonResp {
    business_list: IBusiness[];
}

export interface ICreatePOIReq extends IBusiness {}

export interface ICreatePOIResp extends IWXCommonResp {
    poi_id: number;
}

export interface IUpdatePOIReq extends IBusiness {}

export interface IGetPOICategoryListResp {
    category_list: string[];
}
