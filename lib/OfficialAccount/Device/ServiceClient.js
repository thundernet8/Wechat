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
var Text_1 = require("../../Core/Utils/Text");
/**
 * Implement methods of Device service
 * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 第三方发送消息给设备主人的微信终端，并最终送达设备
     * @param deviceId
     * @param openId
     * @param content
     */
    ServiceClient.prototype.message = function (deviceId, openId, content) {
        var data = {
            device_type: this.app.getConfig("deviceType"),
            device_id: deviceId,
            open_id: openId,
            content: Text_1.base64Encode(content)
        };
        return this.httpPost("/device/transmsg", data);
    };
    /**
     * 第三方主动发送设备状态消息给微信终端
     * @param deviceId
     * @param openId
     * @param type
     * @param status
     */
    ServiceClient.prototype.statMessage = function (deviceId, openId, type, status) {
        var data = {
            device_type: this.app.getConfig("deviceType"),
            device_id: deviceId,
            open_id: openId,
            msg_type: type,
            device_status: status
        };
        return this.httpPost("/device/transmsg", data);
    };
    /**
     * 获取设备绑定openID
     * @param deviceId
     */
    ServiceClient.prototype.openId = function (deviceId) {
        var data = {
            device_type: this.app.getConfig("deviceType"),
            device_id: deviceId
        };
        return this.httpGet("/device/get_openid", data);
    };
    /**
     * 获取设备二维码
     * @param deviceIds
     */
    ServiceClient.prototype.qrCode = function (deviceIds) {
        var data = {
            device_num: deviceIds.length,
            device_id: deviceIds
        };
        return this.httpPost("/device/create_qrcode", data);
    };
    /**
     * 验证二维码
     * @param ticket
     */
    ServiceClient.prototype.verifyQrCode = function (ticket) {
        var data = {
            ticket: ticket
        };
        return this.httpPost("/device/verify_qrcode", data);
    };
    /**
     * 获取 deviceid 和二维码
     * @param productId
     */
    ServiceClient.prototype.createId = function (productId) {
        var params = {
            product_id: productId
        };
        return this.httpGet("/device/getqrcode", params);
    };
    /**
     * 设备授权
     * @param devices
     * @param productId
     * @param opType
     */
    ServiceClient.prototype.authorize = function (devices, productId, opType) {
        var data = {
            device_num: devices.length,
            device_list: devices,
            op_type: opType,
            product_id: productId
        };
        return this.httpPost("/device/authorize_device", data);
    };
    /**
     * 利用 deviceid 更新设备属性
     * @param devices
     */
    ServiceClient.prototype.update = function (devices) {
        var data = {
            device_num: devices.length,
            device_list: devices,
            op_type: 1
        };
        return this.httpPost("/device/authorize_device", data);
    };
    /**
     * 设备状态查询
     * @param deviceId
     */
    ServiceClient.prototype.stats = function (deviceId) {
        var params = {
            device_id: deviceId
        };
        return this.httpGet("/device/get_stat", params);
    };
    /**
     * 设备绑定成功通知
     * @param openId
     * @param deviceId
     * @param ticket
     */
    ServiceClient.prototype.bind = function (openId, deviceId, ticket) {
        var data = {
            ticket: ticket,
            device_id: deviceId,
            openid: openId
        };
        return this.httpPost("/device/bind", data);
    };
    /**
     * 设备解绑成功通知
     * @param openId
     * @param deviceId
     * @param ticket
     */
    ServiceClient.prototype.unbind = function (openId, deviceId, ticket) {
        var data = {
            ticket: ticket,
            device_id: deviceId,
            openid: openId
        };
        return this.httpPost("/device/unbind", data);
    };
    /**
     * 强制绑定用户和设备
     * @param openId
     * @param deviceId
     */
    ServiceClient.prototype.forceBind = function (openId, deviceId) {
        var data = {
            device_id: deviceId,
            openid: openId
        };
        return this.httpPost("/device/compel_bind", data);
    };
    /**
     * 强制解绑用户和设备
     * @param openId
     * @param deviceId
     */
    ServiceClient.prototype.forceUnbind = function (openId, deviceId) {
        var data = {
            device_id: deviceId,
            openid: openId
        };
        return this.httpPost("/device/compel_unbind", data);
    };
    /**
     * 通过openid获取用户绑定的设备
     * @param openId
     */
    ServiceClient.prototype.getBindDevice = function (openId) {
        var params = {
            openid: openId
        };
        return this.httpGet("/device/get_bind_device", params);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
