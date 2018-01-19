import expressMiddleware from "./ExpressAdapter";
import koaMiddleware from "./KoaAdapter";
import ServiceContainer from "../ServiceContainer";
import ServiceClient from "../ServiceClient";

function noop() {}

/**
 * 向Express/Koa app注入中间件
 * @param app Express/Koa app
 * @param container SDK app
 * @param client SDK Service client
 */
export default function middleware(
    path: string | null,
    app,
    container: ServiceContainer,
    client: ServiceClient
) {
    switch (container.server) {
        case "express":
            expressMiddleware(path, app, container, client);
            break;
        case "koa":
            koaMiddleware(path, app, container, client);
            break;
        default:
            return;
    }
}
