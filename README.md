## Wechat

Easy to use Wechat SDK for Node(Under dev)

## Implements

* 公众平台
    * [x] 消息处理(中间件)
    * [x] 媒体管理(临时素材)
    * [ ] 素材管理(永久素材)
    * [x] 菜单操作（查询、创建、删除）
    * [ ] 二维码（创建临时、永久二维码，查看二维码 URL）
    * [ ] 分组操作（查询、创建、修改、移动用户到分组）
    * [ ] 用户信息（查询用户基本信息、获取关注者列表）
    * [ ] 群发消息（文本、图片、语音、视频、图文）
    * [ ] 客服记录（查询客服记录，查看客服、查看在线客服）
    * [ ] 模版消息
    * [ ] 短网址
    * [ ] 语义查询
    * [ ] 数据分析
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
    server: "koa"
});
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

app.use(xmlParser()); // must add a xml parser middleware
app.use(mpServer.middleware);
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
