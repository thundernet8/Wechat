import BaseServiceClient from "../../Core/ServiceClient";
import { ICreateQrCodeResp } from "../Interface/IQrCode";

/**
 * Implement methods of QrCode service
 */
export default class ServiceClient extends BaseServiceClient {
    private SCENE_MAX_VALUE = 100000;
    private SCENE_QR_CARD = "QR_CARD";
    private SCENE_QR_TEMPORARY = "QR_SCENE";
    private SCENE_QR_TEMPORARY_STR = "QR_STR_SCENE";
    private SCENE_QR_FOREVER = "QR_LIMIT_SCENE";
    private SCENE_QR_FOREVER_STR = "QR_LIMIT_STR_SCENE";

    /**
     * 创建永久二维码
     * @param sceneValue 场景值
     */
    public forever(sceneValue: string | number) {
        let actionName;
        let scene;
        if (typeof sceneValue === "number" && sceneValue > 0 && sceneValue < this.SCENE_MAX_VALUE) {
            actionName = this.SCENE_QR_FOREVER;
            scene = {
                scene_id: sceneValue
            };
        } else {
            actionName = this.SCENE_QR_FOREVER_STR;
            scene = {
                scene_str: sceneValue
            };
        }

        return this.create(actionName, scene, false);
    }

    /**
     * 创建临时二维码
     * @param sceneValue 场景值
     * @param expireSeconds 二维码有效时间
     */
    public temporary(sceneValue: string | number, expireSeconds?: number) {
        let actionName;
        let scene;
        if (typeof sceneValue === "number" && sceneValue > 0 && sceneValue < this.SCENE_MAX_VALUE) {
            actionName = this.SCENE_QR_TEMPORARY;
            scene = {
                scene_id: sceneValue
            };
        } else {
            actionName = this.SCENE_QR_TEMPORARY_STR;
            scene = {
                scene_str: sceneValue
            };
        }

        return this.create(actionName, scene, true, expireSeconds);
    }

    /**
     * 通过ticket换取二维码
     * @param ticket 二维码ticket
     */
    public url(ticket: string) {
        return `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${encodeURIComponent(ticket)}`;
    }

    /**
     * 创建二维码
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1443433542
     * @param actionName 二维码类型，QR_SCENE为临时的整型参数值，QR_STR_SCENE为临时的字符串参数值，QR_LIMIT_SCENE为永久的整型参数值，QR_LIMIT_STR_SCENE为永久的字符串参数值
     * @param actionInfo 二维码详细信息
     * @param isTemporary
     * @param expireSeconds
     */
    private create(
        actionName: string,
        actionInfo: { scene: { scene_id?: number; scene_str?: string } },
        isTemporary: boolean = true,
        expireSeconds?: number
    ): Promise<ICreateQrCodeResp> {
        expireSeconds = expireSeconds || 7 * 3600 * 24;
        const data = {
            action_name: actionName,
            action_info: actionInfo
        };

        if (isTemporary) {
            data["expire_seconds"] = Math.min(expireSeconds, 30 * 3600 * 24);
        }

        return this.httpPost<ICreateQrCodeResp>("/cgi-bin/qrcode/create", data);
    }
}
