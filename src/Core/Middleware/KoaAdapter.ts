import validate from "./Validate";
import ServiceContainer from "../ServiceContainer";
import * as xmlParser from "koa-xml-body";
import * as koaRoute from "koa-route";

export default function koaMiddleware(
    path: string | null,
    koa,
    container: ServiceContainer,
    client: any
) {
    const wxMiddleware = async (ctx, next) => {
        const validateResult = validate(ctx.query, container.token);
        if (!validateResult) {
            throw new Error("Validate request failed");
        }

        if (ctx.query.echostr) {
            ctx.status = 200;
            ctx.body = ctx.query.echostr;
        } else {
            container.request = ctx.request;
            if (client.response) {
                try {
                    const resp = await client.response();
                    if (resp) {
                        ctx.status = resp.status || 200;
                        ctx.type = resp.contentType;
                        ctx.body = resp.body || "";
                    }
                } catch (error) {
                    throw error;
                }
            } else {
                if (typeof next === "function") {
                    return next();
                }
                ctx.status = 200;
                ctx.body = "";
            }
        }
    };

    koa.use(xmlParser());
    if (path) {
        koa.use(koaRoute.all(path, wxMiddleware));
    } else {
        koa.use(wxMiddleware);
    }
}
