import BaseServiceClient from "../../Core/ServiceClient";
import {
    IGetKFSessionListResp,
    IGetKFSessionWaitingListResp,
    IGetCustomerSessionResp
} from "../Interface/ICustomerService";

/**
 * Implement methods of CustomerService session control service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044820
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 获取客服会话列表
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     */
    public list(account: string) {
        const params = {
            kf_account: account
        };

        return this.httpGet<IGetKFSessionListResp>(
            "/customservice/kfsession/getsessionlist",
            params
        );
    }

    /**
     * 获取未接入会话列表
     */
    public waitingList() {
        return this.httpGet<IGetKFSessionWaitingListResp>("/customservice/kfsession/getwaitcase");
    }

    /**
     * 创建会话
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param openId 粉丝的openid
     */
    public create(account: string, openId: string) {
        const data = {
            kf_account: account,
            openid: openId
        };

        return this.httpPost<string>("/customservice/kfsession/create", data);
    }

    /**
     * 关闭会话
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param openId 粉丝的openid
     */
    public close(account: string, openId: string) {
        const data = {
            kf_account: account,
            openid: openId
        };

        return this.httpPost<string>("/customservice/kfsession/close", data);
    }

    /**
     * 获取客户会话状态
     * @param openId 粉丝的openid
     */
    public stats(openId: string) {
        const params = {
            openid: openId
        };

        return this.httpGet<IGetCustomerSessionResp>("/customservice/kfsession/getsession", params);
    }
}
