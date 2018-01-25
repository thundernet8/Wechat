import { Stream } from "stream";

export as namespace WechatOne;

export = WechatOne;

declare namespace WechatOne {
    /**
     * 微信公众平台SDK
     */
    var OfficialAccount: internal.ServiceContainer;
    /**
     * 微信开放平台SDK
     */
    var OpenPlatform: internal.ServiceContainer;
    /**
     * 微信支付SDK
     */
    var Payment: internal.ServiceContainer;
    var Core: {
        TextReply: reply.TextReply;
        ImageReply: reply.ImageReply;
        VoiceReply: reply.VoiceReply;
        VideoReply: reply.VideoReply;
        MusicReply: reply.MusicReply;
        NewsReply: reply.NewsReply;
        TextBroadcastMessage: broadcast.TextBroadcastMessage;
        ImageBroadcastMessage: broadcast.ImageBroadcastMessage;
        VoiceBroadcastMessage: broadcast.VoiceBroadcastMessage;
        VideoBroadcastMessage: broadcast.VideoBroadcastMessage;
        CardBroadcastMessage: broadcast.CardBroadcastMessage;
        NewsBroadcastMessage: broadcast.NewsBroadcastMessage;
        MessageType: enums.MessageType;
        MediaType: enums.MediaType;
        EventType: enums.EventType;
        CardType: enums.CardType;
        CardCodeType: enums.CardCodeType;
        BroadcastMessageType: enums.BroadcastMessageType;
    };

    namespace OfficialAccountService {
        interface BaseService extends service.BaseService {}

        interface MediaService extends service.MediaService {}

        interface QrCodeService extends service.QrCodeService {}

        interface UrlService extends service.UrlService {}

        interface AutoReplyService extends service.AutoReplyService {}

        interface BroadcastService extends service.BroadcastService {}

        interface CardService extends service.CardService {}

        interface CodeCardService extends service.CodeCardService {}

        interface CoinCardService extends service.CoinCardService {}

        interface GeneralCardService extends service.GeneralCardService {}

        interface MeetingCardService extends service.MeetingCardService {}

        interface MemberCardService extends service.MemberCardService {}

        interface MovieCardService extends service.MovieCardService {}

        interface SubMerchantCardService extends service.SubMerchantCardService {}

        interface CommentService extends service.CommentService {}

        interface KFService extends service.KFService {}

        interface KFSessionService extends service.KFSessionService {}

        interface DataCubeService extends service.DataCubeService {}

        interface DeviceService extends service.DeviceService {}

        interface MaterialService extends service.MaterialService {}

        interface MenuService extends service.MenuService {}

        interface POIService extends service.POIService {}

        interface SemanticService extends service.SemanticService {}

        interface ServerService extends service.ServerService {}

        interface ShakeAroundService extends service.ShakeAroundService {}

        interface TemplateMessageService extends service.TemplateMessageService {}

        interface UserService extends service.UserService {}
    }
}

declare namespace internal {
    export interface IAppConfig {
        appid: string;
        secret: string;
        token: string;
        aesKey?: string;
        server?: "express" | "koa";
        deviceType?: string; // IoT required, 设备类型，目前为“公众账号原始 ID”
        log?: {
            level: "error" | "debug" | "info";
            file: string;
        };
        cacher?: {
            getter: (key: string) => string;
            setter: (key: string, data: string) => void;
        };
    }

    export interface ICredentials {
        appid: string;
        secret: string;
        grant_type: string;
    }

    export interface AccessToken {
        new (container: ServiceContainer): AccessToken;

        setToken(token: string, expires: number): void;

        getToken(fresh: boolean): Promise<string>;

        getFreshToken(): Promise<string>;

        getEndpoint(): string;

        getCredentials(): ICredentials;
    }

    export interface ServiceClient {
        new (app: ServiceContainer, accessToken: AccessToken): ServiceClient;
    }

    export interface ServiceContainer {
        new (config: IAppConfig): ServiceContainer;

        appid: string;

        secret: string;

        token: string;

        server: string;

        cacher:
            | ({
                  getter: (key: string) => string;
                  setter: (key: string, data: string) => void;
              })
            | undefined;

        /**
         * 获取SDK实例化时的配置项值
         */
        getConfig(key: string): string | number | null;

        /**
         * 获取一个服务实例
         */
        getService(name: string): any;

        /**
         * 获取一个服务实例
         */
        getService<T>(name: string): T;
    }
}

declare namespace enums {
    export enum MessageType {
        TEXT = "text",
        IMAGE = "image",
        VOICE = "voice",
        VIDEO = "video",
        MUSIC = "music", // 仅开发者回复
        NEWS = "news", // 仅开发者回复
        SHORT_VIDEO = "shortvideo",
        LOCATION = "location",
        LINK = "link",
        DEVICE_EVENT = "deviceevent",
        DEVICE_TEXT = "devicetext",
        FILE = "file",
        TEXT_CARD = "textcard",
        TRANSFER = "transfer",
        EVENT = "event",
        UNKNOWN = "unknown"
    }

    export enum MediaType {
        IMAGE = "image",
        VOICE = "voice",
        VIDEO = "video",
        THUMB = "thumb",
        NEWS_IMAGE = "news_image"
    }

    export enum EventType {
        SUBSCRIBE = "subscribe",
        UNSUBSCRIBE = "unsubscribe",
        SCAN = "SCAN",
        LOCATION = "LOCATION",
        CLICK = "CLICK",
        VIEW = "VIEW",
        UNKNOWN = "unknown"
    }

    export enum BroadcastMessageType {
        MP_NEWS = "mpnews",
        TEXT = "text",
        VOICE = "voice",
        IMAGE = "image",
        MP_VIDEO = "mpvideo",
        WX_CARD = "wxcard"
    }

    export enum CardType {
        // 团购券
        GROUPON = "groupon",
        // 折扣券
        DISCOUNT = "discount",
        // 礼品券
        GIFT = "gift",
        // 代金券
        CASH = "cash",
        // 通用券
        GENERAL_COUPON = "general_coupon",
        // 会员卡
        MEMBER_CARD = "member_card",
        // 景点门票
        SCENIC_TICKET = "scenic_ticket",
        // 电影票
        MOVIE_TICKET = "movie_ticket",
        // 飞机票
        BOARDING_PASS = "boarding_pass",
        // 会议门票
        MEETING_TICKET = "meeting_ticket",
        // 汽车票
        BUS_TICKET = "bus_ticket"
    }

    // 卡券码型
    export enum CardCodeType {
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
}

declare namespace message {
    export interface Message {
        new (type: enums.MessageType): Message;

        id: number;

        type: enums.MessageType;

        to: string;

        from: string;

        createTime: number;

        toJSON(): string;

        toXML(): string;

        content?: string;

        title?: string;

        description?: string;

        url?: string;

        picUrl?: string;

        mediaId?: string;

        event?: enums.EventType;

        locationX?: string;

        locationY?: string;

        scale?: number;

        label?: string;

        musicUrl?: string;

        hqMusicUrl?: string;

        thumbMediaId?: string;

        articles?: NewsMessage[];

        format?: string;

        recognition?: string;
    }

    export interface TextMessage extends Message {
        new (content: string): TextMessage;

        content: string;
    }

    export interface ImageMessage extends Message {
        new (picUrl: string, mediaId: string): ImageMessage;

        picUrl: string;

        mediaId: string;
    }

    export interface LinkMessage extends Message {
        new (title: string, description: string, url: string): LinkMessage;

        title: string;

        description: string;

        url: string;
    }

    export interface EventMessage extends Message {
        new (event: enums.EventType): EventMessage;

        event: enums.EventType;
    }

    export interface LocationMessage extends Message {
        new (locationX: string, locationY: string, scale: number, label: string): LocationMessage;

        /**
         * 地理位置维度
         */
        locationX: string;

        /**
         * 地理位置经度
         */
        locationY: string;

        /**
         * 地图缩放大小
         */
        scale: number;

        /**
         * 地理位置信息
         */
        label: string;
    }

    export interface MusicMessage extends Message {
        new (
            title: string,
            description: string,
            musicUrl: string,
            hqMusicUrl: string,
            thumbMediaId: string
        ): MusicMessage;

        title: string;

        description: string;

        musicUrl: string;

        hqMusicUrl: string;

