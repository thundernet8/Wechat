import BaseServiceClient from "../../Core/ServiceClient";
import IWXCommonResp from "../../Core/Interface/IWXCommonResp";

/**
 * Implement methods of URL service
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 长链接转短链接
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1443433600
     * @param url 原始链接
     */
    public shorten(url: string): Promise<string> {
        return this.httpPost<IWXCommonResp & { short_url: string }>("/cgi-bin/shorturl", {
            action: "long2short",
            long_url: url
        }).then(resp => resp.short_url);
    }
}
