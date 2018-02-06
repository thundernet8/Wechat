<div align="center">

## Wechat-One

**Easy to use Wechat SDK for Node .**

[![GitHub issues](https://img.shields.io/github/issues/thundernet8/Wechat.svg)](https://github.com/thundernet8/Wechat/issues)
[![GitHub forks](https://img.shields.io/github/forks/thundernet8/Wechat.svg)](https://github.com/thundernet8/Wechat/network)
[![GitHub stars](https://img.shields.io/github/stars/thundernet8/Wechat.svg)](https://github.com/thundernet8/Wechat/stargazers)
[![dependency status](https://img.shields.io/david/thundernet8/Wechat.svg?maxAge=3600&style=flat)](https://david-dm.org/thundernet8/Wechat)
[![Build Status](https://travis-ci.org/thundernet8/Wechat.svg?branch=master)](https://travis-ci.org/thundernet8/Wechat)
[![GitHub license](https://img.shields.io/github/license/thundernet8/Wechat.svg)](https://github.com/thundernet8/Wechat/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

</div>

<br>

## Implements

* 公众平台
    * [x] 消息处理(中间件)
    * [x] 媒体管理(临时素材)
    * [x] 素材管理(永久素材)
    * [x] 菜单操作（查询、创建、删除）
    * [x] 二维码（创建临时、永久二维码，查看二维码 URL）
    * [x] 短网址
    * [x] 用户管理
    * [x] 评论管理
    * [x] 设备管理 (IoT)
    * [x] 门店管理
    * [x] 卡券管理
    * [x] 自动回复 (查询自动回复规则)
    * [x] 群发消息（文本、图片、语音、视频、图文）
    * [x] 客服记录（查询客服记录，查看客服、查看在线客服）
    * [x] 客服会话
    * [x] 模版消息
    * [x] 短网址
    * [x] 语义查询
    * [x] 数据分析
    * [ ] 摇一摇
    * [x] OAuth
    * [x] 辅助
        * [x] API Limit 清理
        * [x] 获取微信服务器 IP 列表

## Usage

### Typings 支持

npm package 已经添加了 Typings 支持，为了获得更好的类型和自动提示支持，推荐使用 TypeScript 开发

获取一个具体的类型化服务

```typescript
import Wechat, { OfficialAccountService } from "wechat-one";

const wx = new Wechat.OfficialAccount({
    appid: WX_APPID,
    secret: WX_APPSECRET,
    token: WX_TOKEN,
    aesKey: WX_AESKEY,
    server: "koa"
});

const userService = wx.getService<OfficialAccountService.UserService>("user");
// or
const userService = wx.getService("user") as OfficialAccountService.UserService;
```

实例化一个文本回复

```typescript
const reply = new Wechat.Core.TextReply("content");
```

实例化一个文本群发消息

```typescript
const broadcast = new Wechat.Core.TextBroadcastMessage("content");
```

参考[更多](src/index.d.ts)

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

* 媒体管理

```typescript
const mediaService = wx.getService("media");

mediaService.uploadImage("image file path");
mediaService.uploadVoice("voice file path");
mediaService.uploadVideo("video file path");
mediaService.uploadThumb("thumb image file path");
```

* 素材管理

```typescript
const materialService = wx.getService("material");

materialService.uploadImage("image file path");
materialService.uploadVoice("voice file path");
materialService.uploadVideo("video file path");
materialService.uploadThumb("thumb image file path");

// 新增永久图文消息素材
materialService.uploadArticle(articles);
// 修改永久图文素材
materialService.updateArticle(mediaId, article, index);
// 上传图文消息内的图片获取URL
materialService.uploadArticleImage(path);
// 获取永久素材
materialService.get(mediaId);
// 删除永久素材
materialService.delete(mediaId);
// 获取素材列表
materialService.list(type, offset, limit);
// 获取素材总数
materialService.stats();
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

* 自动回复

```typescript
const autoreplyService = wx.getService("autoreply");
// 获取公众号的自动回复规则
autoreplyService.current();
```

* 群发消息

```typescript
const broadcastService = wx.getService("broadcast");
// 根据OpenID列表群发消息
broadcastService.sendToList(message, to);
// 根据标签进行群发
broadcastService.send(message, tagId, toAll);
// 群发消息预览
broadcastService.preview(message, to, filter);
// 删除群发消息
broadcastService.delete(msgId, articleIndex);
// 获取群发消息
broadcastService.stats(msgId);
// 群发文本消息
broadcastService.sendText();
// 群发语音消息
broadcastService.sendVoice();
// 群发图片消息
broadcastService.sendImage();
// 群发视频消息
broadcastService.sendVideo();
// 群发卡券消息
broadcastService.sendCard();
// 群发图文消息
broadcastService.sendNews();
```

* 客服记录

```typescript
const kfService = wx.getService("kf");
// 获取客服列表
kfService.list();
// 获取在线客服列表
kfService.onlineList();
// 添加客服帐号
kfService.create(account, nickname);
// 设置客服信息
kfService.update(account, nickname);
// 删除客服帐号
kfService.delete(account);
// 邀请绑定客服帐号
kfService.invite(account, wechatId);
// 上传客服头像
kfService.uploadAvatar(account, imagePath);
// 客服接口-发消息
kfService.sendMessage(message, to, kfAccount?);
// 客服输入状态
kfService.sendTypingStatus(to);
// 获取聊天记录
kfService.messageHistory(startTime, endTime, msgId, count);
```

* 客服会话

```typescript
const kfSessionService = wx.getService("kfsession");
// 获取客服会话列表
kfSessionService.list(account);
// 获取未接入会话列表
kfSessionService.waitingList();
// 创建会话
kfSessionService.create(account, openId);
// 关闭会话
kfSessionService.close(account, openId);
// 获取客户会话状态
kfSessionService.stats(openId);
```

* 设备管理

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
deviceService.stats(deviceId);
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

* 卡券管理

```typescript
const cardService = wx.getService("card");
// 获取卡券颜色列表
cardService.colors();
// 卡券开放类目查询接口
cardService.categories();
// 创建卡券
cardService.create(cardType, attributes);
// 查看卡券详情
cardService.stats(cardId);
// 批量查询卡券列表
cardService.list(offset, count, statusList);
// 更改卡券信息接口
cardService.update(cardId, type, attributes);
// 删除卡券接口
cardService.delete(cardId);
// 创建二维码
cardService.createQrCode(cards);
// 通过ticket换取二维码链接
cardService.getQrCodeUrl(ticket);
// 创建货架接口
cardService.createLandingPage(banner, pageTitle, canShare, scene, cardList);
// 图文消息群发卡券
cardService.getHtml(cardId);
// 设置测试白名单
cardService.setTestWhitelist(openIds, isUsername?);
// 获取用户已领取卡券
cardService.getUserCards(openId, cardId?);
// 设置买单接口
cardService.setPayCell(cardId, isOpen?);
// 增加卡券库存
cardService.increaseStock(cardId, amount);
// 减少卡券库存
cardService.reduceStock(cardId, amount);
```

```typescript
const cardCodeService = wx.getService("card.code");
// 导入自定义code
cardCodeService.deposit(cardId, codes);
// 查询导入code数目
cardCodeService.getDepositedCount(cardId);
// 核查code
cardCodeService.check(cardId, codes);
// 查询Code接口
cardCodeService.stats(code, cardId?, checkConsume?);
// 更改Code接口
cardCodeService.update(code, newCode, cardId?);
// 设置卡券失效
cardCodeService.disable(code, cardId?, reason?);
// 核销Code
cardCodeService.consume(code, cardId?);
// Code解码
cardCodeService.decrypt(encryptedCode);
```

```typescript
const coinCardService = wx.getService("card.coin");
// 开通券点账户
coinCardService.active();
// 对优惠券批价
coinCardService.getPrice(cardId, quantity);
// 查询券点余额
coinCardService.summary();
// 充值券点
coinCardService.recharge(code);
// 查询订单详情
coinCardService.order(orderId);
// 查询券点流水详情
coinCardService.orders(filters);
// 确认兑换库存
coinCardService.confirm(cardId, orderId, quantity);
```

```typescript
const generalCardService = wx.getService("card.general");
// 通用卡接口激活
generalCardService.active(info);
// 通用卡撤销激活
generalCardService.deactivate(cardId, code);
// 更新用户礼品卡信息
generalCardService.updateUser(params);
```

```typescript
const meetingCardService = wx.getService("card.meeting");
// 更新用户会议卡信息
meetingCardService.updateUser(params);
```

```typescript
const memberCardService = wx.getService("card.member");
// 会员卡接口激活
memberCardService.active(info);
// 设置开卡字段
memberCardService.setActivationForm(cardId, settings);
// 拉取会员信息接口
memberCardService.getUser(cardId, code);
// 更新会员信息
memberCardService.updateUser(params);
```

```typescript
const movieCardService = wx.getService("card.movie");
// 更新电影券会员信息
movieCardService.updateUser(params);
```

```typescript
const submerchantCardService = wx.getService("card.submerchant");
// 创建子商户
submerchantCardService.create(info);
// 更新子商户
submerchantCardService.update(merchantId, info);
// 获取子商户信息
submerchantCardService.stats(merchantId);
// 批量获取子商户信息
submerchantCardService.list(beginId?, limit?, status?);
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