        thumbMediaId: string;
    }

    export interface NewsMessage extends Message {
        new (
            title: string,
            description: string,
            picUrl: string,
            url: string,
            articles?: NewsMessage[]
        ): NewsMessage;

        title: string;

        description: string;

        picUrl: string;

        url: string;

        articles: NewsMessage[];
    }

    /**
     * 小视频消息
     */
    export interface ShortVideoMessage extends Message {
        new (thumbMediaId: string, mediaId: string): ShortVideoMessage;

        /**
         * 视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据
         */
        thumbMediaId: string;

        /**
         * 视频消息媒体id，可以调用多媒体文件下载接口拉取数据
         */
        mediaId: string;
    }

    export interface VideoMessage extends Message {
        new (
            thumbMediaId: string,
            mediaId: string,
            title?: string,
            description?: string
        ): VideoMessage;

        title: string;

        description: string;

        /**
         * 视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据
         */
        thumbMediaId: string;

        /**
         * 视频消息媒体id，可以调用多媒体文件下载接口拉取数据
         */
        mediaId: string;
    }

    export interface VoiceMessage extends Message {
        new (format: string, mediaId: string, recognition?: string): VoiceMessage;

        /**
         * 语音格式，如amr，speex等
         */
        format: string;

        /**
         * 语音消息媒体id，可以调用多媒体文件下载接口拉取数据
         */
        mediaId: string;

        /**
         * Recognition field of xml(语音识别结果)
         */
        recognition: string;
    }
}

declare namespace reply {
    export interface TextReply extends message.TextMessage {
        new (content: string): TextReply;
    }

    export interface ImageReply extends message.ImageMessage {
        new (mediaId: string): ImageReply;
    }

    export interface MusicReply extends message.MusicMessage {
        new (
            title: string,
            description: string,
            musicUrl: string,
            hqMusicUrl: string,
            thumbMediaId: string
        ): MusicReply;
    }

    export interface NewsReply extends message.NewsMessage {
        new (
            title: string,
            description: string,
            picUrl: string,
            url: string,
            articles?: NewsReply[]
        ): NewsReply;

        articles: NewsReply[];
    }

    export interface VideoReply extends message.VideoMessage {
        new (mediaId: string, title: string, description: string): VideoReply;
    }

    export interface VoiceReply extends message.VoiceMessage {
        new (mediaId: string);
    }
}

declare namespace broadcast {
    export interface BroadcastMessage {
        new (type: enums.BroadcastMessageType): BroadcastMessage;

        type: enums.BroadcastMessageType;

        toPOJO(): { [key: string]: any };
    }

    export interface TextBroadcastMessage extends BroadcastMessage {
        new (content: string): TextBroadcastMessage;
    }

    export interface ImageBroadcastMessage extends BroadcastMessage {
        new (mediaId: string): ImageBroadcastMessage;
    }

    export interface VoiceBroadcastMessage extends BroadcastMessage {
        new (mediaId: string): VoiceBroadcastMessage;
    }

    export interface VideoBroadcastMessage extends BroadcastMessage {
        new (mediaId: string): VideoBroadcastMessage;
    }

    export interface CardBroadcastMessage extends BroadcastMessage {
        new (cardId: string): CardBroadcastMessage;
    }

    export interface NewsBroadcastMessage extends BroadcastMessage {
        new (mediaId: string, ignoreReprint?: boolean): NewsBroadcastMessage;
    }
}

declare namespace service {
    /**
     * "base" service
     */
    export interface BaseService {
        /**
         * 获取微信服务器IP地址
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140187
         */
        getValidIps: Promise<string[]>;

        /**
         * 公众号调用或第三方平台帮公众号调用对公众号的所有api调用（包括第三方帮其调用）次数进行清零
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433744592
         */
        clearQuota(): Promise<string>;
    }

    /**
     * "media" service
     */
    export interface MediaService {
        /**
         * 上传图片临时素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726
         */
        uploadImage(filePath: string): Promise<string>;

        /**
         * 上传语音临时素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726
         */
        uploadVoice(filePath: string): Promise<string>;

        /**
         * 上传视频临时素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726
         */
        uploadVideo(filePath: string, title: string, description?: string): Promise<string>;

        /**
         * 上传缩略图临时素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726
         */
        uploadThumb(filePath: string): Promise<string>;

        /**
         * 获取临时素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738727
         */
        getMediaStream(mediaId: string): Promise<Stream>;
    }

    /**
     * "qrcode" service
     */
    export interface QrCodeService {
        /**
         * 创建永久二维码
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1443433542
         */
        forever(sceneValue: string | number): resp.ICreateQrCodeResp;

        /**
         * 创建临时二维码
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1443433542
         */
        temporary(sceneValue: string | number, expireSeconds?: number): resp.ICreateQrCodeResp;

        /**
         * 通过ticket换取二维码
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1443433542
         */
        url(ticket: string): string;
    }

    /**
     * "url" service
     */
    export interface UrlService {
        /**
         * 长链接转短链接
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1443433600
         */
        shorten(url: string): Promise<string>;
    }

    /**
     * "autoreply" service
     */
    export interface AutoReplyService {
        /**
         * 获取公众号的自动回复规则
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751299
         */
        current(): any;
    }

    /**
     * "broadcast" service
     */
    export interface BroadcastService {
        /**
         * 根据OpenID列表群发【订阅号不可用，服务号认证后可用】
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481187827_i0l21
         * @param message
         * @param to user openId list
         */
        sendToList(
            message: broadcast.BroadcastMessage,
            to: { towxname?: string[]; touser?: string[] }
        ): Promise<resp.ISendBroadcastMessageResp>;

        /**
         * 根据标签进行群发【订阅号与服务号认证后均可用】
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481187827_i0l21
         * @param message
         */
        send(
            message: broadcast.BroadcastMessage,
            tagId?: number,
            toAll?: boolean
        ): Promise<resp.ISendBroadcastMessageResp>;

        /**
         * 群发消息预览【订阅号与服务号认证后均可用】
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481187827_i0l21
         * @param message
         */
        preview(
            message: broadcast.BroadcastMessage,
            to?: { towxname?: string[]; touser?: string[] },
            filter?: { [key: string]: boolean | number }
        ): Promise<resp.IPreviewBroadcastMessageResp>;

        /**
         * 删除群发消息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481187827_i0l21
         * @param msgId
         */
        delete(msgId: string, articleIndex?: number): Promise<resp.IWXCommonResp>;

        /**
         * 获取群发消息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481187827_i0l21
         * @param msgId
         */
        stats(msgId: string): Promise<resp.IGetBroadMessageResp>;

        sendText(
            content: string,
            reception?: number | string[]
        ): Promise<resp.ISendBroadcastMessageResp>;

        sendVoice(
            mediaId: string,
            reception?: number | string[]
        ): Promise<resp.ISendBroadcastMessageResp>;

        sendImage(
            mediaId: string,
            reception?: number | string[]
        ): Promise<resp.ISendBroadcastMessageResp>;

        sendVideo(
            mediaId: string,
            reception?: number | string[]
        ): Promise<resp.ISendBroadcastMessageResp>;

        sendCard(
            cardId: string,
            reception?: number | string[]
        ): Promise<resp.ISendBroadcastMessageResp>;

        sendNews(
            mediaId: string,
            reception?: number | string[]
        ): Promise<resp.ISendBroadcastMessageResp>;
    }

    /**
     * "card" service
     */
    export interface CardService {
        /**
         * 获取卡券颜色列表
         */
        colors(): Promise<resp.IGetCardColorsResp>;

        /**
         * 卡券开放类目查询接口
         */
        categories(): Promise<resp.IGetCardCategoriesResp>;

        /**
         * 创建卡券
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025056
         * @param cardType
         * @param attributes
         */
        create(cardType: string | enums.CardType, attributes: { [key: string]: any }): Promise<any>;

        /**
         * 查看卡券详情
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         * @param cardId
         */
        stats(cardId: string): Promise<resp.IGetCardDetailResp>;

        /**
         * 批量查询卡券列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         * @param offset
         * @param count
         * @param statusList "CARD_STATUS_VERIFY_OK|CARD_STATUS_NOT_VERIFY|CARD_STATUS_VERIFY_FAIL|CARD_STATUS_DELETE|CARD_STATUS_DISPATCH"
         */
        list(
            offset?: number,
            count?: number,
            statusList?: string[]
        ): Promise<resp.IGetCardListResp>;

