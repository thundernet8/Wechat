"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceClient_1 = require("../../Core/ServiceClient");
/**
 * Implement methods of Template Message service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751277
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.requiredMsgFields = ["touser", "template_id"];
        return _this;
    }
    /**
     * 设置所属行业
     * @param primaryIndustry
     * @param subIndustry
     */
    ServiceClient.prototype.setIndustry = function (primaryIndustry, secondaryIndustry) {
        var data = {
            industry_id1: primaryIndustry,
            industry_id2: secondaryIndustry
        };
        return this.httpPost("/cgi-bin/template/api_set_industry", data);
    };
    /**
     * 获取设置的行业信息
     */
    ServiceClient.prototype.getIndustry = function () {
        return this.httpPost("/cgi-bin/template/get_industry");
    };
    /**
     * 获得模板ID
     * @param shortId
     */
    ServiceClient.prototype.addTemplate = function (shortId) {
        var data = {
            template_id_short: shortId
        };
        return this.httpPost("/cgi-bin/template/api_add_template", data);
    };
    /**
     * 获取模板列表
     */
    ServiceClient.prototype.getPrivateTemplates = function () {
        return this.httpGet("/cgi-bin/template/get_all_private_template");
    };
    /**
     * 删除模板
     * @param templateId
     */
    ServiceClient.prototype.deletePrivateTemplate = function (templateId) {
        var data = {
            template_id: templateId
        };
        return this.httpPost("/cgi-bin/template/del_private_template", data);
    };
    /**
     * 发送模板消息
     * @param data
     */
    ServiceClient.prototype.send = function (data) {
        data = this.formatMessage(data);
        return this.httpPost("/cgi-bin/message/template/send", data);
    };
    /**
     * 一次性订阅消息
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1500374289_66bvB
     * @param data
     */
    ServiceClient.prototype.sendSubscription = function (data) {
        data = this.formatMessage(data);
        return this.httpPost("/cgi-bin/message/template/subscribe", data);
    };
    ServiceClient.prototype.formatMessage = function (msg) {
        var data = Object.assign({
            touser: "",
            template_id: "",
            url: "",
            data: {}
        }, msg);
        for (var key in data) {
            if (this.requiredMsgFields.includes(key) && !data[key]) {
                throw new Error("Field " + key + " can not be empty");
            }
        }
        data["data"] = this.formatData(data["data"]);
        return data;
    };
    ServiceClient.prototype.formatData = function (data) {
        var formatted = {};
        Object.keys(data).forEach(function (key) {
            var value = data[key];
            if (Array.isArray(value) && value.length >= 1) {
                formatted[key] =
                    value.length > 1
                        ? {
                            value: value[0],
                            color: value[1]
                        }
                        : { value: value[0] };
            }
            else if (value["value"]) {
                formatted[key] = value;
            }
            else {
                formatted[key] = {
                    value: value ? value.toString() : ""
                };
            }
        });
        return formatted;
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
