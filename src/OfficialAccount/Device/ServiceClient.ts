import BaseServiceClient from "../../Core/ServiceClient";
import { base64Encode } from "../../Core/Utils/Text";
import {
    IDeviceTransMsgResp,
    IDeviceGetOpenIdResp,
    IDeviceGetQrCodeResp,
    IDeviceVerifyQrCodeResp,
    IDeviceCreateIdResp,
    IDevice,
    IDeviceAuthResp,
    IDeviceStatResp,
    IDeviceBindResp,
    IDeviceForceBindResp,
    IDeviceForceUnbindResp,
    IDeviceGetBindingResp
} from "../Interface/IDevice";

/**
 * Implement methods of Device service
 * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 第三方发送消息给设备主人的微信终端，并最终送达设备
     * @param deviceId
     * @param openId
     * @param content
     */
    public message(deviceId: string, openId: string, content: string) {
        const data = {
            device_type: this.app.getConfig("deviceType"),
            device_id: deviceId,
            open_id: openId,
            content: base64Encode(content)
        };

        return this.httpPost<IDeviceTransMsgResp>("/device/transmsg", data);
    }

    /**
     * 第三方主动发送设备状态消息给微信终端
     * @param deviceId
     * @param openId
     * @param type
     * @param status
     */
    public statMessage(deviceId: string, openId: string, type: number, status: number) {
        const data = {
            device_type: this.app.getConfig("deviceType"),
            device_id: deviceId,
            open_id: openId,
            msg_type: type,
            device_status: status
        };

        return this.httpPost<IDeviceTransMsgResp>("/device/transmsg", data);
    }

    /**
     * 获取设备绑定openID
     * @param deviceId
     */
    public openId(deviceId: string) {
        const data = {
            device_type: this.app.getConfig("deviceType"),
            device_id: deviceId
        };

        return this.httpGet<IDeviceGetOpenIdResp>("/device/get_openid", data);
    }

    /**
     * 获取设备二维码
     * @param deviceIds
     */
    public qrCode(deviceIds: string[]) {
        const data = {
            device_num: deviceIds.length,
            device_id: deviceIds
        };

        return this.httpPost<IDeviceGetQrCodeResp>("/device/create_qrcode", data);
    }

    /**
     * 验证二维码
     * @param ticket
     */
    public verifyQrCode(ticket: string) {
        const data = {
            ticket
        };

        return this.httpPost<IDeviceVerifyQrCodeResp>("/device/verify_qrcode", data);
    }

    /**
     * 获取 deviceid 和二维码
     * @param productId
     */
    public createId(productId: string) {
        const params = {
            product_id: productId
        };

        return this.httpGet<IDeviceCreateIdResp>("/device/getqrcode", params);
    }

    /**
     * 设备授权
     * @param devices
     * @param productId
     * @param opType
     */
    public authorize(devices: IDevice[], productId: string, opType: number) {
        const data = {
            device_num: devices.length,
            device_list: devices,
            op_type: opType,
            product_id: productId
        };

        return this.httpPost<IDeviceAuthResp>("/device/authorize_device", data);
    }

    /**
     * 利用 deviceid 更新设备属性
     * @param devices
     */
    public update(devices: IDevice[]) {
        const data = {
            device_num: devices.length,
            device_list: devices,
            op_type: 1
        };

        return this.httpPost<IDeviceAuthResp>("/device/authorize_device", data);
    }

    /**
     * 设备状态查询
     * @param deviceId
     */
    public stat(deviceId: string) {
        const params = {
            device_id: deviceId
        };

        return this.httpGet<IDeviceStatResp>("/device/get_stat", params);
    }

    /**
     * 设备绑定成功通知
     * @param openId
     * @param deviceId
     * @param ticket
     */
    public bind(openId: string, deviceId: string, ticket: string) {
        const data = {
            ticket,
            device_id: deviceId,
            openid: openId
        };

        return this.httpPost<IDeviceBindResp>("/device/bind", data);
    }

    /**
     * 设备解绑成功通知
     * @param openId
     * @param deviceId
     * @param ticket
     */
    public unbind(openId: string, deviceId: string, ticket: string) {
        const data = {
            ticket,
            device_id: deviceId,
            openid: openId
        };

        return this.httpPost<IDeviceBindResp>("/device/unbind", data);
    }

    /**
     * 强制绑定用户和设备
     * @param openId
     * @param deviceId
     */
    public forceBind(openId: string, deviceId: string) {
        const data = {
            device_id: deviceId,
            openid: openId
        };

        return this.httpPost<IDeviceForceBindResp>("/device/compel_bind", data);
    }

    /**
     * 强制解绑用户和设备
     * @param openId
     * @param deviceId
     */
    public forceUnbind(openId: string, deviceId: string) {
        const data = {
            device_id: deviceId,
            openid: openId
        };

        return this.httpPost<IDeviceForceUnbindResp>("/device/compel_unbind", data);
    }

    /**
     * 通过openid获取用户绑定的设备
     * @param openId
     */
    public getBindDevice(openId: string) {
        const params = {
            openid: openId
        };

        return this.httpGet<IDeviceGetBindingResp>("/device/get_bind_device", params);
    }
}
