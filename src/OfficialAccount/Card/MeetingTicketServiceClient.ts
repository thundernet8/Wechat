import BaseServiceClient from "../../Core/ServiceClient";
import { IUpdateGeneralCardUserReq, IUpdateGeneralCardUserResp } from "../Interface/ICard";

/**
 * Implement methods of Meeting Ticket service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141229
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     *  更新用户礼品卡信息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=215143440770UT7Y
     * @param params
     */
    public updateUser(params: IUpdateGeneralCardUserReq) {
        return this.httpPost<IUpdateGeneralCardUserResp>("/card/meetingticket/updateuser", params);
    }
}
