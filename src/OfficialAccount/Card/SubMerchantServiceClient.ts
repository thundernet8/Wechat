import BaseServiceClient from "../../Core/ServiceClient";
import {
    ICreateSubMerchantReq,
    ICreateSubMerchantResp,
    IUpdateSubMerchantReq,
    IUpdateSubMerchantResp,
    IGetSubMerchantResp,
    IGetSubMerchantListResp
} from "../Interface/ICard";

/**
 * Implement methods of Sub Merchant Card service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 创建子商户
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
     * @param info
     */
    public create(info: ICreateSubMerchantReq) {
        const data = {
            info
        };

        return this.httpPost<ICreateSubMerchantResp>("/card/submerchant/submit", data);
    }

    /**
     * 更新子商户
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
     * @param merchantId
     * @param info
     */
    public update(merchantId: number, info: IUpdateSubMerchantReq) {
        const data = {
            info: Object.assign(
                {
                    merchant_id: merchantId
                },
                info
            )
        };

        return this.httpPost<IUpdateSubMerchantResp>("/card/submerchant/update", data);
    }

    /**
     * 获取子商户信息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
     * @param merchantId
     */
    public stats(merchantId: number) {
        const data = {
            merchant_id: merchantId
        };

        return this.httpPost<IGetSubMerchantResp>("/card/submerchant/get", data);
    }

    /**
     * 批量获取子商户信息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
     * @param beginId 起始的子商户id，一个母商户公众号下唯一
     * @param limit 拉取的子商户的个数，最大值为100
     * @param status 子商户审核状态，填入后，只会拉出当前状态的子商户
     */
    public list(beginId: number = 0, limit: number = 50, status: string = "CHECKING") {
        const data = {
            begin_id: beginId,
            limit,
            status
        };

        return this.httpPost<IGetSubMerchantListResp>("/card/submerchant/batchget", data);
    }
}
