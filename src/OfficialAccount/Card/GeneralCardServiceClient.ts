import BaseServiceClient from "../../Core/ServiceClient";
import { IUpdateGeneralCardUserReq, IUpdateGeneralCardUserResp } from "../Interface/ICard";

/**
 * Implement methods of General Card service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=215143440770UT7Y
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 通用卡接口激活
     * @param info
     */
    public active(info: { [key: string]: any }) {
        return this.httpPost<any>("/card/generalcard/activate", info);
    }

    /**
     * 通用卡撤销激活
     * @param cardId
     * @param code
     */
    public deactivate(cardId: string, code: string) {
        const data = {
            card_id: cardId,
            code
        };

        return this.httpPost<any>("/card/generalcard/unactivate", data);
    }

    /**
     *  更新用户礼品卡信息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=215143440770UT7Y
     * @param params
     */
    public updateUser(params: IUpdateGeneralCardUserReq) {
        return this.httpPost<IUpdateGeneralCardUserResp>("/card/generalcard/updateuser", params);
    }
}
