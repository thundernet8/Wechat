import { Stream } from "stream";

export as namespace WechatOne;

export = WechatOne;

declare namespace WechatOne {
    var OfficialAccount: internal.ServiceContainer;
    var OpenPlatform: internal.ServiceContainer;
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

        interface CommentService extends service.CommentService {}

        interface CustomerServiceService extends service.CustomerServiceService {}

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
        deviceType?: string; // IOT required, 设备类型，目前为“公众账号原始 ID”
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

        getConfig(key: string): string | number | null;

        setService(name: string, serviceClient: ServiceClient): void;

        getService(name: string): ServiceClient;

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
         */
        getValidIps: Promise<string[]>;

        /**
         * 公众号调用或第三方平台帮公众号调用对公众号的所有api调用（包括第三方帮其调用）次数进行清零
         */
        clearQuota(): Promise<string>;
    }

    /**
     * "media" service
     */
    export interface MediaService {
        /**
         * 上传图片临时素材
         */
        uploadImage(filePath: string): Promise<string>;

        /**
         * 上传语音临时素材
         */
        uploadVoice(filePath: string): Promise<string>;

        /**
         * 上传视频临时素材
         */
        uploadVideo(filePath: string, title: string, description?: string): Promise<string>;

        /**
         * 上传缩略图临时素材
         */
        uploadThumb(filePath: string): Promise<string>;

        /**
         * 获取临时素材
         */
        getMediaStream(mediaId: string): Promise<Stream>;
    }

    /**
     * "qrcode" service
     */
    export interface QrCodeService {
        /**
         * 创建永久二维码
         */
        forever(sceneValue: string | number): resp.ICreateQrCodeResp;

        /**
         * 创建临时二维码
         */
        temporary(sceneValue: string | number, expireSeconds?: number): resp.ICreateQrCodeResp;

        /**
         * 通过ticket换取二维码
         */
        url(ticket: string): string;
    }

    /**
     * "url" service
     */
    export interface UrlService {
        /**
         * 长链接转短链接
         */
        shorten(url: string): Promise<string>;
    }

    /**
     * "autoreply" service
     */
    export interface AutoReplyService {
        /**
         * 获取公众号的自动回复规则
         */
        current(): any;
    }

    /**
     * "broadcast" service
     */
    export interface BroadcastService {
        sendToList(
            message: broadcast.BroadcastMessage,
            to: { towxname?: string[]; touser?: string[] }
        ): Promise<resp.ISendBroadcastMessageResp>;

        send(
            message: broadcast.BroadcastMessage,
            tagId?: number,
            toAll?: boolean
        ): Promise<resp.ISendBroadcastMessageResp>;

        preview(
            message: broadcast.BroadcastMessage,
            to?: { towxname?: string[]; touser?: string[] },
            filter?: { [key: string]: boolean | number }
        ): Promise<resp.IPreviewBroadcastMessageResp>;

        delete(msgId: string, articleIndex?: number): Promise<resp.IWXCommonResp>;

        status(msgId: string): Promise<resp.IGetBroadMessageResp>;

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
        // TODO
    }

    /**
     * "comment" service
     */
    export interface CommentService {
        /**
         * 打开已群发文章评论
         */
        open(msgId: number, index?: number): Promise<string>;

        /**
         * 关闭已群发文章评论
         */
        close(msgId: number, index?: number): Promise<string>;

        /**
         * 查看指定文章的评论数据
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
         */
        markElect(msgId: number, index: number, commentId: number): Promise<string>;

        /**
         * 将评论取消精选
         */
        unmarkElect(msgId: number, index: number, commentId: number): Promise<string>;

        /**
         * 删除评论
         */
        delete(msgId: number, index: number, commentId: number): Promise<string>;

        /**
         * 回复评论
         * @param msgId 群发返回的msg_data_id
         * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
         * @param commentId 用户评论id
         * @param content 回复内容
         */
        reply(msgId: number, index: number, commentId: number, content: string): Promise<string>;

        /**
         * 删除回复
         * @param msgId 群发返回的msg_data_id
         * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
         * @param commentId 用户评论id
         */
        deleteReply(msgId: number, index: number, commentId: number): Promise<string>;
    }

    /**
     * "customerservice" service
     */
    export interface CustomerServiceService {
        // TODO
    }

    /**
     * "datacube" service
     */
    export interface DataCubeService {
        /**
         * 获取用户增减数据
         */
        userSummary(from: string, to: string): Promise<resp.IGetUserSummaryResp>;

        /**
         * 获取累计用户数据
         */
        userCumulate(from: string, to: string): Promise<resp.IGetUserCumulateResp>;

        /**
         * 获取图文群发每日数据
         */
        articleSummary(from: string, to: string): Promise<resp.IGetArticleSummaryResp>;

        /**
         * 获取图文群发总数据
         */
        articleTotal(from: string, to: string): Promise<resp.IGetArticleTotalResp>;

        /**
         * 获取图文阅读统计数据
         */
        userReadSummary(from: string, to: string): Promise<resp.IGetReadSummaryResp>;

        /**
         * 获取图文阅读统计分时数据
         */
        userReadHourly(from: string, to: string): Promise<resp.IGetReadHourlyResp>;

        /**
         * 获取图文分享转发数据
         */
        userShareSummary(from: string, to: string): Promise<resp.IGetShareSummaryResp>;

        /**
         * 获取图文分享转发分时数据
         */
        userShareHourly(from: string, to: string): Promise<resp.IGetShareHourlyResp>;

        /**
         * 获取消息发送概况数据
         */
        upstreamMessageSummary(from: string, to: string): Promise<resp.IGetUpstreamMsgResp>;

        /**
         * 获取消息发送分时数据
         */
        upstreamMessageHourly(from: string, to: string): Promise<resp.IGetUpstreamMsgHourlyResp>;

        /**
         * 获取消息发送周数据
         */
        upstreamMessageWeekly(from: string, to: string): Promise<resp.IGetUpstreamMsgWeeklyResp>;

        /**
         * 获取消息发送月数据
         */
        upstreamMessageMonthly(from: string, to: string): Promise<resp.IGetUpstreamMsgMonthResp>;

        /**
         * 获取消息发送分布数据
         */
        upstreamMessageDistSummary(from: string, to: string): Promise<resp.IGetUpstreamMsgDistResp>;

        /**
         * 获取消息发送分布周数据
         */
        upstreamMessageDistWeekly(
            from: string,
            to: string
        ): Promise<resp.IGetUpstreamMsgDistWeeklyResp>;

        /**
         * 获取消息发送分布月数据
         */
        upstreamMessageDistMonthly(
            from: string,
            to: string
        ): Promise<resp.IGetUpstreamMsgDistMonthlyResp>;

        /**
         * 获取接口分析数据
         */
        interfaceSummary(from: string, to: string): Promise<resp.IGetInterfaceSummaryResp>;

        /**
         * 获取接口分析分时数据
         */
        interfaceSummaryHourly(
            from: string,
            to: string
        ): Promise<resp.IGetInterfaceSummaryHourlyResp>;

        /**
         * 拉取卡券概况数据接口
         */
        cardSummary(
            from: string,
            to: string,
            condSource: number
        ): Promise<resp.IGetCardSummaryResp>;

        /**
         * 获取免费券数据接口
         */
        freeCardSummary(
            from: string,
            to: string,
            condSource?: number,
            cardId?: string
        ): Promise<resp.IGetFreeCardSummaryResp>;

        /**
         * 拉取会员卡数据接口
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
         */
        message(
            deviceId: string,
            openId: string,
            content: string
        ): Promise<resp.IDeviceTransMsgResp>;

        /**
         * 第三方主动发送设备状态消息给微信终端
         */
        statMessage(
            deviceId: string,
            openId: string,
            type: number,
            status: number
        ): Promise<resp.IDeviceTransMsgResp>;

        /**
         * 获取设备绑定openID
         */
        openId(deviceId: string): Promise<resp.IDeviceGetOpenIdResp>;

        /**
         * 获取设备二维码
         */
        qrCode(deviceIds: string[]): Promise<resp.IDeviceGetQrCodeResp>;

        /**
         * 验证二维码
         */
        verifyQrCode(ticket: string): Promise<resp.IDeviceVerifyQrCodeResp>;

        /**
         * 获取 deviceid 和二维码
         */
        createId(productId: string): Promise<resp.IDeviceCreateIdResp>;

        /**
         * 设备授权
         */
        authorize(
            devices: resp.IDevice[],
            productId: string,
            opType: number
        ): Promise<resp.IDeviceAuthResp>;

        /**
         * 利用 deviceid 更新设备属性
         */
        update(devices: resp.IDevice[]): Promise<resp.IDeviceAuthResp>;

        /**
         * 设备状态查询
         */
        stat(deviceId: string): Promise<resp.IDeviceStatResp>;

        /**
         * 设备绑定成功通知
         */
        bind(openId: string, deviceId: string, ticket: string): Promise<resp.IDeviceBindResp>;

        /**
         * 设备解绑成功通知
         */
        unbind(openId: string, deviceId: string, ticket: string): Promise<resp.IDeviceBindResp>;

        /**
         * 强制绑定用户和设备
         */
        forceBind(openId: string, deviceId: string): Promise<resp.IDeviceForceBindResp>;

        /**
         * 强制解绑用户和设备
         */
        forceUnbind(openId: string, deviceId: string): Promise<resp.IDeviceForceUnbindResp>;

        /**
         * 通过openid获取用户绑定的设备
         */
        getBindDevice(openId: string): Promise<resp.IDeviceGetBindingResp>;
    }

    /**
     * "material" service
     */
    export interface MaterialService {
        /**
         * 上传图片永久素材
         */
        uploadImage(path: string): Promise<resp.IUploadCommonResp>;

        /**
         * 上传语音永久素材
         */
        uploadVoice(path: string): Promise<resp.IUploadCommonResp>;

        /**
         * 上传缩略图永久素材
         */
        uploadThumb(path: string): Promise<resp.IUploadCommonResp>;

        /**
         * 上传视频永久素材
         */
        uploadVideo(
            path: string,
            title?: string,
            description?: string
        ): Promise<resp.IUploadCommonResp>;

        /**
         * 新增永久图文消息素材
         */
        uploadArticle(articles: resp.IArticle[]): Promise<resp.IUploadNewsResp>;

        /**
         * 修改永久图文素材
         */
        updateArticle(mediaId: string, article: resp.IArticle, index?: number): Promise<string>;

        /**
         * 上传图文消息内的图片获取URL
         */
        uploadArticleImage<IUploadNewsImageResp>(path: string): Promise<resp.IUploadNewsImageResp>;

        /**
         * 获取永久素材
         */
        get(
            mediaId: string
        ): Promise<resp.IGetNewsMaterialResp | resp.IGetVideoMaterialResp | Stream>;

        /**
         * 删除永久素材
         */
        delete(mediaId: string): Promise<resp.IDeleteMaterialResp>;

        /**
         * 获取素材列表
         */
        list(type: string, offset?: number, count?): Promise<resp.IGetMaterialListResp>;

        /**
         * 获取素材总数
         */
        stats(): Promise<resp.IGetMaterialCountResp>;
    }

    /**
     * "menu" service
     */
    export interface MenuService {
        /**
         * 查询自定义菜单的结构(包含默认菜单和个性化菜单)
         */
        list(): Promise<resp.IMenu>;

        /**
         * 获取当前自定义菜单配置
         */
        current(): Promise<resp.IMenuConfig>;

        /**
         * 创建自定义菜单
         */
        create(buttons: resp.IMenuButton[]): Promise<string>;

        /**
         * 删除自定义菜单(会同时删除个性化菜单)
         */
        delete(): Promise<string>;

        /**
         * 创建个性化菜单
         */
        createConditional(menu: resp.IConditionalMenu): Promise<string>;

        /**
         * 删除个性化菜单
         */
        deleteConditional(menuId: string): Promise<string>;

        /**
         * 测试个性化菜单匹配结果
         */
        tryMatch(userId: string): Promise<{ button: resp.IMenuButton[] }>;
    }

    /**
     * "poi" service
     */
    export interface POIService {
        /**
         * 查询门店信息
         */
        getPOI(id: number): Promise<resp.IGetPOIResp>;

        /**
         * 查询门店列表
         */
        list(offset?: number, limit?: number): Promise<resp.IGetPOIListResp>;

        /**
         * 创建门店
         */
        create(poi: resp.ICreatePOIReq);

        /**
         * 修改门店服务信息
         */
        update(id: number, poi: resp.IUpdatePOIReq): Promise<string>;

        /**
         * 删除门店
         */
        delete(id: number): Promise<string>;

        /**
         * 获取门店类目表
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
         */
        setIndustry(primaryIndustry: string, secondaryIndustry: string): Promise<string>;

        /**
         * 获取设置的行业信息
         */
        getIndustry(): Promise<resp.IGetIndustryResp>;

        /**
         * 获得模板ID
         */
        addTemplate(shortId: string): Promise<resp.IAddTemplateResp>;

        /**
         * 获取模板列表
         */
        getPrivateTemplates(): Promise<resp.IGetTemplateListResp>;

        /**
         * 删除模板
         */
        deletePrivateTemplate(templateId: string): Promise<resp.IWXCommonResp>;

        /**
         * 发送模板消息
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
         */
        createTag(name: string): Promise<resp.ICreateTagResp>;

        /**
         * 获取用户标签列表
         */
        getTags(): Promise<resp.IGetTagsResp>;

        /**
         * 编辑用户标签
         * @param tagId 标签ID
         * @param tagName 标签名称
         */
        updateTag(tagId: number, tagName: string): Promise<string>;

        /**
         * 删除用户标签
         * @param tagId 标签ID
         */
        deleteTag(tagId: number): Promise<string>;

        /**
         * 获取标签下粉丝列表
         * @param tagId 标签ID
         * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
         */
        getTagUserList(tagId: number, nextOpenId?: string): Promise<resp.IGetTagUserListResp>;

        /**
         * 批量为用户打标签
         * @param tagId 标签ID
         * @param userList 用户列表(OpenId)
         */
        tagUsers(tagId: number, userList: string[]): Promise<string>;

        /**
         * 批量为用户取消标签
         * @param tagId 标签ID
         * @param userList 用户列表(OpenId)
         */
        untagUsers(tagId: number, userList: string[]): Promise<string>;

        /**
         * 获取用户身上的标签列表
         * @param userId 用户ID(OpenId)
         */
        getUserTags(userId: string): Promise<resp.IGetUserTagsResp>;

        /**
         * 设置用户备注名(该接口暂时开放给微信认证的服务号)
         * @param userId 用户ID(OpenId)
         * @param remark 备注名
         */
        setRemark(userId: string, remark: string): Promise<string>;

        /**
         * 获取用户基本信息
         * @param userId 用户ID(OpenId)
         * @param lang 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
         */
        getInfo(userId: string, lang?: string): Promise<resp.IGetUserInfoResp>;

        /**
         * 批量获取用户基本信息
         * @param userList
         */
        batchGetInfo(
            userList: { openid: string; lang: string }[]
        ): Promise<{ user_info_list: resp.IGetUserInfoResp[] }>;

        /**
         * 获取用户列表
         * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
         */
        list(nextOpenId?: string): Promise<resp.IGetUserListResp>;

        /**
         * 获取黑名单用户列表
         * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
         */
        blacklist(nextOpenId?: string): Promise<resp.IGetUserBlackListResp>;

        /**
         * 拉黑用户
         * @param userList 用户ID列表(OpenId)
         */
        drop(userList: string[]): Promise<string>;

        /**
         *  取消拉黑用户
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
}
