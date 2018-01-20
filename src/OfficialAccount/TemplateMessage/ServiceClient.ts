import BaseServiceClient from "../../Core/ServiceClient";
import {
    IGetIndustryResp,
    IAddTemplateResp,
    IGetTemplateListResp,
    IDelTemplateResp,
    ISendTemplateMessageReq,
    ISendTemplateMessageResp,
    ISendSubscribeTemplateMessageResp
} from "../Interface/ITemplateMessage";

/**
 * Implement methods of Template Message service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751277
 */
export default class ServiceClient extends BaseServiceClient {
    private requiredMsgFields: string[] = ["touser", "template_id"];

    /**
     * 设置所属行业
     * @param primaryIndustry
     * @param subIndustry
     */
    public setIndustry(primaryIndustry: string, secondaryIndustry: string) {
        const data = {
            industry_id1: primaryIndustry,
            industry_id2: secondaryIndustry
        };

        return this.httpPost<string>("/cgi-bin/template/api_set_industry", data);
    }

    /**
     * 获取设置的行业信息
     */
    public getIndustry() {
        return this.httpPost<IGetIndustryResp>("/cgi-bin/template/get_industry");
    }

    /**
     * 获得模板ID
     * @param shortId
     */
    public addTemplate(shortId: string) {
        const data = {
            template_id_short: shortId
        };
        return this.httpPost<IAddTemplateResp>("/cgi-bin/template/api_add_template", data);
    }

    /**
     * 获取模板列表
     */
    public getPrivateTemplates() {
        return this.httpGet<IGetTemplateListResp>("/cgi-bin/template/get_all_private_template");
    }

    /**
     * 删除模板
     * @param templateId
     */
    public deletePrivateTemplate(templateId: string) {
        const data = {
            template_id: templateId
        };
        return this.httpPost<IDelTemplateResp>("/cgi-bin/template/del_private_template", data);
    }

    /**
     * 发送模板消息
     * @param data
     */
    public send(data: ISendTemplateMessageReq) {
        data = this.formatMessage(data);
        return this.httpPost<ISendTemplateMessageResp>("/cgi-bin/message/template/send", data);
    }

    /**
     * 一次性订阅消息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1500374289_66bvB
     * @param data
     */
    public sendSubscription(data: ISendTemplateMessageReq) {
        data = this.formatMessage(data);
        return this.httpPost<ISendSubscribeTemplateMessageResp>(
            "/cgi-bin/message/template/subscribe",
            data
        );
    }

    private formatMessage(msg: ISendTemplateMessageReq) {
        const data = Object.assign(
            {
                touser: "",
                template_id: "",
                url: "",
                data: {}
            },
            msg
        );

        for (let key in data) {
            if (this.requiredMsgFields.includes(key) && !data[key]) {
                throw new Error(`Field ${key} can not be empty`);
            }
        }

        data["data"] = this.formatData(data["data"]);

        return data;
    }

    private formatData(data) {
        const formatted = {};
        Object.keys(data).forEach(key => {
            const value = data[key];
            if (Array.isArray(value) && value.length >= 1) {
                formatted[key] =
                    value.length > 1
                        ? {
                              value: value[0],
                              color: value[1]
                          }
                        : { value: value[0] };
            } else if (value["value"]) {
                formatted[key] = value;
            } else {
                formatted[key] = {
                    value: value ? value.toString() : ""
                };
            }
        });

        return formatted;
    }
}
