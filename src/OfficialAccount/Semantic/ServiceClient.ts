import BaseServiceClient from "../../Core/ServiceClient";
import { ISemanticQueryResp } from "../Interface/ISemantic";

/**
 * Implement methods of Semantic service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141241
 */
export default class ServiceClient extends BaseServiceClient {
    public query(keyword: string, categories: string, optional?: { [key: string]: any }) {
        const data = Object.assign(
            {
                query: keyword,
                category: categories,
                appid: this.app.appid
            },
            optional || {}
        );

        return this.httpPost<ISemanticQueryResp>("/semantic/semproxy/search", data);
    }
}
