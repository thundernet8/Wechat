import BaseServiceClient from "../../Core/ServiceClient";
import BroadcastMessage from "../../Core/BroadcastMessage/BroadcastMessage";
import TextBroadcastMessage from "../../Core/BroadcastMessage/TextBroadcastMessage";
import {
    ISendBroadcastMessageResp,
    IPreviewBroadcastMessageResp,
    IDeleteBroadMessageResp,
    IGetBroadMessageResp
} from "../Interface/IBroadcastMessage";
import VoiceBroadcastMessage from "Core/BroadcastMessage/VoiceBroadcastMessage";
import ImageBroadcastMessage from "Core/BroadcastMessage/ImageBroadcastMessage";
import CardBroadcastMessage from "Core/BroadcastMessage/CardBroadcastMessage";
import MPNewsBroadcastMessage from "Core/BroadcastMessage/MPNewsBroadcastMessage";

/**
 * Implement methods of Broadcast service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481187827_i0l21
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 根据OpenID列表群发【订阅号不可用，服务号认证后可用】
     * @param message
     * @param to user openId list
     */
    public sendToList(message: BroadcastMessage, to: { towxname?: string[]; touser?: string[] }) {
        const data = Object.assign({}, message.toPOJO(), to);

        return this.httpPost<ISendBroadcastMessageResp>("/cgi-bin/message/mass/send", data);
    }

    /**
     * 根据标签进行群发【订阅号与服务号认证后均可用】
     * @param message
     */
    public send(message: BroadcastMessage, tagId?: number, toAll?: boolean) {
        const filter = {
            is_to_all: !!toAll
        };
        if (tagId !== undefined) {
            filter["tag_id"] = tagId;
        }
        const data = Object.assign(
            {
                filter
            },
            message.toPOJO()
        );

        return this.httpPost<ISendBroadcastMessageResp>("/cgi-bin/message/mass/sendall", data);
    }

    /**
     * 群发消息预览【订阅号与服务号认证后均可用】
     * @param message
     */
    public preview(
        message: BroadcastMessage,
        to?: { towxname?: string[]; touser?: string[] },
        filter?: { [key: string]: boolean | number }
    ) {
        let data = message.toPOJO();
        if (!to && !filter) {
            filter = {
                is_to_all: true
            };
            data = Object.assign({}, data, { filter });
        } else if (filter) {
            data = Object.assign({}, data, { filter });
        } else {
            data = Object.assign({}, data, to);
        }

        return this.httpPost<IPreviewBroadcastMessageResp>("/cgi-bin/message/mass/preview", data);
    }

    /**
     * 删除群发消息
     * @param msgId
     */
    public delete(msgId: string, articleIndex?: number) {
        const data = {
            msg_id: msgId
        };

        if (articleIndex !== undefined) {
            data["article_idx"] = articleIndex;
        }

        return this.httpPost<IDeleteBroadMessageResp>("/cgi-bin/message/mass/delete", data);
    }

    /**
     * 获取群发消息
     * @param msgId
     */
    public status(msgId: string) {
        const data = {
            msg_id: msgId
        };

        return this.httpPost<IGetBroadMessageResp>("/cgi-bin/message/mass/get", data);
    }

    public sendText(content: string, reception?: number | string[]) {
        const message = new TextBroadcastMessage(content);
        return this.sendMessage(message, reception);
    }

    public sendVoice(mediaId: string, reception?: number | string[]) {
        const message = new VoiceBroadcastMessage(mediaId);
        return this.sendMessage(message, reception);
    }

    public sendImage(mediaId: string, reception?: number | string[]) {
        const message = new ImageBroadcastMessage(mediaId);
        return this.sendMessage(message, reception);
    }

    public sendVideo(mediaId: string, reception?: number | string[]) {
        const message = new ImageBroadcastMessage(mediaId);
        return this.sendMessage(message, reception);
    }

    public sendCard(cardId: string, reception?: number | string[]) {
        const message = new CardBroadcastMessage(cardId);
        return this.sendMessage(message, reception);
    }

    public sendNews(mediaId: string, reception?: number | string[]) {
        const message = new MPNewsBroadcastMessage(mediaId);
        return this.sendMessage(message, reception);
    }

    private sendMessage(message: BroadcastMessage, reception?: number | string[]) {
        if (Array.isArray(reception)) {
            return this.sendToList(message, { touser: reception });
        } else if (typeof reception === "number") {
            return this.send(message, reception, false);
        }
        return this.send(message);
    }
}
