"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressAdapter_1 = require("./ExpressAdapter");
var KoaAdapter_1 = require("./KoaAdapter");
var koaRoute = require("koa-route");
function noop() { }
/**
 * 向Express/Koa app注入中间件
 * @param app Express/Koa app
 * @param container SDK app
 * @param client SDK Service client
 */
function middleware(path, app, container, client) {
    switch (container.server) {
        case "express":
            var middlewares1 = ExpressAdapter_1.default(container, client);
            if (path) {
                app.use.apply(app, [path].concat(middlewares1));
            }
            else {
                app.use.apply(app, middlewares1);
            }
            break;
        case "koa":
            var middlewares2 = KoaAdapter_1.default(container, client);
            app.use(middlewares2[0]);
            if (path) {
                middlewares2.slice(1).forEach(function (mw) {
                    app.use(koaRoute.all(path, mw));
                });
            }
            else {
                middlewares2.slice(1).forEach(function (mw) {
                    app.use(mw);
                });
            }
            break;
        default:
            return;
    }
}
exports.default = middleware;
