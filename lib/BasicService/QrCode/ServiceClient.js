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
 * Implement methods of QrCode service
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SCENE_MAX_VALUE = 100000;
        _this.SCENE_QR_CARD = "QR_CARD";
        _this.SCENE_QR_TEMPORARY = "QR_SCENE";
        _this.SCENE_QR_TEMPORARY_STR = "QR_STR_SCENE";
        _this.SCENE_QR_FOREVER = "QR_LIMIT_SCENE";
        _this.SCENE_QR_FOREVER_STR = "QR_LIMIT_STR_SCENE";
        return _this;
    }
    /**
     * 创建永久二维码
     * @param sceneValue 场景值
     */
    ServiceClient.prototype.forever = function (sceneValue) {
        var actionName;
        var scene;
        if (typeof sceneValue === "number" && sceneValue > 0 && sceneValue < this.SCENE_MAX_VALUE) {
            actionName = this.SCENE_QR_FOREVER;
            scene = {
                scene_id: sceneValue
            };
        }
        else {
            actionName = this.SCENE_QR_FOREVER_STR;
            scene = {
                scene_str: sceneValue
            };
        }
        return this.create(actionName, scene, false);
    };
    /**
     * 创建临时二维码
     * @param sceneValue 场景值
     * @param expireSeconds 二维码有效时间
     */
    ServiceClient.prototype.temporary = function (sceneValue, expireSeconds) {
        var actionName;
        var scene;
        if (typeof sceneValue === "number" && sceneValue > 0 && sceneValue < this.SCENE_MAX_VALUE) {
            actionName = this.SCENE_QR_TEMPORARY;
            scene = {
                scene_id: sceneValue
            };
        }
        else {
            actionName = this.SCENE_QR_TEMPORARY_STR;
            scene = {
                scene_str: sceneValue
            };
        }
        return this.create(actionName, scene, true, expireSeconds);
    };
    /**
     * 通过ticket换取二维码
     * @param ticket 二维码ticket
     */
    ServiceClient.prototype.url = function (ticket) {
        return "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + encodeURIComponent(ticket);
    };
    /**
     * 创建二维码
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1443433542
     * @param actionName 二维码类型，QR_SCENE为临时的整型参数值，QR_STR_SCENE为临时的字符串参数值，QR_LIMIT_SCENE为永久的整型参数值，QR_LIMIT_STR_SCENE为永久的字符串参数值
     * @param actionInfo 二维码详细信息
     * @param isTemporary
     * @param expireSeconds
     */
    ServiceClient.prototype.create = function (actionName, actionInfo, isTemporary, expireSeconds) {
        if (isTemporary === void 0) { isTemporary = true; }
        expireSeconds = expireSeconds || 7 * 3600 * 24;
        var data = {
            action_name: actionName,
            action_info: actionInfo
        };
        if (isTemporary) {
            data["expire_seconds"] = Math.min(expireSeconds, 30 * 3600 * 24);
        }
        return this.httpPost("/cgi-bin/qrcode/create", data);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
