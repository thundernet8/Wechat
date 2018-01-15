"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tpl = require("lodash-template");
var MessageType_1 = require("../Enum/MessageType");
var Message = /** @class */ (function () {
    function Message(id, type, from, to, content, createTime) {
        /**
         * MsgType of xml
         */
        this.type = MessageType_1.default.TEXT;
        this.id = id;
        this.type = type;
        this.from = from;
        this.to = to;
        this.content = content;
        this.createTime = createTime;
    }
    Message.prototype.toPOJO = function () {
        return {
            ToUserName: this.to,
            FromUserName: this.from,
            CreateTime: this.createTime,
            MsgType: this.type
        };
    };
    Message.prototype.toJSON = function () {
        return JSON.stringify(this.toPOJO());
    };
    Message.prototype.toXML = function () {
        return Message.msgRender(this.toPOJO());
    };
    Message.msgRender = tpl([
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
    return Message;
}());
exports.default = Message;
