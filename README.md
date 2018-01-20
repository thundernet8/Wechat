## Wechat

Easy to use Wechat SDK for Node(Under dev)

## Implements

* 公众平台
    * [x] 消息处理(中间件)
    * [x] 媒体管理(临时素材)
    * [ ] 素材管理(永久素材)
    * [x] 菜单操作（查询、创建、删除）
    * [x] 二维码（创建临时、永久二维码，查看二维码 URL）
    * [x] 短网址
    * [ ] 分组操作（查询、创建、修改、移动用户到分组）
    * [x] 用户管理
    * [x] 评论管理
    * [x] 设备管理 (IoT)
    * [x] 门店管理
    * [x] 自动回复 (查询自动回复规则)
    * [ ] 群发消息（文本、图片、语音、视频、图文）
    * [ ] 客服记录（查询客服记录，查看客服、查看在线客服）
    * [x] 模版消息
    * [x] 短网址
    * [x] 语义查询
    * [x] 数据分析
    * [ ] 摇一摇
    * [ ] 辅助
        * [x] API Limit 清理
        * [x] 获取微信服务器 IP 列表

## Usage

### 公众平台

实例化 sdk 客户端

```typescript
import Wechat from "wechat-one";

const wx = new Wechat.OfficialAccount({
    appid: WX_APPID,
    secret: WX_APPSECRET,
    token: WX_TOKEN,
    aesKey: WX_AESKEY,
    server: "koa",
    cacher // 可选
});

// 在多进程运行环境，需要统一的数据管理，例如Access Token的缓存，需要提供cacher实现(可以使用一个独立的redis server来提供数据)，接口如下:
cacher: {
    getter: (key: string) => string;
    setter: (key: string, data: string) => void;
}
```

* 消息处理

```typescript
import * as Koa from "koa";

const app = new Koa();
const wx = ...
const mpServer = wx.getService("server");

mpServer.handle(async function handler(msg) {
    switch (msg.type) {
        case "text":
            return "received: " + msg.content; // this will be a text reply
            return new Wechat.Core.ImageReply("MediaId") // this will be a image reply

        ...
        default:
            return "" // no reply
    }

});

// inject middlewares
mpServer.connect(app);
// or inject to specified path
mpServer.connect(app, path);
```

* 媒体上传

```typescript
const mediaService = wx.getService("media");

mediaService.uploadImage("image file path");
mediaService.uploadVoice("voice file path");
mediaService.uploadVideo("video file path");
mediaService.uploadThumb("thumb image file path");
```

* 菜单操作

```typescript
const menuService = wx.getService("menu");
// 列出所有菜单
menuService.list();
// 获取当前自定义菜单配置
menuService.current();
// 创建自定义菜单
menuService.create([
    {
        type: "click",
        name: "name",
        // click等点击类型必须, 菜单KEY值，用于消息接口推送，不超过128字节
        key: "",
        sub_button: [],
        // view、miniprogram类型必须, 网页 链接，用户点击菜单可打开链接，不超过1024字节。 type为miniprogram时，不支持小程序的老版本客户端将打开本url
        url: "",
        // media_id类型和view_limited类型必须, 调用新增永久素材接口返回的合法media_id
        media_id: "",
        // miniprogram类型必须, 小程序的appid（仅认证公众号可配置）
        appid: "",
        // miniprogram类型必须, 小程序的页面路径
        pagepath: ""
    }
]);
// 删除所有菜单
menuService.delete();
// 创建个性化菜单
menuService.createConditional([
    {
        button: buttons,
        matchrule: {}
    }
]);
// 删除个性化菜单
menuService.deleteConditional(menuId);
// 测试个性化菜单匹配
menuService.tryMatch(userId);
```

* 二维码

```typescript
const qrcodeService = wx.getService("qrcode");
// 创建永久二维码
qrcodeService.forever("your scene");
// 创建临时二维码
qrcodeService.temporary("your scene", 3600 /* expireSeconds */);
// 通过ticket换取二维码
qrcodeService.url("ticket");
```

* 模板消息

```typescript
const templatemessageService = wx.getService("templatemessage");
// 设置所属行业
templatemessageService.setIndustry(primaryIndustry, secondaryIndustry);

// 获取设置的行业信息
templatemessageService.getIndustry();
// 获得模板ID
templatemessageService.addTemplate(shortId);
// 获取模板列表
templatemessageService.getPrivateTemplates();
// 删除模板
templatemessageService.deletePrivateTemplate(templateId);
// 发送模板消息
templatemessageService.send(data);
// 一次性订阅消息
templatemessageService.sendSubscription(data);
```

* 短网址

```typescript
const urlService = wx.getService("url");
// 长链接转短链接
urlService.shorten("your long url");
```

* 用户管理

