import IWXCommonResp from "../../Core/Interface/IWXCommonResp";
import CardType from "../../Core/Enum/CardType";
import CardCodeType from "../../Core/Enum/CardCodeType";

export interface IGetCardColorsResp extends IWXCommonResp {
    colors: {
        name: string;
        value: string;
    }[];
}

export interface IGetCardCategoriesResp extends IWXCommonResp {
    category: {
        category_name: string;
        primary_category_id: number;
        secondary_category: {
            can_choose_payment_card: number;
            can_choose_prepaid_card: number;
            category_name: string;
            need_qualification_stuffs: string[];
            secondary_category_id: number;
        }[];
    }[];
}

export interface IGetCardDetailResp extends IWXCommonResp {
    card: {
        card_type: CardType;
        discount: {
            base_info: {
                id: string;
                logo_url: string;
                code_type: CardCodeType;
                brand_name: string;
                title: string;
                date_info: {
                    type: "DATE_TYPE_FIX_TIME_RANGE" | "DATE_TYPE_FIX_TERM";
                    fixed_term: number;
                    fixed_begin_term: number;
                };
                color: string;
                notice: string;
                description: string;
                location_id_list: number[];
                get_limit: number;
                can_share: boolean;
                can_give_friend: boolean;
                status:
                    | "CARD_STATUS_VERIFY_OK"
                    | "CARD_STATUS_NOT_VERIFY"
                    | "CARD_STATUS_VERIFY_FAIL"
                    | "CARD_STATUS_DELETE"
                    | "CARD_STATUS_DISPATCH";
                sku: {
                    quantity: number;
                    total_quantity: number;
                };
                create_time: number;
                update_time: number;
                area_code_list: number[];
            };
            discount: number;
            advanced_info: {
                time_limit: [
                    {
                        type: string;
                    },
                    {
                        type: string;
                    }
                ];
                text_image_list: string[];
                business_service: string[];
                consume_share_card_list: string[];
                abstract: {
                    abstract: string;
                    icon_url_list: string[];
                };
                share_friends: boolean;
            };
        };
    };
}

export interface IGetCardListResp extends IWXCommonResp {
    card_id_list: string[];
    total_num: number;
}

export interface IUpdateCardResp extends IWXCommonResp {
    send_check: boolean;
}

export interface IQrScanCardInfo {
    code: string;
    card_id?: string;
    openid?: string;
    expire_seconds?: number;
    is_unique_code?: boolean;
    outer_id?: number;
    outer_str?: number;
}

export interface IGetCardQrCodeResp extends IWXCommonResp {
    ticket: string;
    expire_seconds: number;
    url: string;
    show_qrcode_url: string;
}

export interface ICreateLandingPageResp extends IWXCommonResp {
    url: string;
    page_id: number;
}

export interface IGetNewsBroadcastCardHtmlResp extends IWXCommonResp {
    content: string;
}

export interface IGetUserCardListResp extends IWXCommonResp {
    card_list: {
        code: string;
        card_id: string;
    }[];
    has_share_card: boolean;
}

export interface IGetDepositCount extends IWXCommonResp {
    count: number;
}

export interface ICheckCodeResp extends IWXCommonResp {
    exist_code: string[];
    not_exist_code: string[];
}

export interface IGetCardCodeResp extends IWXCommonResp {
    card?: {
        card_id: string;
        begin_time: number;
        end_time: number;
    };
    openid?: string;
    can_consume?: boolean;
    user_card_status?: string;
}

export interface IConsumeCardCodeResp extends IWXCommonResp {
    card: {
        card_id: string;
    };
    openid: string;
}

export interface IDecryptCardCodeResp extends IWXCommonResp {
    code: string;
}

export interface IActiveCardCoinAccountResp extends IWXCommonResp {
    reward: number;
}

export interface IGetCardCoinPayPriceResp extends IWXCommonResp {
    order_id: string;
    price: string;
    free_coin: string;
    pay_coin: string;
}

