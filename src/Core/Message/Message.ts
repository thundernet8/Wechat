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

    protected constructor(
        id: string,
        type: MessageType,
        from: string,
        to: string,
        content: string,
        createTime: number
    ) {
        this.id = id;
        this.type = type;
        this.from = from;
        this.to = to;
        this.content = content;
        this.createTime = createTime;
    }

    /**
     * MsgId field of xml
     */
    public id?: string;

    /**
     * MsgType of xml
     */
    public type: MessageType = MessageType.TEXT;

    /**
     * ToUserName field of xml
     */
    public to: string;

    /**
     * FromUserName field of xml
     */
    public from: string;

    /**
     * CreateTime field of xml(string)
     */
    public createTime: number;

    /**
     * Content field of xml
     */
    public content: any;

    protected toPOJO(): any {
        return {
            ToUserName: this.to,
            FromUserName: this.from,
            CreateTime: this.createTime,
            MsgType: this.type
        };
    }

    public toJSON() {
        return JSON.stringify(this.toPOJO());
    }

    public toXML() {
        return Message.msgRender(this.toPOJO());
    }
}
