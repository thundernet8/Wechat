"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 卡券码型
var CardCodeType;
(function (CardCodeType) {
    // 文本
    CardCodeType["CODE_TYPE_TEXT"] = "CODE_TYPE_TEXT";
    // 一维码
    CardCodeType["CODE_TYPE_BARCODE"] = "CODE_TYPE_BARCODE";
    // 二维码
    CardCodeType["CODE_TYPE_QRCODE"] = "CODE_TYPE_QRCODE";
    // 二维码无code显示
    CardCodeType["CODE_TYPE_ONLY_QRCODE"] = "CODE_TYPE_ONLY_QRCODE";
    // 一维码无code显示
    CardCodeType["CODE_TYPE_ONLY_BARCODE"] = "CODE_TYPE_ONLY_BARCODE";
    // 不显示code和条形码类型
    CardCodeType["CODE_TYPE_NONE"] = "CODE_TYPE_NONE";
})(CardCodeType || (CardCodeType = {}));
exports.default = CardCodeType;