        /**
         * 更改卡券信息接口
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         * @param cardId
         * @param type WechatOne.Core.CardType
         * @param attributes
         */
        update(
            cardId: string,
            type: string,
            attributes: { [key: string]: any }
        ): Promise<resp.IUpdateCardResp>;

        /**
         * 删除卡券接口
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         * @param cardId
         */
        delete(cardId: string): Promise<string>;

        /**
         * 创建二维码
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
         * @param cards
         */
        createQrCode(
            cards: resp.IQrScanCardInfo | resp.IQrScanCardInfo[]
        ): Promise<resp.IGetCardQrCodeResp>;

        /**
         * 通过ticket换取二维码链接
         * @param ticket
         */
        getQrCodeUrl(ticket: string): string;

        /**
         * 创建货架接口
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
         * @param banner 页面的banner图片链接，须调用，建议尺寸为640*300
         * @param pageTitle 页面的title
         * @param canShare 页面是否可以分享
         * @param scene 投放页面的场景值； SCENE_NEAR_BY 附近 SCENE_MENU 自定义菜单 SCENE_QRCODE 二维码 SCENE_ARTICLE 公众号文章 SCENE_H5 h5页面 SCENE_IVR 自动回复 SCENE_CARD_CUSTOM_CELL 卡券自定义cell
         * @param cardList 卡券列表，每个item有两个字段: 1.card_id-所要在页面投放的card_id 2.thumb_url-缩略图url
         */
        createLandingPage(
            banner: string,
            pageTitle: string,
            canShare: boolean,
            scene: string,
            cardList: { card_id: string; thumb_url: string }[]
        ): Promise<resp.ICreateLandingPageResp>;

        /**
         * 图文消息群发卡券
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
         * @param cardId
         */
        getHtml(cardId: string): Promise<resp.IGetNewsBroadcastCardHtmlResp>;

        /**
         * 设置测试白名单
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
         * @param openIds 用户的OpenId或用户名列表
         * @param isUsername 是否提交的用户名
         */
        setTestWhitelist(openIds: string[], isUsername?: boolean): Promise<string>;

        /**
         * 获取用户已领取卡券
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         * @param openId 需要查询的用户openid
         * @param cardId 卡券ID。不填写时默认查询当前appid下的卡券
         */
        getUserCards(openId: string, cardId?: string): Promise<resp.IGetUserCardListResp>;

        /**
         * 设置买单接口
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025056
         * @param cardId
         * @param isOpen
         */
        setPayCell(cardId: string, isOpen?: boolean): Promise<string>;

        /**
         * 增加卡券库存
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         * @param cardId
         * @param amount
         */
        increaseStock(cardId: string, amount: number): Promise<string>;

        /**
         * 减少卡券库存
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         * @param cardId
         * @param amount
         */
        reduceStock(cardId: string, amount: number): Promise<string>;
    }

    /**
     * "card.code" service
     */
    export interface CodeCardService {
        /**
         * 导入自定义code
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
         * @param cardId 需要进行导入code的卡券ID
         * @param codes 需导入微信卡券后台的自定义code，上限为100个
         */
        deposit(cardId: string, codes: string[]): Promise<string>;

        /**
         * 查询导入code数目
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
         * @param cardId 进行导入code的卡券ID
         */
        getDepositedCount(cardId: string): Promise<resp.IGetDepositCount>;

        /**
         * 核查code
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
         * @param cardId 进行导入code的卡券ID
         * @param codes 已经微信卡券后台的自定义code，上限为100个
         */
        check(cardId: string, codes: string[]): Promise<resp.ICheckCodeResp>;

        /**
         * 查询Code接口
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239
         * @param code 单张卡券的唯一标准
         * @param cardId 卡券ID代表一类卡券。自定义code卡券必填
         * @param checkConsume 是否校验code核销状态，填入true和false时的code异常状态返回数据不同
         */
        stats(
            code: string,
            cardId?: string,
            checkConsume?: boolean
        ): Promise<resp.IGetCardCodeResp>;

        /**
         * 更改Code接口
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         * @param code 需变更的Code码
         * @param newCode 变更后的有效Code码
         * @param cardId 卡券ID。自定义Code码卡券为必填
         */
        update(code: string, newCode: string, cardId?: string): Promise<string>;

        /**
         * 设置卡券失效
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         * @param code 设置失效的Code码
         * @param cardId 卡券ID
         */
        disable(code: string, cardId?: string, reason?: string): Promise<string>;

        /**
         * 核销Code
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239
         * @param code 需核销的Code码
         * @param cardId 卡券ID。创建卡券时use_custom_code填写true时必填。非自定义Code不必填写
         */
        consume(code: string, cardId?: string): Promise<resp.IConsumeCardCodeResp>;

        /**
         * Code解码
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239
         * @param encryptedCode 经过加密的Code码
         */
        decrypt(encryptedCode: string): Promise<resp.IDecryptCardCodeResp>;
    }

    /**
     * "card.coin" service
     */
    export interface CoinCardService {
        /**
         * 开通券点账户
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
         */
        active(): Promise<resp.IActiveCardCoinAccountResp>;

        /**
         * 对优惠券批价
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
         * @param cardId 需要来配置库存的card_id
         * @param quantity 本次需要兑换的库存数目
         */
        getPrice(cardId: string, quantity: number): Promise<resp.IGetCardCoinPayPriceResp>;

        /**
         * 查询券点余额
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
         */
        summary(): Promise<resp.IGetCardCoinSummaryInfoResp>;

        /**
         * 充值券点
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
         * @param count 需要充值的券点数目，1点=1元
         */
        recharge(count: number): Promise<resp.IChargeCardCoinResp>;

        /**
         * 查询订单详情
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
         * @param orderId 充值券点接口中获得的订单号，作为一次交易的唯一凭证
         */
        order(orderId: string): Promise<resp.IGetCardCoinOrderResp>;

        /**
         * 查询券点流水详情
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
         * @param filters
         */
        orders(filters: { [key: string]: any }): Promise<resp.IGetCardCoinOrderListResp>;

        /**
         * 确认兑换库存
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481033345_5cGrc
         * @param cardId 需要来兑换库存的card_id
         * @param orderId 仅可以使用优惠券批价得到的订单号，保证批价有效性
         * @param quantity 本次需要兑换的库存数目
         */
        confirm(cardId: string, orderId: string, quantity: number): Promise<string>;
    }

    /**
     * "card.general" service
     */
    export interface GeneralCardService {
        /**
         * 通用卡接口激活
         * @param info
         */
        active(info: { [key: string]: any }): Promise<any>;

        /**
         * 通用卡撤销激活
         * @param cardId
         * @param code
         */
        deactivate(cardId: string, code: string): Promise<any>;

        /**
         *  更新用户礼品卡信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=215143440770UT7Y
         * @param params
         */
        updateUser(
            params: resp.IUpdateGeneralCardUserReq
        ): Promise<resp.IUpdateGeneralCardUserResp>;
    }

    /**
     * "card.meeting" service
     */
    export interface MeetingCardService {
        /**
         *  更新用户礼品卡信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=215143440770UT7Y
         * @param params
         */
        updateUser(
            params: resp.IUpdateGeneralCardUserReq
        ): Promise<resp.IUpdateGeneralCardUserResp>;
    }

    /**
     * "card.member" service
     */
    export interface MemberCardService {
        /**
         * 会员卡接口激活
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
         * @param info
         */
        active(info: resp.IActivateMemberCardReq): Promise<string>;

        /**
         * 设置开卡字段
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
         * @param cardId
         * @param settings
         */
        setActivationForm(cardId: string, settings: { [key: string]: any }): Promise<any>;

        /**
         * 拉取会员信息接口
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
         * @param cardId
         * @param code
         */
        getUser(cardId: string, code: string): Promise<resp.IGetMemberCardUserInfoResp>;

        /**
         *  更新会员信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025283
         * @param params
         */
        updateUser(
            params: resp.IUpdateMemberCardUserInfoReq
        ): Promise<resp.IUpdateMemberCardUserInfoResp>;
    }

