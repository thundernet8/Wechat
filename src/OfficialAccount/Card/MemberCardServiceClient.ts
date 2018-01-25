import BaseServiceClient from "../../Core/ServiceClient";
import {
    IActivateMemberCardReq,
    IGetMemberCardUserInfoResp,
    IUpdateMemberCardUserInfoReq,
    IUpdateMemberCardUserInfoResp
} from "../Interface/ICard";

/**
 * Implement methods of Member Card service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141229
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 会员卡接口激活
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
     * @param info
     */
    public active(info: IActivateMemberCardReq) {
        return this.httpPost<string>("/card/membercard/activate", info);
    }

    /**
     * 设置开卡字段
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
     * @param cardId
     * @param settings
     */
    public setActivationForm(cardId: string, settings: { [key: string]: any }) {
        const data = Object.assign(settings, { card_id: cardId });

        return this.httpPost<any>("/card/membercard/activateuserform/set", data);
    }

    /**
     * 拉取会员信息接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
     * @param cardId
     * @param code
     */
    public getUser(cardId: string, code: string) {
        const data = {
            card_id: cardId,
            code
        };

        return this.httpPost<IGetMemberCardUserInfoResp>("/card/membercard/userinfo/get", data);
    }

    /**
     *  更新会员信息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
     * @param params
     */
    public updateUser(params: IUpdateMemberCardUserInfoReq) {
        return this.httpPost<IUpdateMemberCardUserInfoResp>("/card/membercard/updateuser", params);
    }
}
