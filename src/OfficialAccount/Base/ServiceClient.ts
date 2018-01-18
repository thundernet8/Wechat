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

    /**
     * 公众号调用或第三方平台帮公众号调用对公众号的所有api调用（包括第三方帮其调用）次数进行清零
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433744592
     */
    public clearQuota(): Promise<{ errcode: number; errmsg: string }> {
        return this.httpPost("/cgi-bin/clear_quota", { appid: this.app.appid });
    }
}