    /**
     * "card.movie" service
     */
    export interface MovieCardService {
        /**
         *  更新电影券会员信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025288
         * @param params
         */
        updateUser(params: resp.IUpdateMovieTicketUserInfoReq): Promise<string>;
    }

    /**
     * "card.submerchant" service
     */
    export interface SubMerchantCardService {
        /**
         * 创建子商户
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
         * @param info
         */
        create(info: resp.ICreateSubMerchantReq): Promise<resp.ICreateSubMerchantResp>;

        /**
         * 更新子商户
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
         * @param merchantId
         * @param info
         */
        update(
            merchantId: number,
            info: resp.IUpdateSubMerchantReq
        ): Promise<resp.IUpdateSubMerchantResp>;

        /**
         * 获取子商户信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
         * @param merchantId
         */
        stats(merchantId: number): Promise<resp.IGetSubMerchantResp>;

        /**
         * 批量获取子商户信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025292
         * @param beginId 起始的子商户id，一个母商户公众号下唯一
         * @param limit 拉取的子商户的个数，最大值为100
         * @param status 子商户审核状态，填入后，只会拉出当前状态的子商户
         */
        list(
            beginId?: number,
            limit?: number,
            status?: string
        ): Promise<resp.IGetSubMerchantListResp>;
    }

    /**
     * "comment" service
     */
    export interface CommentService {
        /**
         * 打开已群发文章评论
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
         */
        open(msgId: number, index?: number): Promise<string>;

        /**
         * 关闭已群发文章评论
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
         */
        close(msgId: number, index?: number): Promise<string>;

        /**
         * 查看指定文章的评论数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
         */
        list(
            msgId: number,
            index: number,
            begin: number,
            count: number,
            type: number
        ): Promise<resp.IGetCommentListResp>;

        /**
         * 将评论标记精选
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
         */
        markElect(msgId: number, index: number, commentId: number): Promise<string>;

        /**
         * 将评论取消精选
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
         */
        unmarkElect(msgId: number, index: number, commentId: number): Promise<string>;

        /**
         * 删除评论
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
         */
        delete(msgId: number, index: number, commentId: number): Promise<string>;

        /**
         * 回复评论
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
         * @param msgId 群发返回的msg_data_id
         * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
         * @param commentId 用户评论id
         * @param content 回复内容
         */
        reply(msgId: number, index: number, commentId: number, content: string): Promise<string>;

        /**
         * 删除回复
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
         * @param msgId 群发返回的msg_data_id
         * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
         * @param commentId 用户评论id
         */
        deleteReply(msgId: number, index: number, commentId: number): Promise<string>;
    }

    /**
     * "kf" service
     */
    export interface KFService {
        /**
         * 获取客服列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
         */
        list(): Promise<resp.IGetCustomerKFListResp>;

        /**
         * 获取在线客服列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
         */
        onlineList(): Promise<resp.IGetCustomerKFOnlineListResp>;

        /**
         * 添加客服帐号
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
         * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号，帐号前缀最多10个字符，必须是英文、数字字符或者下划线，后缀为公众号微信号，长度不超过30个字符
         * @param nickname 客服昵称，最长16个字
         */
        create(account: string, nickname: string): Promise<string>;

        /**
         * 设置客服信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
         * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
         * @param nickname 客服昵称，最长16个字
         */
        update(account: string, nickname: string): Promise<string>;

        /**
         * 删除客服帐号
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
         * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
         */
        delete(account: string): Promise<string>;

        /**
         * 邀请绑定客服帐号
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
         * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
         * @param wechatId 接收绑定邀请的客服微信号
         */
        invite(account: string, wechatId: string): Promise<string>;

        /**
         * 上传客服头像
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
         * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
         * @param imagePath 图片路径
         */
        uploadAvatar(account: string, imagePath: string): Promise<string>;

        /**
         * 客服接口-发消息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
         * @param message 文本或BroadcastMessage子类实例
         * @param to 目标用户OpenId
         * @param kfAccount 以某个客服帐号来发消息(可选)
         */
        sendMessage(
            message: string | broadcast.BroadcastMessage,
            to: string,
            kfAccount?: string
        ): Promise<string>;

        /**
         * 客服输入状态
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
         * @param to 目标用户OpenId
         */
        sendTypingStatus(to: string): Promise<string>;

        /**
         * 获取聊天记录
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044813
         * @param startTime 起始时间，unix时间戳
         * @param endTime 结束时间，unix时间戳，每次查询时段不能超过24小时
         * @param msgId 消息id顺序从小到大，从1开始
         * @param count 每次获取条数，最多10000条
         */
        messageHistory(
            startTime: number,
            endTime: number,
            msgId?: number,
            count?: number
        ): Promise<resp.IGetCustomerKFMessageListResp>;
    }

    /**
     * "kfsession" service
     */
    export interface KFSessionService {
        /**
         * 获取客服会话列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044820
         * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
         */
        list(account: string): Promise<resp.IGetKFSessionListResp>;

        /**
         * 获取未接入会话列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044820
         */
        waitingList(): Promise<resp.IGetKFSessionWaitingListResp>;

        /**
         * 创建会话
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044820
         * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
         * @param openId 粉丝的openid
         */
        create(account: string, openId: string): Promise<string>;

        /**
         * 关闭会话
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044820
         * @param account 完整客服帐号，格式为：帐号前缀@公众号微信号
         * @param openId 粉丝的openid
         */
        close(account: string, openId: string): Promise<string>;

        /**
         * 获取客户会话状态
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1458044820
         * @param openId 粉丝的openid
         */
        stats(openId: string): Promise<resp.IGetCustomerSessionResp>;
    }

    /**
     * "datacube" service
     */
    export interface DataCubeService {
        /**
         * 获取用户增减数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141082
         */
        userSummary(from: string, to: string): Promise<resp.IGetUserSummaryResp>;

        /**
         * 获取累计用户数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141082
         */
        userCumulate(from: string, to: string): Promise<resp.IGetUserCumulateResp>;

        /**
         * 获取图文群发每日数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141084
         */
        articleSummary(from: string, to: string): Promise<resp.IGetArticleSummaryResp>;

        /**
         * 获取图文群发总数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141084
         */
        articleTotal(from: string, to: string): Promise<resp.IGetArticleTotalResp>;

        /**
         * 获取图文阅读统计数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141084
         */
        userReadSummary(from: string, to: string): Promise<resp.IGetReadSummaryResp>;

        /**
         * 获取图文阅读统计分时数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141084
         */
        userReadHourly(from: string, to: string): Promise<resp.IGetReadHourlyResp>;

        /**
         * 获取图文分享转发数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141084
         */
        userShareSummary(from: string, to: string): Promise<resp.IGetShareSummaryResp>;

        /**
         * 获取图文分享转发分时数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141084
         */
        userShareHourly(from: string, to: string): Promise<resp.IGetShareHourlyResp>;

        /**
         * 获取消息发送概况数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141085
         */
        upstreamMessageSummary(from: string, to: string): Promise<resp.IGetUpstreamMsgResp>;

        /**
         * 获取消息发送分时数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141085
         */
        upstreamMessageHourly(from: string, to: string): Promise<resp.IGetUpstreamMsgHourlyResp>;

        /**
         * 获取消息发送周数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141085
         */
        upstreamMessageWeekly(from: string, to: string): Promise<resp.IGetUpstreamMsgWeeklyResp>;

        /**
         * 获取消息发送月数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141085
         */
        upstreamMessageMonthly(from: string, to: string): Promise<resp.IGetUpstreamMsgMonthResp>;

        /**
         * 获取消息发送分布数据
         */
        upstreamMessageDistSummary(from: string, to: string): Promise<resp.IGetUpstreamMsgDistResp>;

        /**
         * 获取消息发送分布周数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141085
         */
        upstreamMessageDistWeekly(
            from: string,
            to: string
        ): Promise<resp.IGetUpstreamMsgDistWeeklyResp>;

        /**
         * 获取消息发送分布月数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141085
         */
        upstreamMessageDistMonthly(
            from: string,
            to: string
        ): Promise<resp.IGetUpstreamMsgDistMonthlyResp>;

        /**
         * 获取接口分析数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141086
         */
        interfaceSummary(from: string, to: string): Promise<resp.IGetInterfaceSummaryResp>;

        /**
         * 获取接口分析分时数据
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141086
         */
        interfaceSummaryHourly(
            from: string,
            to: string
        ): Promise<resp.IGetInterfaceSummaryHourlyResp>;

