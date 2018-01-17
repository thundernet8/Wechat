## Wechat

Easy to use Wechat SDK for Node(Under dev)

## Implements

* 公众平台
    * [x] 消息处理

## Usage

### 公众平台

* 消息处理

```typescript
import Wechat from "wechat-one";
import * as Koa from "koa";

const app = new Koa();
const wx = new Wechat.OfficialAccount({
    appid: WX_APPID,
    secret: WX_APPSECRET,
    token: WX_TOKEN,
    aesKey: WX_AESKEY,
    server: "koa"
});
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
