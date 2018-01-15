"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tpl = require("lodash-template");
var MessageType_1 = require("../Enum/MessageType");
var TextMessage_1 = require("./TextMessage");
var msgRender = tpl([
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
].join(""));
function fromXML(xmlBody) {
    for (var key in xmlBody) {
        var value = xmlBody[key];
        if (Array.isArray(value)) {
            xmlBody[key] = value.length > 0 ? value[0] : "";
        }
    }
    var MsgId = xmlBody.MsgId, MsgType = xmlBody.MsgType, Content = xmlBody.Content, FromUserName = xmlBody.FromUserName, ToUserName = xmlBody.ToUserName, CreateTime = xmlBody.CreateTime;
    switch (MsgType) {
        case MessageType_1.default.TEXT:
            return new TextMessage_1.default(MsgId, FromUserName, ToUserName, Content, parseInt(CreateTime, 10));
        default:
            return new TextMessage_1.default(MsgId, FromUserName, ToUserName, Content, parseInt(CreateTime, 10));
    }
}
exports.fromXML = fromXML;
function renderXML(msg) {
    return msgRender(msg);
}
exports.renderXML = renderXML;
exports.default = {
    fromXML: fromXML,
    renderXML: renderXML
};