export interface IGetCardCoinSummaryInfoResp extends IWXCommonResp {
    free_coin: number;
    pay_coin: number;
    total_coin: number;
}

export interface IChargeCardCoinResp extends IWXCommonResp {
    order_id: string;
    qrcode_url: string;
    qrcode_buffer: string;
}

interface ICardCoinOrderInfo {
    order_id: string;
    status: string;
    create_time: number;
    pay_finish_time: number;
    desc: string;
    free_coin_count: string;
    pay_coin_count: string;
    refund_free_coin_count: string;
    refund_pay_coin_count: string;
    openid: string;
    order_type: string;
}

export interface IGetCardCoinOrderResp extends IWXCommonResp {
    order_info: ICardCoinOrderInfo;
}

export interface IGetCardCoinOrderListResp extends IWXCommonResp {
    order_info: ICardCoinOrderInfo;
    total_num: number;
}

export interface IUpdateGeneralCardUserReq {
    code: string;
    card_id: string;
    background_pic_url?: string;
    balance?: number;
    record_balance?: string;
    custom_field_value1?: string;
    custom_field_value2?: string;
    custom_field_value3?: string;
    can_give_friend?: boolean;
}

export interface IUpdateGeneralCardUserResp extends IWXCommonResp {
    result_bonus: number;
    result_balance: number;
    openid: string;
}

export interface IActivateMemberCardReq {
    init_bonus: number;
    init_bonus_record: string;
    init_balance: number;
    membership_number: string;
    code: string;
    card_id: string;
    background_pic_url: string;
    init_custom_field_value1: string;
}

export interface IGetMemberCardUserInfoResp extends IWXCommonResp {
    openid: string;
    nickname: string;
    membership_number: string;
    bonus: number;
    sex: string;
    user_info: {
        common_field_list: [
            {
                name: string;
                value: string;
            }[]
        ];
        custom_field_list: [
            {
                name: string;
                value: string;
                value_list: string[];
            }[]
        ];
    };
    user_card_status: string;
    has_active: boolean;
}

export interface IUpdateMemberCardUserInfoReq {
    code: string;
    card_id: string;
    background_pic_url?: string;
    record_bonus?: string;
    bonus?: number;
    add_bonus?: number;
    balance?: number;
    add_balance?: number;
    record_balance?: string;
    custom_field_value1?: string;
    custom_field_value2?: string;
    notify_optional?: {
        is_notify_bonus: boolean;
        is_notify_balance: boolean;
        is_notify_custom_field1: boolean;
    };
}

export interface IUpdateMemberCardUserInfoResp extends IWXCommonResp {
    result_bonus: number;
    result_balance: number;
    openid: string;
}

export interface IUpdateMovieTicketUserInfoReq {
    code: string;
    card_id: string;
    ticket_class: string;
    show_time: number;
    duration: number;
    screening_room?: string;
    seat_number?: string[];
}

export interface ICreateSubMerchantReq {
    brand_name: string;
    app_id?: string;
    logo_url: string;
    protocol: string;
    agreement_media_id?: string;
    operator_media_id?: string;
    end_time: number;
    primary_category_id: number;
    secondary_category_id: number;
}

export interface ICreateSubMerchantResp {
    info: {
        merchant_id: number;
        app_id: string;
        create_time: number;
        update_time: number;
        brand_name: string;
        logo_url: string;
        status: string;
        begin_time: number;
        end_time: number;
        primary_category_id: number;
        secondary_category_id: number;
    };
}

export interface IUpdateSubMerchantReq extends ICreateSubMerchantReq {
    merchant_id: number;
}

export interface IUpdateSubMerchantResp extends ICreateSubMerchantResp {}

export interface IGetSubMerchantResp extends ICreateSubMerchantResp {}

export interface IGetSubMerchantListResp {
    info_list: {
        merchant_id: number;
        create_time: number;
        update_time: number;
        brand_name: string;
        logo_url: string;
        status: string;
        begin_time: number;
        end_time: number;
        primary_category_id: number;
        secondary_category_id: number;
    }[];
    next_begin_id: number;
}
