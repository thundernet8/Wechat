import BaseServiceClient from "../../Core/ServiceClient";

/**
 * Implement methods of Base service
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 获取微信服务器IP地址
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140187
     */
    public getValidIps(): Promise<string[]> {
        return this.httpGet<{ ip_list: string[] }>("/cgi-bin/getcallbackip").then(resp => {
            return resp.ip_list;
        });
    }
}
