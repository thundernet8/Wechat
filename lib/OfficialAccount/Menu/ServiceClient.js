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
 * Implement methods of Menu management service
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 查询自定义菜单的结构(包含默认菜单和个性化菜单)
     */
    ServiceClient.prototype.list = function () {
        return this.httpGet("/cgi-bin/menu/get");
    };
    /**
     * 获取当前自定义菜单配置
     */
    ServiceClient.prototype.current = function () {
        return this.httpGet("/cgi-bin/get_current_selfmenu_info");
    };
    /**
     * 创建自定义菜单
     * @param buttons 菜单列表
     */
    ServiceClient.prototype.create = function (buttons) {
        return this.httpPost("/cgi-bin/menu/create", { button: buttons });
    };
    /**
     * 删除自定义菜单(会同时删除个性化菜单)
     */
    ServiceClient.prototype.delete = function () {
        return this.httpGet("/cgi-bin/menu/delete");
    };
    /**
     * 创建个性化菜单
     * @param menu 个性化菜单
     * @returns menuid
     */
    ServiceClient.prototype.createConditional = function (menu) {
        return this.httpPost("/cgi-bin/menu/addconditional", menu).then(function (resp) { return resp.menuid; });
    };
    /**
     * 删除个性化菜单
     * @param menuId 菜单ID
     */
    ServiceClient.prototype.deleteConditional = function (menuId) {
        return this.httpPost("/cgi-bin/menu/delconditional", { menuid: menuId });
    };
    /**
     * 测试个性化菜单匹配结果
     * @param userId 用户ID, 可以是粉丝的OpenID，也可以是粉丝的微信号
     */
    ServiceClient.prototype.tryMatch = function (userId) {
        return this.httpPost("/cgi-bin/menu/trymatch", { user_id: userId });
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
