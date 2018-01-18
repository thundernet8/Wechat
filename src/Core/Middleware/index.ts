import expressMiddleware from "./ExpressAdapter";
import koaMiddleware from "./KoaAdapter";
import ServiceContainer from "../ServiceContainer";
import ServiceClient from "../ServiceClient";
import * as koaRoute from "koa-route";

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
            const middlewares1 = expressMiddleware(container, client);
            if (path) {
                app.use(path, ...middlewares1);
            } else {
                app.use(...middlewares1);
            }
            break;
        case "koa":
            const middlewares2 = koaMiddleware(container, client);
            app.use(middlewares2[0]);
            if (path) {
                middlewares2.slice(1).forEach(mw => {
                    app.use(koaRoute.all(path, mw));
                });
            } else {
                middlewares2.slice(1).forEach(mw => {
                    app.use(mw);
                });
            }
            break;
        default:
            return;
    }
}
