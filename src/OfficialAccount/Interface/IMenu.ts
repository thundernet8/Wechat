export default interface IMenu {
    menu: IGeneralMenu;
    conditionalmenu?: IConditionalMenu;
};

export interface IGeneralMenu {
    button: IMenuButton[];
    menuid?: number;
}

export interface IConditionalMenu {
    button: IMenuButton[];
    matchrule: IMenuRule;
    menuid?: number;
}

export interface IMenuButton {
    type: MenuButtonType;
    name: string;
    // click等点击类型必须, 菜单KEY值，用于消息接口推送，不超过128字节
    key?: string;
    sub_button?: IMenuButton[];
    // view、miniprogram类型必须, 网页 链接，用户点击菜单可打开链接，不超过1024字节。 type为miniprogram时，不支持小程序的老版本客户端将打开本url
    url?: string;
    // media_id类型和view_limited类型必须, 调用新增永久素材接口返回的合法media_id
    media_id?: string;
    // miniprogram类型必须, 小程序的appid（仅认证公众号可配置）
    appid?: string;
    // miniprogram类型必须, 小程序的页面路径
    pagepath?: string;
}

/**
 * 菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型
 */
export enum MenuButtonType {
    CLICK = "click",
    VIEW = "view",
    SCANCODE_PUSH = "scancode_push",
    SCANCODE_WAITMSG = "scancode_waitmsg",
    PIC_SYSPHOTO = "pic_sysphoto",
    PIC_PHOTO_OR_ALBUM = "pic_photo_or_album",
    PIC_WEIXIN = "pic_weixin",
    LOCATION_SELECT = "location_select",
    MEDIA_ID = "media_id",
    VIEW_LIMITED = "view_limited",
    MINIPROGRAM = "miniprogram"
}

/**
 * 个性化菜单的展示匹配规则
 */
export interface IMenuRule {
    group_id: number;
    sex: number;
    country: string;
    province: string;
    city: string;
    client_platform_type: number;
}
