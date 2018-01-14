import * as moment from "moment";
import IServiceProvider from "../../Core/Interface/IServiceProvider";
import ServiceContainer from "../../Core/ServiceContainer";
import middleware from "../../Core/Middleware";
import Response from "../../Core/Http/Response";
import Message from "../../Core/Message/Message";
import TextMessage from "../../Core/Message/TextMessage";

/**
 * Msg Server Service Provider
 */
export default class ServiceProvider implements IServiceProvider {
    private app: ServiceContainer;
    private msgHandlers: ((msg: Message) => Promise<string | Message | false>)[] = [];

    public register(app: ServiceContainer) {
        this.app = app;
        app.setService("server", this);
        return this;
    }

    /**
     * Middleware for koa/express
     */
    public get middleware() {
        return middleware(this.app, this);
    }

    public async response() {
        const originMsg = Message.fromXML(this.app.request.body.xml);
        let respMsg;
        for (let i = 0; i < this.msgHandlers.length; i++) {
            const handler = this.msgHandlers[i];
            const result = await handler(originMsg);
            if (result === false) {
                break;
            }
            respMsg = result;
        }
        const resp = new Response();
        if (respMsg) {
            if (resp instanceof Message) {
                resp.body = resp.toXML();
            } else {
                resp.body = new TextMessage(
                    "",
                    originMsg.to,
                    originMsg.from,
                    respMsg,
                    Math.ceil(moment.now().valueOf() / 1000)
                ).toXML();
            }
        } else {
            resp.body = "";
        }
        return resp;
    }

    public handle(handler: (msg: Message) => Promise<string | Message | false>) {
        this.msgHandlers.push(handler);
    }
}
