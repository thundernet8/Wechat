import BaseServiceClient from "../../Core/ServiceClient";
import {
    IGetCustomerKFListResp,
    IGetCustomerKFOnlineListResp,
    IGetCustomerKFMessageListResp
} from "../Interface/ICustomerService";
import { addUrlQuery } from "../../Core/Utils/Url";
import BroadcastMessage from "../../Core/BroadcastMessage/BroadcastMessage";
import TextBroadcastMessage from "../../Core/BroadcastMessage/TextBroadcastMessage";

/**
 * Implement methods of CustomerService service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458557405
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 获取客服列表
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
     */
    public list() {
        return this.httpGet<IGetCustomerKFListResp>("cgi-bin/customservice/getkflist");
    }

    /**
     * 获取在线客服列表
     */
    public onlineList() {
        return this.httpGet<IGetCustomerKFOnlineListResp>("cgi-bin/customservice/getonlinekflist");
    }

    /**
     * 添加客服帐号
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号，帐号前缀最多10个字符，必须是英文、数字字符或者下划线，后缀为公众号微信号，长度不超过30个字符
     * @param nickname 客服昵称，最长16个字
     */
    public create(account: string, nickname: string) {
        const data = {
            kf_account: account,
            nickname
        };

        return this.httpPost<string>("/customservice/kfaccount/add", data);
    }

    /**
     * 设置客服信息
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param nickname 客服昵称，最长16个字
     */
    public update(account: string, nickname: string) {
        const data = {
            kf_account: account,
            nickname
        };

        return this.httpPost<string>("/customservice/kfaccount/update", data);
    }

    /**
     * 删除客服帐号
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     */
    public delete(account: string) {
        const params = {
            kf_account: account
        };

        return this.httpGet<string>("/customservice/kfaccount/del", params);
    }

    /**
     * 邀请绑定客服帐号
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param wechatId 接收绑定邀请的客服微信号
     */
    public invite(account: string, wechatId: string) {
        const data = {
            kf_account: account,
            invite_wx: wechatId
        };

        return this.httpPost<string>("/customservice/kfaccount/inviteworker", data);
    }

    /**
     * 上传客服头像
     * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param imagePath 图片路径
     */
    public uploadAvatar(account: string, imagePath: string) {
        const params = {
            kf_account: account
        };

        const endpoint = addUrlQuery("/customservice/kfaccount/uploadheadimg", params);

        return this.httpFormUpload<string>(endpoint, imagePath);
    }

    /**
     * 客服接口-发消息
     * @param message 文本或BroadcastMessage子类实例
     * @param to 目标用户OpenId
     * @param kfAccount 以某个客服帐号来发消息(可选)
     */
    public sendMessage(message: string | BroadcastMessage, to: string, kfAccount?: string) {
        if (typeof message === "string") {
            message = new TextBroadcastMessage(message);
        }

        if (!(message instanceof BroadcastMessage)) {
            throw new Error("Invalid message");
        }

        const data = message.toPOJO();
        data["touser"] = to;
        if (kfAccount) {
            data["customservice"] = {
                kf_account: kfAccount
            };
        }

        return this.httpPost<string>("/cgi-bin/message/custom/send", data);
    }

    /**
     * 客服输入状态
     * @param to 目标用户OpenId
     */
    public sendTypingStatus(to: string) {
        const data = {
            touser: to,
            command: "Typing"
        };

        return this.httpPost<string>("/cgi-bin/message/custom/typing", data);
    }

    /**
     * 获取聊天记录
     * @param startTime 起始时间，unix时间戳
     * @param endTime 结束时间，unix时间戳，每次查询时段不能超过24小时
     * @param msgId 消息id顺序从小到大，从1开始
     * @param count 每次获取条数，最多10000条
     */
    public messageHistory(
        startTime: number,
        endTime: number,
        msgId: number = 1,
        count: number = 10000
    ) {
        const data = {
            starttime: startTime,
            endtime: endTime,
            msgid: msgId,
            number: count
        };

        return this.httpPost<IGetCustomerKFMessageListResp>(
            "/customservice/msgrecord/getmsglist",
            data
        );
    }
}
