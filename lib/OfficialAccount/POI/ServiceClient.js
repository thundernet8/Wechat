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
 * Implement methods of POI service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444378120
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 查询门店信息
     * @param id
     */
    ServiceClient.prototype.getPOI = function (id) {
        var data = {
            poi_id: id.toString()
        };
        return this.httpPost("/cgi-bin/poi/getpoi", data);
    };
    /**
     * 查询门店列表
     * @param offset
     * @param limit
     */
    ServiceClient.prototype.list = function (offset, limit) {
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 10; }
        var data = {
            begin: offset,
            limit: limit
        };
        return this.httpPost("/cgi-bin/poi/getpoilist", data);
    };
    /**
     * 创建门店
     * @param poi
     */
    ServiceClient.prototype.create = function (poi) {
        var data = {
            business: poi
        };
        return this.httpPost("/cgi-bin/poi/addpoi", data);
    };
    /**
     * 修改门店服务信息
     * @param id
     * @param poi
     */
    ServiceClient.prototype.update = function (id, poi) {
        poi["base_info"]["poi_id"] = id.toString();
        var data = {
            business: poi
        };
        return this.httpPost("/cgi-bin/poi/updatepoi", data);
    };
    /**
     * 删除门店
     * @param poi
     */
    ServiceClient.prototype.delete = function (id) {
        var data = {
            poi_id: id.toString()
        };
        return this.httpPost("/cgi-bin/poi/delpoi", data);
    };
    /**
     * 获取门店类目表
     */
    ServiceClient.prototype.categories = function () {
        return this.httpGet("/cgi-bin/poi/getwxcategory");
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
