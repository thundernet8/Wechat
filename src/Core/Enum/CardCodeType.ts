// 卡券码型
enum CardCodeType {
    // 文本
    CODE_TYPE_TEXT = "CODE_TYPE_TEXT",
    // 一维码
    CODE_TYPE_BARCODE = "CODE_TYPE_BARCODE",
    // 二维码
    CODE_TYPE_QRCODE = "CODE_TYPE_QRCODE",
    // 二维码无code显示
    CODE_TYPE_ONLY_QRCODE = "CODE_TYPE_ONLY_QRCODE",
    // 一维码无code显示
    CODE_TYPE_ONLY_BARCODE = "CODE_TYPE_ONLY_BARCODE",
    // 不显示code和条形码类型
    CODE_TYPE_NONE = "CODE_TYPE_NONE"
}

export default CardCodeType;