        /**
         * 拉取卡券概况数据接口
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         */
        cardSummary(
            from: string,
            to: string,
            condSource: number
        ): Promise<resp.IGetCardSummaryResp>;

        /**
         * 获取免费券数据接口
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         */
        freeCardSummary(
            from: string,
            to: string,
            condSource?: number,
            cardId?: string
        ): Promise<resp.IGetFreeCardSummaryResp>;

        /**
         * 拉取会员卡数据接口
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         * @param from
         * @param to
         * @param condSource 卡券来源，0为公众平台创建的卡券数据、1是API创建的卡券数据
         */
        memberCardSummary(
            from: string,
            to: string,
            condSource: number
        ): Promise<resp.IGetMemberCardSummaryResp>;

        /**
         * 拉取单张会员卡数据接口
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
         */
        memberCardDetail(
            from: string,
            to: string,
            cardId: string
        ): Promise<resp.IGetMemberCardDetailResp>;
    }

    /**
     * "device" service
     */
    export interface DeviceService {
        /**
         * 第三方发送消息给设备主人的微信终端，并最终送达设备
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        message(
            deviceId: string,
            openId: string,
            content: string
        ): Promise<resp.IDeviceTransMsgResp>;

        /**
         * 第三方主动发送设备状态消息给微信终端
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        statMessage(
            deviceId: string,
            openId: string,
            type: number,
            status: number
        ): Promise<resp.IDeviceTransMsgResp>;

        /**
         * 获取设备绑定openID
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        openId(deviceId: string): Promise<resp.IDeviceGetOpenIdResp>;

        /**
         * 获取设备二维码
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        qrCode(deviceIds: string[]): Promise<resp.IDeviceGetQrCodeResp>;

        /**
         * 验证二维码
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        verifyQrCode(ticket: string): Promise<resp.IDeviceVerifyQrCodeResp>;

        /**
         * 获取 deviceid 和二维码
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        createId(productId: string): Promise<resp.IDeviceCreateIdResp>;

        /**
         * 设备授权
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        authorize(
            devices: resp.IDevice[],
            productId: string,
            opType: number
        ): Promise<resp.IDeviceAuthResp>;

        /**
         * 利用 deviceid 更新设备属性
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        update(devices: resp.IDevice[]): Promise<resp.IDeviceAuthResp>;

        /**
         * 设备状态查询
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        stat(deviceId: string): Promise<resp.IDeviceStatResp>;

        /**
         * 设备绑定成功通知
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        bind(openId: string, deviceId: string, ticket: string): Promise<resp.IDeviceBindResp>;

        /**
         * 设备解绑成功通知
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        unbind(openId: string, deviceId: string, ticket: string): Promise<resp.IDeviceBindResp>;

        /**
         * 强制绑定用户和设备
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        forceBind(openId: string, deviceId: string): Promise<resp.IDeviceForceBindResp>;

        /**
         * 强制解绑用户和设备
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        forceUnbind(openId: string, deviceId: string): Promise<resp.IDeviceForceUnbindResp>;

        /**
         * 通过openid获取用户绑定的设备
         * http://iot.weixin.qq.com/wiki/doc/both/%E8%AE%BE%E5%A4%87%E6%8E%A5%E5%85%A5%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AEV2.3.2.pdf
         */
        getBindDevice(openId: string): Promise<resp.IDeviceGetBindingResp>;
    }

    /**
     * "material" service
     */
    export interface MaterialService {
        /**
         * 上传图片永久素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729
         */
        uploadImage(path: string): Promise<resp.IUploadCommonResp>;

        /**
         * 上传语音永久素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729
         */
        uploadVoice(path: string): Promise<resp.IUploadCommonResp>;

        /**
         * 上传缩略图永久素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729
         */
        uploadThumb(path: string): Promise<resp.IUploadCommonResp>;

        /**
         * 上传视频永久素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729
         */
        uploadVideo(
            path: string,
            title?: string,
            description?: string
        ): Promise<resp.IUploadCommonResp>;

        /**
         * 新增永久图文消息素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729
         */
        uploadArticle(articles: resp.IArticle[]): Promise<resp.IUploadNewsResp>;

        /**
         * 修改永久图文素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738732
         */
        updateArticle(mediaId: string, article: resp.IArticle, index?: number): Promise<string>;

        /**
         * 上传图文消息内的图片获取URL
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729
         */
        uploadArticleImage<IUploadNewsImageResp>(path: string): Promise<resp.IUploadNewsImageResp>;

        /**
         * 获取永久素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738730
         */
        get(
            mediaId: string
        ): Promise<resp.IGetNewsMaterialResp | resp.IGetVideoMaterialResp | Stream>;

        /**
         * 删除永久素材
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738731
         */
        delete(mediaId: string): Promise<resp.IDeleteMaterialResp>;

        /**
         * 获取素材列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738734
         */
        list(type: string, offset?: number, count?): Promise<resp.IGetMaterialListResp>;

        /**
         * 获取素材总数
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738733
         */
        stats(): Promise<resp.IGetMaterialCountResp>;
    }

    /**
     * "menu" service
     */
    export interface MenuService {
        /**
         * 查询自定义菜单的结构(包含默认菜单和个性化菜单)
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141014
         */
        list(): Promise<resp.IMenu>;

        /**
         * 获取当前自定义菜单配置
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1434698695
         */
        current(): Promise<resp.IMenuConfig>;

        /**
         * 创建自定义菜单
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141013
         */
        create(buttons: resp.IMenuButton[]): Promise<string>;

        /**
         * 删除自定义菜单(会同时删除个性化菜单)
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141015
         */
        delete(): Promise<string>;

        /**
         * 创建个性化菜单
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455782296
         */
        createConditional(menu: resp.IConditionalMenu): Promise<string>;

        /**
         * 删除个性化菜单
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455782296
         */
        deleteConditional(menuId: string): Promise<string>;

        /**
         * 测试个性化菜单匹配结果
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455782296
         */
        tryMatch(userId: string): Promise<{ button: resp.IMenuButton[] }>;
    }

    /**
     * "poi" service
     */
    export interface POIService {
        /**
         * 查询门店信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444378120
         */
        getPOI(id: number): Promise<resp.IGetPOIResp>;

        /**
         * 查询门店列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444378120
         */
        list(offset?: number, limit?: number): Promise<resp.IGetPOIListResp>;

        /**
         * 创建门店
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444378120
         */
        create(poi: resp.ICreatePOIReq);

        /**
         * 修改门店服务信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444378120
         */
        update(id: number, poi: resp.IUpdatePOIReq): Promise<string>;

        /**
         * 删除门店
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444378120
         */
        delete(id: number): Promise<string>;

        /**
         * 获取门店类目表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444378120
         */
        categories(): Promise<resp.IGetPOICategoryListResp>;
    }

    /**
     * "semantic" service
     */
    export interface SemanticService {
        /**
         * 语义理解查询
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141241
         * @param keyword
         * @param categories
         * @param ext 至少提供城市/经纬度信息其一
         */
        query(
            keyword: string,
            categories: string,
            ext: { [key: string]: any }
        ): Promise<resp.ISemanticQueryResp>;
    }

    /**
     * "server" service
     */
    export interface ServerService {
        /**
         * Inject necessary middlewares to Express/Koa app
         * @param app Express/Koa app
         * @param path route path
         */
        connect(app, path?: string): void;

        /**
         * handle message from wechat server
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140453
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140454
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140841
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025274
         */
        handle(handler: (msg: message.Message) => Promise<string | message.Message | false>): void;
    }

    /**
     * "shakearound" service
     */
    export interface ShakeAroundService {
        // TODO
    }

    /**
     * "templatemessage" service
     */
    export interface TemplateMessageService {
        /**
         * 设置所属行业
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751277
         */
        setIndustry(primaryIndustry: string, secondaryIndustry: string): Promise<string>;

        /**
         * 获取设置的行业信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751277
         */
        getIndustry(): Promise<resp.IGetIndustryResp>;

        /**
         * 获得模板ID
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751277
         */
        addTemplate(shortId: string): Promise<resp.IAddTemplateResp>;

        /**
         * 获取模板列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751277
         */
        getPrivateTemplates(): Promise<resp.IGetTemplateListResp>;

