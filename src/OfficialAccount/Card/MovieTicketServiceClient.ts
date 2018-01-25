import BaseServiceClient from "../../Core/ServiceClient";
import { IUpdateMovieTicketUserInfoReq } from "../Interface/ICard";

/**
 * Implement methods of Movie Ticket service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025288
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     *  更新电影券会员信息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025288
     * @param params
     */
    public updateUser(params: IUpdateMovieTicketUserInfoReq) {
        return this.httpPost<string>("/card/movieticket/updateuser", params);
    }
}
