import BaseServiceClient from "../../Core/ServiceClient";

/**
 * Implement methods of AutoReply service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751299
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 获取公众号的自动回复规则
     */
    public current() {
        return this.httpGet<any>("/cgi-bin/get_current_autoreply_info");
    }
}
