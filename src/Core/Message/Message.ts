import * as tpl from "lodash-template";
import MessageType from "../Enum/MessageType";

export default abstract class Message {
    protected static msgRender = tpl(
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

    private _id: string;
    private _type: MessageType = MessageType.TEXT;
    private _to: string;
    private _from: string;
    private _createTime: number;

    protected constructor(type: MessageType) {
        this._type = type;
    }

    /**
     * 消息id，64位整型
     */
    public get id() {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    /**
     * MsgType of xml
     */
    public get type() {
        return this._type;
    }

    /**
     * 开发者微信号(接收消息时)/对应用户的OpenID(发送消息时)
     */
    public get to() {
        return this._to;
    }

    public set to(to: string) {
        this._to = to;
    }

    /**
     * 对应用户的OpenID(接收消息时)/开发者微信号(发送消息时)
     */
    public get from() {
        return this._from;
    }

    public set from(from: string) {
        this._from = from;
    }

    /**
     * 消息创建时间 （整型）
     */
    public get createTime() {
        return this._createTime;
    }

    /**
     * @param createTime timestamp in seconds
     */
    public set createTime(createTime: number) {
        this._createTime = createTime;
    }

    protected toPOJO(): any {
        return {
            ToUserName: this._to,
            FromUserName: this._from,
            CreateTime: this._createTime,
            MsgType: this._type
        };
    }

    public toJSON() {
        return JSON.stringify(this.toPOJO());
    }

    public toXML() {
        return Message.msgRender(this.toPOJO());
    }
}
