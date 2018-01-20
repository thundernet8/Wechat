import IWXCommonResp from "../../Core/Interface/IWXCommonResp";

export interface IDeviceTransMsgResp {
    ret: number;
    ret_info: string;
}

export interface IDeviceGetOpenIdResp {
    open_id: string[];
    resp_msg: {
        ret_code: number;
        error_info: string;
    };
}

export interface IDeviceGetQrCodeResp extends IWXCommonResp {
    device_num: number;
    code_list: {
        device_id: string;
        ticket: string;
    }[];
}

export interface IDeviceVerifyQrCodeResp extends IWXCommonResp {
    device_type: string;
    device_id: string;
    mac: string;
}

export interface IDeviceCreateIdResp {
    resp_msg: {
        ret_code: number;
        error_info: string;
    };
    deviceid: string;
    qrticket: string;
}

export interface IDevice {
    id: string;
    mac: string;
    connect_protocol: string;
    auth_key: string;
    close_strategy: string;
    conn_strategy: string;
    crypt_method: string;
    auth_ver: string;
    manu_mac_pos: string;
    ser_mac_pos: string;
}

export interface IDeviceAuthResp {
    resp: (IWXCommonResp & {
        base_info: {
            device_type: string;
            device_id: string;
        };
    })[];
}

export interface IDeviceStatResp extends IWXCommonResp {
    status: number;
    status_info: string;
}

export interface IDeviceBindResp {
    base_resp: IWXCommonResp;
}

export interface IDeviceForceBindResp extends IDeviceBindResp {}

export interface IDeviceForceUnbindResp extends IDeviceBindResp {}

export interface IDeviceGetBindingResp {
    resp_msg: {
        ret_code: number;
        error_info: string;
    };
    openid: string;
    device_list: {
        device_type: string;
        device_id: string;
    }[];
}
