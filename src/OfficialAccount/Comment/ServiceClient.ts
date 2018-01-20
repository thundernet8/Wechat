import BaseServiceClient from "../../Core/ServiceClient";
import { IGetCommentListResp } from "../Interface/IComment";

/**
 * Implement methods of Comment service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 打开已群发文章评论
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     */
    public open(msgId: number, index?: number): Promise<string> {
        return this.httpPost("/cgi-bin/comment/open", {
            msg_data_id: msgId,
            index: index || 0
        });
    }

    /**
     * 关闭已群发文章评论
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     */
    public close(msgId: number, index?: number): Promise<string> {
        return this.httpPost("/cgi-bin/comment/close", {
            msg_data_id: msgId,
            index: index || 0
        });
    }

    /**
     * 查看指定文章的评论数据
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认返回该msg_data_id的第一篇图文
     * @param begin 起始位置
     * @param count 获取数目（>=50会被拒绝）
     * @param type type=0 普通评论&精选评论 type=1 普通评论 type=2 精选评论
     */
    public list(
        msgId: number,
        index: number,
        begin: number,
        count: number,
        type: number
    ): Promise<IGetCommentListResp> {
        const data = {
            msg_data_id: msgId,
            index,
            begin,
            count,
            type
        };

        return this.httpPost("/cgi-bin/comment/list", data);
    }

    /**
     * 将评论标记精选
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     * @param commentId 用户评论id
     */
    public markElect(msgId: number, index: number, commentId: number): Promise<string> {
        const data = {
            msg_data_id: msgId,
            index,
            user_comment_id: commentId
        };
        return this.httpPost("/cgi-bin/comment/markelect", data);
    }

    /**
     * 将评论取消精选
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     * @param commentId 用户评论id
     */
    public unmarkElect(msgId: number, index: number, commentId: number): Promise<string> {
        const data = {
            msg_data_id: msgId,
            index,
            user_comment_id: commentId
        };
        return this.httpPost("/cgi-bin/comment/unmarkelect", data);
    }

    /**
     * 删除评论
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     * @param commentId 用户评论id
     */
    public delete(msgId: number, index: number, commentId: number): Promise<string> {
        const data = {
            msg_data_id: msgId,
            index,
            user_comment_id: commentId
        };
        return this.httpPost("/cgi-bin/comment/delete", data);
    }

    /**
     * 回复评论
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     * @param commentId 用户评论id
     * @param content 回复内容
     */
    public reply(
        msgId: number,
        index: number,
        commentId: number,
        content: string
    ): Promise<string> {
        const data = {
            msg_data_id: msgId,
            index,
            user_comment_id: commentId,
            content
        };
        return this.httpPost("/cgi-bin/comment/reply/add", data);
    }

    /**
     * 删除回复
     * @param msgId 群发返回的msg_data_id
     * @param index 多图文时，用来指定第几篇图文，从0开始，不带默认操作该msg_data_id的第一篇图文
     * @param commentId 用户评论id
     */
    public deleteReply(msgId: number, index: number, commentId: number): Promise<string> {
        const data = {
            msg_data_id: msgId,
            index,
            user_comment_id: commentId
        };
        return this.httpPost("/cgi-bin/comment/reply/delete", data);
    }
}
