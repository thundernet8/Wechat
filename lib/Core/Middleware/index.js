"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressAdapter_1 = require("./ExpressAdapter");
var KoaAdapter_1 = require("./KoaAdapter");
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
            ExpressAdapter_1.default(path, app, container, client);
            break;
        case "koa":
            KoaAdapter_1.default(path, app, container, client);
            break;
        default:
            return;
    }
}
exports.default = middleware;
