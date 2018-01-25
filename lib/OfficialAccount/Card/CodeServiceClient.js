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
 * Implement methods of Card Code service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 导入自定义code
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param cardId 需要进行导入code的卡券ID
     * @param codes 需导入微信卡券后台的自定义code，上限为100个
     */
    ServiceClient.prototype.deposit = function (cardId, codes) {
        var data = {
            card_id: cardId,
            code: codes
        };
        return this.httpPost("/card/code/deposit", data);
    };
    /**
     * 查询导入code数目
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param cardId 进行导入code的卡券ID
     */
    ServiceClient.prototype.getDepositedCount = function (cardId) {
        var data = {
            card_id: cardId
        };
        return this.httpPost("/card/code/getdepositcount", data);
    };
    /**
     * 核查code
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param cardId 进行导入code的卡券ID
     * @param codes 已经微信卡券后台的自定义code，上限为100个
     */
    ServiceClient.prototype.check = function (cardId, codes) {
        var data = {
            card_id: cardId,
            code: codes
        };
        return this.httpPost("/card/code/checkcode", data);
    };
    /**
     * 查询Code接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239
     * @param code 单张卡券的唯一标准
     * @param cardId 卡券ID代表一类卡券。自定义code卡券必填
     * @param checkConsume 是否校验code核销状态，填入true和false时的code异常状态返回数据不同
     */
    ServiceClient.prototype.stats = function (code, cardId, checkConsume) {
        if (cardId === void 0) { cardId = ""; }
        if (checkConsume === void 0) { checkConsume = true; }
        var data = {
            code: code,
            check_consume: checkConsume,
            card_id: cardId
        };
        return this.httpPost("/card/code/get", data);
    };
    /**
     * 更改Code接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param code 需变更的Code码
     * @param newCode 变更后的有效Code码
     * @param cardId 卡券ID。自定义Code码卡券为必填
     */
    ServiceClient.prototype.update = function (code, newCode, cardId) {
        if (cardId === void 0) { cardId = ""; }
        var data = {
            code: code,
            new_code: newCode,
            card_id: cardId
        };
        return this.httpPost("/card/code/update", data);
    };
    /**
     * 设置卡券失效
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param code 设置失效的Code码
     * @param cardId 卡券ID
     */
    ServiceClient.prototype.disable = function (code, cardId, reason) {
        if (cardId === void 0) { cardId = ""; }
        if (reason === void 0) { reason = ""; }
        var data = {
            code: code,
            card_id: cardId,
            reason: reason
        };
        return this.httpPost("/card/code/unavailable", data);
    };
    /**
     * 核销Code
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239
     * @param code 需核销的Code码
     * @param cardId 卡券ID。创建卡券时use_custom_code填写true时必填。非自定义Code不必填写
     */
    ServiceClient.prototype.consume = function (code, cardId) {
        var data = {
            code: code
        };
        if (cardId !== undefined) {
            data["card_id"] = cardId;
        }
        return this.httpPost("/card/code/consume", data);
    };
    /**
     * Code解码
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239
     * @param encryptedCode 经过加密的Code码
     */
    ServiceClient.prototype.decrypt = function (encryptedCode) {
        var data = {
            encrypt_code: encryptedCode
        };
        return this.httpPost("/card/code/decrypt", data);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
