import Message from "./Message";
import MessageType from "../Enum/MessageType";

/**
 * 图文消息(仅开发者回复可用)
 */
export default class NewsMessage extends Message {
    private _title: string; // 图文消息标题
    private _description: string; // 图文消息描述
    private _articleCount: number; // 图文消息个数，限制为8条以内
    private _articles: NewsMessage[]; // 多条图文消息信息，默认第一个item为大图,注意，如果图文数超过8，则将会无响应
    private _picUrl: string; // 图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
    private _url: string; // 点击图文消息跳转链接

    public constructor(
        title: string,
        description: string,
        picUrl: string,
        url: string,
        articles?: NewsMessage[]
    ) {
        super(MessageType.NEWS);
        this._title = title;
        this._description = description;
        this._picUrl = picUrl;
        this._url = url;
        this._articles = articles || [];
        this._articleCount = this._articles.length + 1;
    }

    protected toPOJO() {
        return Object.assign({}, super.toPOJO(), {
            Title: this._title,
            Description: this._description,
            PicUrl: this._picUrl,
            Url: this._url,
            Articles: this._articles,
            ArticleCount: this._articleCount
        });
    }
}
