"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
/**
 * 菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型
 */
var MenuButtonType;
(function (MenuButtonType) {
    MenuButtonType["CLICK"] = "click";
    MenuButtonType["VIEW"] = "view";
    MenuButtonType["SCANCODE_PUSH"] = "scancode_push";
    MenuButtonType["SCANCODE_WAITMSG"] = "scancode_waitmsg";
    MenuButtonType["PIC_SYSPHOTO"] = "pic_sysphoto";
    MenuButtonType["PIC_PHOTO_OR_ALBUM"] = "pic_photo_or_album";
    MenuButtonType["PIC_WEIXIN"] = "pic_weixin";
    MenuButtonType["LOCATION_SELECT"] = "location_select";
    MenuButtonType["MEDIA_ID"] = "media_id";
    MenuButtonType["VIEW_LIMITED"] = "view_limited";
    MenuButtonType["MINIPROGRAM"] = "miniprogram";
})(MenuButtonType = exports.MenuButtonType || (exports.MenuButtonType = {}));