        /**
         * 删除模板
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751277
         */
        deletePrivateTemplate(templateId: string): Promise<resp.IWXCommonResp>;

        /**
         * 发送模板消息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433751277
         */
        send(data: resp.ISendTemplateMessageReq): Promise<resp.ISendTemplateMessageResp>;

        /**
         * 一次性订阅消息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1500374289_66bvB
         */
        sendSubscription(data: resp.ISendTemplateMessageReq): Promise<resp.IWXCommonResp>;
    }

    /**
     * "user" service
     */
    export interface UserService {
        /**
         * 创建用户标签
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837
         */
        createTag(name: string): Promise<resp.ICreateTagResp>;

        /**
         * 获取用户标签列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837
         */
        getTags(): Promise<resp.IGetTagsResp>;

        /**
         * 编辑用户标签
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837
         * @param tagId 标签ID
         * @param tagName 标签名称
         */
        updateTag(tagId: number, tagName: string): Promise<string>;

        /**
         * 删除用户标签
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837
         * @param tagId 标签ID
         */
        deleteTag(tagId: number): Promise<string>;

        /**
         * 获取标签下粉丝列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837
         * @param tagId 标签ID
         * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
         */
        getTagUserList(tagId: number, nextOpenId?: string): Promise<resp.IGetTagUserListResp>;

        /**
         * 批量为用户打标签
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837
         * @param tagId 标签ID
         * @param userList 用户列表(OpenId)
         */
        tagUsers(tagId: number, userList: string[]): Promise<string>;

        /**
         * 批量为用户取消标签
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837
         * @param tagId 标签ID
         * @param userList 用户列表(OpenId)
         */
        untagUsers(tagId: number, userList: string[]): Promise<string>;

        /**
         * 获取用户身上的标签列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837
         * @param userId 用户ID(OpenId)
         */
        getUserTags(userId: string): Promise<resp.IGetUserTagsResp>;

        /**
         * 设置用户备注名(该接口暂时开放给微信认证的服务号)
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140838
         * @param userId 用户ID(OpenId)
         * @param remark 备注名
         */
        setRemark(userId: string, remark: string): Promise<string>;

        /**
         * 获取用户基本信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140839
         * @param userId 用户ID(OpenId)
         * @param lang 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
         */
        getInfo(userId: string, lang?: string): Promise<resp.IGetUserInfoResp>;

        /**
         * 批量获取用户基本信息
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140839
         * @param userList
         */
        batchGetInfo(
            userList: { openid: string; lang: string }[]
        ): Promise<{ user_info_list: resp.IGetUserInfoResp[] }>;

        /**
         * 获取用户列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140840
         * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
         */
        list(nextOpenId?: string): Promise<resp.IGetUserListResp>;

        /**
         * 获取黑名单用户列表
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140840
         * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
         */
        blacklist(nextOpenId?: string): Promise<resp.IGetUserBlackListResp>;

        /**
         * 拉黑用户
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140840
         * @param userList 用户ID列表(OpenId)
         */
        drop(userList: string[]): Promise<string>;

        /**
         *  取消拉黑用户
         * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140840
         * @param userList 用户ID列表(OpenId)
         */
        recover(userList: string[]): Promise<string>;
    }
}

declare namespace resp {
    export interface IWXCommonResp {
        errcode: number;
        errmsg: string;
    }

    export interface ICreateQrCodeResp {
        ticket: string;
        expire_seconds: number;
        url: string;
    }

    export interface ISendBroadcastMessageResp extends IWXCommonResp {
        msg_id: number;
        msg_data_id: number;
    }

    export interface IPreviewBroadcastMessageResp extends IWXCommonResp {
        msg_id: number;
    }

    export interface IGetBroadMessageResp {
        msg_id: number;
        msg_status: string;
    }

    export interface IReply {
        content: string; //作者回复内容
        create_time: number;
    }

    export interface IComment {
        user_comment_id: number;
        openid: string;
        create_time: number;
        content: string;
        comment_type: number; //是否精选评论，0为即非精选，1为true，即精选
        reply: IReply;
    }

    export interface IGetCommentListResp extends IWXCommonResp {
        total: number;
        comment: IComment[];
    }

    export interface IGetUserSummaryResp {
        list: {
            ref_date: string;
            user_source: number;
            new_user: number;
            cancel_user: number;
        }[];
    }

    export interface IGetUserCumulateResp {
        list: {
            ref_date: string;
            cumulate_user: number;
        }[];
    }

    interface IReadBase {
        int_page_read_user: number;
        int_page_read_count: number;
        ori_page_read_user: number;
        ori_page_read_count: number;
    }

    interface IShareBase {
        share_user: number;
        share_count: number;
    }

    interface IFavoriteBase {
        add_to_fav_user: string;
        add_to_fav_count: string;
    }

    export interface IGetArticleSummaryResp {
        list: (IReadBase &
            IShareBase &
            IFavoriteBase & {
                ref_date: string;
                msgid: string;
                title: string;
            })[];
    }

    export interface IGetArticleTotalResp {
        list: {
            ref_date: string;
            msgid: string;
            title: string;
            details: (IReadBase &
                IShareBase &
                IFavoriteBase & {
                    stat_date: string;
                    target_user: number;
                    int_page_from_session_read_user: number;
                    int_page_from_session_read_count: number;
                    int_page_from_hist_msg_read_user: number;
                    int_page_from_hist_msg_read_count: number;
                    int_page_from_feed_read_user: number;
                    int_page_from_feed_read_count: number;
                    int_page_from_friends_read_user: number;
                    int_page_from_friends_read_count: number;
                    int_page_from_other_read_user: number;
                    int_page_from_other_read_count: number;
                    feed_share_from_session_user: number;
                    feed_share_from_session_cnt: number;
                    feed_share_from_feed_user: number;
                    feed_share_from_feed_cnt: number;
                    feed_share_from_other_user: number;
                    feed_share_from_other_cnt: number;
                })[];
        }[];
    }

    export interface IGetReadSummaryResp {
        list: (IReadBase &
            IShareBase &
            IFavoriteBase & {
                ref_date: string;
            })[];
    }

    export interface IGetReadHourlyResp {
        list: (IReadBase &
            IShareBase &
            IFavoriteBase & {
                ref_date: string;
                ref_hour: number;
                user_source: number;
            })[];
    }

    export interface IGetShareSummaryResp {
        list: (IShareBase & {
            ref_date: string;
            share_scene: number;
        })[];
    }

    export interface IGetShareHourlyResp {
        list: (IShareBase & {
            ref_date: string;
            ref_hour: number;
            share_scene: number;
        })[];
    }

    interface IMsgBase {
        msg_type: number;
        msg_user: number;
        msg_count: number;
    }

    export interface IGetUpstreamMsgResp {
        list: (IMsgBase & {
            ref_date: string;
        })[];
    }

    export interface IGetUpstreamMsgHourlyResp {
        list: (IMsgBase & {
            ref_date: string;
            ref_hour: number;
        })[];
    }

    export interface IGetUpstreamMsgWeeklyResp {
        list: (IMsgBase & {
            ref_date: string;
        })[];
    }

    export interface IGetUpstreamMsgMonthResp {
        list: (IMsgBase & {
            ref_date: string;
        })[];
    }

    export interface IGetUpstreamMsgDistResp {
        list: ({
            ref_date: string;
            count_interval: number;
            msg_user: number;
        })[];
    }

    export interface IGetUpstreamMsgDistWeeklyResp {
        list: ({
            ref_date: string;
            count_interval: number;
            msg_user: number;
        })[];
    }

    export interface IGetUpstreamMsgDistMonthlyResp {
        list: ({
            ref_date: string;
            count_interval: number;
            msg_user: number;
        })[];
    }

    export interface IGetInterfaceSummaryResp {
        list: {
            ref_date: string;
            callback_count: number;
            fail_count: number;
            total_time_cost: number;
            max_time_cost: number;
        }[];
    }

    export interface IGetInterfaceSummaryHourlyResp {
        list: {
            ref_date: string;
            ref_hour: number;
            callback_count: number;
            fail_count: number;
            total_time_cost: number;
            max_time_cost: number;
        }[];
    }

