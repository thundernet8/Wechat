import * as tpl from "lodash-template";
import MessageType from "../Enum/MessageType";
import Message from "./Message";
import TextMessage from "./TextMessage";

const msgRender = tpl(
    [
        "<xml>",
        "<ToUserName><![CDATA[<%- ToUserName %>]]></ToUserName>",
        "<FromUserName><![CDATA[<%- FromUserName %>]]></FromUserName>",
        "<CreateTime><%= CreateTime %></CreateTime>",
        "<MsgType><![CDATA[<%= MsgType %>]]></MsgType>",
        '<% if (MsgType === "transfer_customer_service" && kfAccount) { %>',
        "<TransInfo>",
        "<KfAccount><%- KfAccount %></KfAccount>",
        "</TransInfo>",
        "<% } %>",
        '<% if (MsgType === "news") { %>',
        "<ArticleCount><%=Content.length%></ArticleCount>",
        "<Articles>",
        "<% Content.forEach(function(item){ %>",
        "<item>",
        "<Title><![CDATA[<%=item.title%>]]></Title>",
        "<Description><![CDATA[<%=item.description%>]]></Description>",
        "<PicUrl><![CDATA[<%=item.picUrl || item.picurl || item.pic %>]]></PicUrl>",
        "<Url><![CDATA[<%=item.url%>]]></Url>",
        "</item>",
        "<% }) %>",
        "</Articles>",
        '<% } else if (MsgType === "music") { %>',
        "<Music>",
        "<Title><![CDATA[<%=Content.title%>]]></Title>",
        "<Description><![CDATA[<%=Content.description%>]]></Description>",
        "<MusicUrl><![CDATA[<%=Content.musicUrl || Content.url %>]]></MusicUrl>",
        "<HQMusicUrl><![CDATA[<%=Content.hqMusicUrl || Content.hqUrl %>]]></HQMusicUrl>",
        "</Music>",
        '<% } else if (MsgType === "voice") { %>',
        "<Voice>",
        "<MediaId><![CDATA[<%=Content.mediaId%>]]></MediaId>",
        "</Voice>",
        '<% } else if (MsgType === "image") { %>',
        "<Image>",
        "<MediaId><![CDATA[<%-Content.mediaId%>]]></MediaId>",
        "</Image>",
        '<% } else if (MsgType === "video") { %>',
        "<Video>",
        "<Title><![CDATA[<%=Content.title%>]]></Title>",
        "<Description><![CDATA[<%=Content.description%>]]></Description>",
        "<MediaId><![CDATA[<%=Content.mediaId%>]]></MediaId>",
        "<ThumbMediaId><![CDATA[<%=Content.thumbMediaId%>]]></ThumbMediaId>",
        "</Video>",
        "<% } else { %>",
        "<Content><![CDATA[<%=Content%>]]></Content>",
        "<% } %>",
        "</xml>"
    ].join("")
);

export function fromXML<T extends Message>(xmlBody: { [key: string]: string }): T {
    for (let key in xmlBody) {
        const value = xmlBody[key];
        if (Array.isArray(value)) {
            xmlBody[key] = value.length > 0 ? value[0] : "";
        }
    }
    const { MsgId, MsgType, Content, FromUserName, ToUserName, CreateTime } = xmlBody;
    switch (MsgType) {
        case MessageType.TEXT:
            return new TextMessage(
                MsgId,
                FromUserName,
                ToUserName,
                Content,
                parseInt(CreateTime, 10)
            ) as any;
        default:
            return new TextMessage(
                MsgId,
                FromUserName,
                ToUserName,
                Content,
                parseInt(CreateTime, 10)
            ) as any;
    }
}

export function renderXML(msg): string {
    return msgRender(msg);
}

export default {
    fromXML,
    renderXML
};
