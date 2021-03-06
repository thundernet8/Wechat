import BaseServiceClient from "../../Core/ServiceClient";
import { ISemanticQueryResp } from "../Interface/ISemantic";

/**
 * Implement methods of Semantic service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141241
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 语义理解查询
     * @param keyword
     * @param categories
     * @param ext 至少提供城市/经纬度信息其一
     */
    public query(keyword: string, categories: string, ext: { [key: string]: any }) {
        const data = Object.assign(
            {
                query: keyword,
                category: categories,
                appid: this.app.appid
            },
            ext || {}
        );

        return this.httpPost<ISemanticQueryResp>("/semantic/semproxy/search", data);
    }
}