    interface ICardBase {
        view_cnt: number;
        view_user: number;
        receive_cnt: number;
        receive_user: number;
        verify_cnt: number;
        verify_user: number;
        given_cnt: number;
        given_user: number;
        expire_cnt: number;
        expire_user: number;
    }

    export interface IGetCardSummaryResp {
        list: (ICardBase & {
            ref_date: string;
        })[];
    }

    export interface IGetFreeCardSummaryResp {
        list: (ICardBase & {
            ref_date: string;
            card_id: string;
            card_type: number;
        })[];
    }

    interface IMemberCardBase {
        view_cnt: number;
        view_user: number;
        receive_cnt: number;
        receive_user: number;
        active_user: number;
        verify_cnt: number;
        verify_user: number;
        total_user: number;
    }

    export interface IGetMemberCardSummaryResp {
        list: (IMemberCardBase & {
            ref_date: string;
            total_receive_user: number;
        })[];
    }

    export interface IGetMemberCardDetailResp {
        list: (IMemberCardBase & {
            ref_date: string;
            merchanttype: number;
            cardid: string;
            submerchantid: number;
            active_cnt: number;
            new_user: number;
            payOriginalFee: number;
            fee: number;
        })[];
    }

    export interface IDeviceTransMsgResp {
        ret: number;
        ret_info: string;
    }

    export interface IDeviceGetOpenIdResp {
        open_id: string[];
        resp_msg: {
            ret_code: number;
            error_info: string;
        };
    }

    export interface IDeviceGetQrCodeResp extends IWXCommonResp {
        device_num: number;
        code_list: {
            device_id: string;
            ticket: string;
        }[];
    }

    export interface IDeviceVerifyQrCodeResp extends IWXCommonResp {
        device_type: string;
        device_id: string;
        mac: string;
    }

    export interface IDeviceCreateIdResp {
        resp_msg: {
            ret_code: number;
            error_info: string;
        };
        deviceid: string;
        qrticket: string;
    }

    export interface IDevice {
        id: string;
        mac: string;
        connect_protocol: string;
        auth_key: string;
        close_strategy: string;
        conn_strategy: string;
        crypt_method: string;
        auth_ver: string;
        manu_mac_pos: string;
        ser_mac_pos: string;
    }

    export interface IDeviceAuthResp {
        resp: (IWXCommonResp & {
            base_info: {
                device_type: string;
                device_id: string;
            };
        })[];
    }

    export interface IDeviceStatResp extends IWXCommonResp {
        status: number;
        status_info: string;
    }

    export interface IDeviceBindResp {
        base_resp: IWXCommonResp;
    }

    export interface IDeviceForceBindResp extends IDeviceBindResp {}

    export interface IDeviceForceUnbindResp extends IDeviceBindResp {}

    export interface IDeviceGetBindingResp {
        resp_msg: {
            ret_code: number;
            error_info: string;
        };
        openid: string;
        device_list: {
            device_type: string;
            device_id: string;
        }[];
    }

    export interface IArticle {
        title: string;
        thumb_media_id: string;
        author: string;
        digest: string;
        show_cover_pic: 0 | 1;
        content: string;
        content_source_url: string;
        need_open_comment: 0 | 1;
        only_fans_can_comment: 0 | 1;
    }

    interface INewsItem {
        title: string;
        thumb_media_id: string;
        show_cover_pic: 0 | 1;
        author: string;
        digest: string;
        content: string;
        url: string;
        content_source_url: string;
    }

    interface IMaterialItem {
        media_id: string;
        content: {
            news_item: INewsItem[];
        };
        update_time: string;
    }

    export interface IUploadCommonResp {
        media_id: string;
        url: string;
    }

    export interface IUploadNewsImageResp {
        url: string;
    }

    export interface IUploadNewsResp {
        media_id: string;
    }

    export interface IGetNewsMaterialResp {
        news_item: INewsItem;
    }

    export interface IGetVideoMaterialResp {
        title: string;
        description: string;
        down_url: string;
    }

    export interface IDeleteMaterialResp extends IWXCommonResp {}

    export interface IGetMaterialListResp {
        total_count: number;
        item_count: number;
        item: IMaterialItem[];
    }

    export interface IGetMaterialCountResp {
        voice_count: number;
        video_count: number;
        image_count: number;
        news_count: number;
    }

    export interface IMenu {
        menu: IGeneralMenu;
        conditionalmenu?: IConditionalMenu;
    }

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

    // 当前自定义菜单配置
    export interface IMenuConfig {
        is_menu_open: number;
        selfmenu_info: {
            button: IMenuButton[];
        };
    }

    interface IBusiness {
        base_info: {
            sid: string;
            business_name: string;
            branch_name: string;
            province: string;
            city: string;
            address: string;
            telephone: string;
            categories: string[];
            offset_type: number;
            longitude: string;
            latitude: string;
            photo_list: { photo_url: string }[];
            recommend: string;
            special: string;
            introduction: string;
            open_time: string;
            avg_price: number;
            available_state: number;
            update_status: number;
        };
    }

    export interface IGetPOIResp extends IWXCommonResp {
        business: IBusiness;
    }

    export interface IGetPOIListResp extends IWXCommonResp {
        business_list: IBusiness[];
    }

    export interface ICreatePOIReq extends IBusiness {}

    export interface ICreatePOIResp extends IWXCommonResp {
        poi_id: number;
    }

    export interface IUpdatePOIReq extends IBusiness {}

    export interface IGetPOICategoryListResp {
        category_list: string[];
    }

    export interface ISemanticQueryResp {
        errcode: number;
        query: string;
        type: string;
        semantic: any;
        result?: any[];
        answer?: string;
        text?: string;
    }

    export interface IGetIndustryResp {
        primary_industry: { first_class: string; second_class: string };
        secondary_industry: { first_class: string; second_class: string };
    }

    export interface IAddTemplateResp extends IWXCommonResp {
        template_id: string;
    }

    export interface IGetTemplateListResp {
        template_list: {
            template_id: string;
            title: string;
            primary_industry: string;
            deputy_industry: string;
            content: string;
            example: string;
        }[];
    }

    export interface ISendTemplateMessageReq {
        touser: string;
        template_id: string;
        url?: string;
        miniprogram?: {
            appid: string;
            pagepath: string;
        };
        scene?: string;
        title?: string;
        data: { [key: string]: { value: string; color?: string } };
    }

    export interface ISendTemplateMessageResp extends IWXCommonResp {
        msgid: number;
    }

    export interface IUserTag {
        id: number;
        name: string;
    }

    export interface ICreateTagResp {
        tag: IUserTag;
    }

    export interface IGetTagsResp {
        tags: (IUserTag & { count: number })[];
    }

    export interface IGetTagUserListResp {
        count: number;
        data: {
            openid: string[];
        };
        next_openid: string; //拉取列表最后一个用户的openid
    }

    export interface IGetUserTagsResp {
        tagid_list: number[];
    }

    export interface IGetUserInfoResp {
        subscribe: number;
        openid: string;
        nickname: string;
        sex: number;
        language: string;
        city: string;
        province: string;
        country: string;
        headimgurl: string;
        subscribe_time: number;
        unionid: string;
        remark: string;
        groupid: number;
        tagid_list: number[];
    }

    export interface IGetUserListResp {
        total: number;
        count: number;
        data: {
            openid: string[];
            next_openid: string;
        };
    }

    export interface IGetUserBlackListResp {
        total: number;
        count: number;
        data: {
            openid: string[];
        };
        next_openid: string;
    }

    export interface ICustomerKF {
        kf_account: string;
        kf_headimgurl: string;
        kf_id: string;
        kf_nick: string;
        kf_wx: string;
        invite_wx?: string;
        invite_expire_time?: number;
        invite_status?: string;
    }

    export interface ICustomerKFOnline {
        kf_account: string;
        status: number;
        kf_id: string;
        accepted_case: number;
    }

    export interface IGetCustomerKFListResp {
        kf_list: ICustomerKF[];
    }

    export interface IGetCustomerKFOnlineListResp {
        kf_online_list: ICustomerKFOnline[];
    }

    export interface ICustomerKFMessageRecord {
        openid: string;
        opercode: number;
        text: string;
        time: number;
        worker: string;
    }

    export interface IGetCustomerKFMessageListResp {
        recordlist: ICustomerKFMessageRecord[];
    }

    export interface IGetKFSessionListResp {
        sessionlist: {
            createtime: number;
            openid: string;
        }[];
    }

