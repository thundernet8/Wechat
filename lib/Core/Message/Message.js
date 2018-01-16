"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tpl = require("lodash-template");
var MessageType_1 = require("../Enum/MessageType");
var Message = /** @class */ (function () {
    function Message(type) {
        this._type = MessageType_1.default.TEXT;
        this._type = type;
    }
    Object.defineProperty(Message.prototype, "id", {
        /**
         * 消息id，64位整型
         */
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "type", {
        /**
         * MsgType of xml
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "to", {
        /**
         * 开发者微信号(接收消息时)/对应用户的OpenID(发送消息时)
         */
        get: function () {
            return this._to;
        },
        set: function (to) {
            this._to = to;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "from", {
        /**
         * 对应用户的OpenID(接收消息时)/开发者微信号(发送消息时)
         */
        get: function () {
            return this._from;
        },
        set: function (from) {
            this._from = from;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "createTime", {
        /**
         * 消息创建时间 （整型）
         */
        get: function () {
            return this._createTime;
        },
        /**
         * @param createTime timestamp in seconds
         */
        set: function (createTime) {
            this._createTime = createTime;
        },
        enumerable: true,
        configurable: true
    });
    Message.prototype.toPOJO = function () {
        return {
            ToUserName: this._to,
            FromUserName: this._from,
            CreateTime: this._createTime,
            MsgType: this._type
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
