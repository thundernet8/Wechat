import validate from "./Validate";
import ServiceContainer from "../ServiceContainer";
// import ServiceClient from "../ServiceClient";

export default function koaMiddleware(container: ServiceContainer, client: any) {
    return async (ctx, next) => {
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
                return next();
            }
        }
    };
}