    export interface IGetKFSessionWaitingListResp {
        count: number;
        waitcaselist: {
            latest_time: number;
            openid: string;
        }[];
    }

    export interface IGetCustomerSessionResp {
        createtime: number;
        kf_account: string;
    }

    // Card
    export interface IGetCardColorsResp extends IWXCommonResp {
        colors: {
            name: string;
            value: string;
        }[];
    }

    export interface IGetCardCategoriesResp extends IWXCommonResp {
        category: {
            category_name: string;
            primary_category_id: number;
            secondary_category: {
                can_choose_payment_card: number;
                can_choose_prepaid_card: number;
                category_name: string;
                need_qualification_stuffs: string[];
                secondary_category_id: number;
            }[];
        }[];
    }

    export interface IGetCardDetailResp extends IWXCommonResp {
        card: {
            card_type: CardType;
            discount: {
                base_info: {
                    id: string;
                    logo_url: string;
                    code_type: CardCodeType;
                    brand_name: string;
                    title: string;
                    date_info: {
                        type: "DATE_TYPE_FIX_TIME_RANGE" | "DATE_TYPE_FIX_TERM";
                        fixed_term: number;
                        fixed_begin_term: number;
                    };
                    color: string;
                    notice: string;
                    description: string;
                    location_id_list: number[];
                    get_limit: number;
                    can_share: boolean;
                    can_give_friend: boolean;
                    status:
                        | "CARD_STATUS_VERIFY_OK"
                        | "CARD_STATUS_NOT_VERIFY"
                        | "CARD_STATUS_VERIFY_FAIL"
                        | "CARD_STATUS_DELETE"
                        | "CARD_STATUS_DISPATCH";
                    sku: {
                        quantity: number;
                        total_quantity: number;
                    };
                    create_time: number;
                    update_time: number;
                    area_code_list: number[];
                };
                discount: number;
                advanced_info: {
                    time_limit: [
                        {
                            type: string;
                        },
                        {
                            type: string;
                        }
                    ];
                    text_image_list: string[];
                    business_service: string[];
                    consume_share_card_list: string[];
                    abstract: {
                        abstract: string;
                        icon_url_list: string[];
                    };
                    share_friends: boolean;
                };
            };
        };
    }

    export interface IGetCardListResp extends IWXCommonResp {
        card_id_list: string[];
        total_num: number;
    }

    export interface IUpdateCardResp extends IWXCommonResp {
        send_check: boolean;
    }

    export interface IQrScanCardInfo {
        code: string;
        card_id?: string;
        openid?: string;
        expire_seconds?: number;
        is_unique_code?: boolean;
        outer_id?: number;
        outer_str?: number;
    }

    export interface IGetCardQrCodeResp extends IWXCommonResp {
        ticket: string;
        expire_seconds: number;
        url: string;
        show_qrcode_url: string;
    }

    export interface ICreateLandingPageResp extends IWXCommonResp {
        url: string;
        page_id: number;
    }

    export interface IGetNewsBroadcastCardHtmlResp extends IWXCommonResp {
        content: string;
    }

    export interface IGetUserCardListResp extends IWXCommonResp {
        card_list: {
            code: string;
            card_id: string;
        }[];
        has_share_card: boolean;
    }

    export interface IGetDepositCount extends IWXCommonResp {
        count: number;
    }

    export interface ICheckCodeResp extends IWXCommonResp {
        exist_code: string[];
        not_exist_code: string[];
    }

    export interface IGetCardCodeResp extends IWXCommonResp {
        card?: {
            card_id: string;
            begin_time: number;
            end_time: number;
        };
        openid?: string;
        can_consume?: boolean;
        user_card_status?: string;
    }

    export interface IConsumeCardCodeResp extends IWXCommonResp {
        card: {
            card_id: string;
        };
        openid: string;
    }

    export interface IDecryptCardCodeResp extends IWXCommonResp {
        code: string;
    }

    export interface IActiveCardCoinAccountResp extends IWXCommonResp {
        reward: number;
    }

    export interface IGetCardCoinPayPriceResp extends IWXCommonResp {
        order_id: string;
        price: string;
        free_coin: string;
        pay_coin: string;
    }

    export interface IGetCardCoinSummaryInfoResp extends IWXCommonResp {
        free_coin: number;
        pay_coin: number;
        total_coin: number;
    }

    export interface IChargeCardCoinResp extends IWXCommonResp {
        order_id: string;
        qrcode_url: string;
        qrcode_buffer: string;
    }

    interface ICardCoinOrderInfo {
        order_id: string;
        status: string;
        create_time: number;
        pay_finish_time: number;
        desc: string;
        free_coin_count: string;
        pay_coin_count: string;
        refund_free_coin_count: string;
        refund_pay_coin_count: string;
        openid: string;
        order_type: string;
    }

    export interface IGetCardCoinOrderResp extends IWXCommonResp {
        order_info: ICardCoinOrderInfo;
    }

    export interface IGetCardCoinOrderListResp extends IWXCommonResp {
        order_info: ICardCoinOrderInfo;
        total_num: number;
    }

    export interface IUpdateGeneralCardUserReq {
        code: string;
        card_id: string;
        background_pic_url?: string;
        balance?: number;
        record_balance?: string;
        custom_field_value1?: string;
        custom_field_value2?: string;
        custom_field_value3?: string;
        can_give_friend?: boolean;
    }

    export interface IUpdateGeneralCardUserResp extends IWXCommonResp {
        result_bonus: number;
        result_balance: number;
        openid: string;
    }

    export interface IActivateMemberCardReq {
        init_bonus: number;
        init_bonus_record: string;
        init_balance: number;
        membership_number: string;
        code: string;
        card_id: string;
        background_pic_url: string;
        init_custom_field_value1: string;
    }

    export interface IGetMemberCardUserInfoResp extends IWXCommonResp {
        openid: string;
        nickname: string;
        membership_number: string;
        bonus: number;
        sex: string;
        user_info: {
            common_field_list: [
                {
                    name: string;
                    value: string;
                }[]
            ];
            custom_field_list: [
                {
                    name: string;
                    value: string;
                    value_list: string[];
                }[]
            ];
        };
        user_card_status: string;
        has_active: boolean;
    }

    export interface IUpdateMemberCardUserInfoReq {
        code: string;
        card_id: string;
        background_pic_url?: string;
        record_bonus?: string;
        bonus?: number;
        add_bonus?: number;
        balance?: number;
        add_balance?: number;
        record_balance?: string;
        custom_field_value1?: string;
        custom_field_value2?: string;
        notify_optional?: {
            is_notify_bonus: boolean;
            is_notify_balance: boolean;
            is_notify_custom_field1: boolean;
        };
    }

    export interface IUpdateMemberCardUserInfoResp extends IWXCommonResp {
        result_bonus: number;
        result_balance: number;
        openid: string;
    }

    export interface IUpdateMovieTicketUserInfoReq {
        code: string;
        card_id: string;
        ticket_class: string;
        show_time: number;
        duration: number;
        screening_room?: string;
        seat_number?: string[];
    }

    export interface ICreateSubMerchantReq {
        brand_name: string;
        app_id?: string;
        logo_url: string;
        protocol: string;
        agreement_media_id?: string;
        operator_media_id?: string;
        end_time: number;
        primary_category_id: number;
        secondary_category_id: number;
    }

    export interface ICreateSubMerchantResp {
        info: {
            merchant_id: number;
            app_id: string;
            create_time: number;
            update_time: number;
            brand_name: string;
            logo_url: string;
            status: string;
            begin_time: number;
            end_time: number;
            primary_category_id: number;
            secondary_category_id: number;
        };
    }

    export interface IUpdateSubMerchantReq extends ICreateSubMerchantReq {
        merchant_id: number;
    }

    export interface IUpdateSubMerchantResp extends ICreateSubMerchantResp {}

    export interface IGetSubMerchantResp extends ICreateSubMerchantResp {}

    export interface IGetSubMerchantListResp {
        info_list: {
            merchant_id: number;
            create_time: number;
            update_time: number;
            brand_name: string;
            logo_url: string;
            status: string;
            begin_time: number;
            end_time: number;
            primary_category_id: number;
            secondary_category_id: number;
        }[];
        next_begin_id: number;
    }
}
