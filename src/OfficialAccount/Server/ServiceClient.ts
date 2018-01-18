import BaseServiceClient from "../../Core/ServiceClient";
import * as moment from "moment";
import middleware from "../../Core/Middleware";
import Response from "../../Core/Http/Response";
import Message from "../../Core/Message/Message";
import TextMessage from "../../Core/Message/TextMessage";
import MessageHelper from "../../Core/Message/MessageHelper";

/**
 * Implement methods of Server service
 */
export default class ServiceClient extends BaseServiceClient {
    private msgHandlers: ((msg: Message) => Promise<string | Message | false>)[] = [];

    /**
     * Middleware for koa/express
     */
    public get middleware() {
        return middleware(this.app, this);
    }

    public async response() {
        const resp = new Response();

        const { body } = this.app.request;
        if (!body || !body.xml) {
            resp.body = "";
            return resp;
        }
        const originMsg = MessageHelper.fromXML(this.app.request.body.xml);
        let respMsg;
        for (let i = 0; i < this.msgHandlers.length; i++) {
            const handler = this.msgHandlers[i];
            const result = await handler(originMsg);
            if (result === false) {
                break;
            }
            respMsg = result;
        }

        if (respMsg) {
            let reply: Message;
            if (respMsg instanceof Message) {
                reply = respMsg;
            } else {
                reply = new TextMessage(respMsg);
            }
            reply.createTime = Math.ceil(moment.now().valueOf() / 1000);
            reply.from = originMsg.to;
            reply.to = originMsg.from;
            // Debug
            // TODO remove
            console.log(reply.toXML());
            resp.body = reply.toXML();
        } else {
            resp.body = "";
        }
        return resp;
    }

    public handle(handler: (msg: Message) => Promise<string | Message | false>) {
        this.msgHandlers.push(handler);
    }
}