```typescript
const userService = wx.getService("user");
// 创建用户标签
userService.createTag("tag name");
// 获取用户标签列表
userService.getTags();
// 编辑用户标签
userService.updateTag(123 /* tag id */, "tag name");
// 删除用户标签
userService.deleteTag(123 /* tag id */);
// 获取标签下粉丝列表
userService.getTagUserList(123 /* tag id */, "next openid");
// 批量为用户打标签
userService.tagUsers(123 /* tag id */, ["openid1", "openid2"]);
// 批量为用户取消标签
userService.untagUsers(123 /* tag id */, ["openid1", "openid2"]);
// 获取用户的标签列表
userService.getUserTags("openid");
// 设置用户备注名
userService.setRemark("openid", "remark");
// 获取用户基本信息
userService.getInfo("openid", "zh_CN");
// 批量获取用户基本信息
userService.batchGetInfo([
    { openid: "openid1", lang: "zh_CN" },
    { openid: "openid2", lang: "zh_CN" }
]);
// 获取用户列表
userService.list("next openid");
// 获取黑名单用户列表
userService.blacklist("next openid");
// 拉黑用户
userService.drop(["openid1", "openid2"]);
// 取消拉黑用户
userService.recover(["openid1", "openid2"]);
```

* 评论管理

```typescript
const commentService = wx.getService("comment");
// 打开已群发文章评论
commentService.open(msgId, index);
// 关闭已群发文章评论
commentService.close(msgId, index);
// 查看指定文章的评论数据
commentService.list(msgId, index, begin, count, type);
// 将评论标记精选
commentService.markElect(msgId, index, commentId);
// 将评论取消精选
commentService.unmarkElect(msgId, index, commentId);
// 删除评论
commentService.delete(msgId, index, commentId);
// 回复评论
commentService.reply(msgId, index, commentId, content);
// 删除回复
commentService.deleteReply(msgId, index, commentId);
```

* 设备管理

```typescript
const autoreplyService = wx.getService("autoreply");
// 获取公众号的自动回复规则
autoreplyService.current();
```

* 门店管理

```typescript
const poiService = wx.getService("poi");
// 查询门店信息
poiService.getPOI(id);
// 查询门店列表
poiService.list(offset, limit);
// 创建门店
poiService.create(poi);
// 修改门店服务信息
poiService.update(id, poi);
// 删除门店
poiService.delete(id);
// 获取门店类目表
poiService.categories();
```

* 自动回复

```typescript
const deviceService = wx.getService("device");
// 第三方发送消息给设备主人的微信终端，并最终送达设备
deviceService.message(deviceId, openId, content);
// 第三方主动发送设备状态消息给微信终端
deviceService.statMessage(deviceId, openId, type, status);
// 获取设备绑定openID
deviceService.openId(deviceId);
// 获取设备二维码
deviceService.qrCode(deviceIds);
// 验证二维码
deviceService.verifyQrCode(ticket);
// 获取 deviceid 和二维码
deviceService.createId(productId);
// 设备授权
deviceService.authorize(devices, productId, opType);
// 利用 deviceid 更新设备属性
deviceService.update(devices);
// 设备状态查询
deviceService.stat(deviceId);
// 设备绑定成功通知
deviceService.bind(openId, deviceId, ticket);
// 设备解绑成功通知
deviceService.unbind(openId, deviceId, ticket);
// 强制绑定用户和设备
deviceService.forceBind(openId, deviceId);
// 强制解绑用户和设备
deviceService.forceUnbind(openId, deviceId);
// 通过openid获取用户绑定的设备
deviceService.getBindDevice(openId);
```

* 语义查询

```typescript
const semanticService = wx.getService("semantic");
// 语义理解查询
semanticService.query(keyword, categories, optional?);
```

* 数据分析

```typescript
const datacubeService = wx.getService("datacube");
// 获取用户增减数据
datacubeService.userSummary(from, to);
// 获取累计用户数据
datacubeService.userCumulate(from, to);
// 获取图文群发每日数据
datacubeService.articleSummary(from, to);
// 获取图文群发总数据
datacubeService.articleTotal(from, to);
// 获取图文阅读统计数据
datacubeService.userReadSummary(from, to);
// 获取图文阅读统计分时数据
datacubeService.userReadHourly(from, to);
// 获取图文分享转发数据
datacubeService.userShareSummary(from, to);
// 获取图文分享转发分时数据
datacubeService.userShareHourly(from, to);
// 获取消息发送概况数据
datacubeService.upstreamMessageSummary(from, to);
// 获取消息发送分时数据
datacubeService.upstreamMessageHourly(from, to);
// 获取消息发送周数据
datacubeService.upstreamMessageWeekly(from, to);
// 获取消息发送月数据
datacubeService.upstreamMessageMonthly(from, to);
// 获取消息发送分布数据
datacubeService.upstreamMessageDistSummary(from, to);
// 获取消息发送分布周数据
datacubeService.upstreamMessageDistWeekly(from, to);
// 获取消息发送分布月数据
datacubeService.upstreamMessageDistMonthly(from, to);
// 获取接口分析数据
datacubeService.interfaceSummary(from, to);
// 获取接口分析分时数据
datacubeService.interfaceSummaryHourly(from, to);
// 拉取卡券概况数据接口
datacubeService.cardSummary(from, to, condSource);
// 获取免费券数据接口
datacubeService.freeCardSummary(from, to, condSource, cardId);
// 拉取会员卡数据接口
datacubeService.memberCardSummary(from, to, condSource);
// 拉取单张会员卡数据接口
datacubeService.memberCardDetail(from, to, cardId);
```

* 辅助

```typescript
const baseService = wx.getService("base");
// 获取微信服务器IP列表
baseService.getValidIps();
// API限制数量清0(谨慎调用)
baseService.clearQuota();
```
