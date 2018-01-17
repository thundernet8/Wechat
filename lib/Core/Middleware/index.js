"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressAdapter_1 = require("./ExpressAdapter");
var KoaAdapter_1 = require("./KoaAdapter");
function noop() { }
function middleware(container, client) {
    switch (container.server) {
        case "express":
            return ExpressAdapter_1.default(container, client);
        case "koa":
            return KoaAdapter_1.default(container, client);
        default:
            return noop;
    }
}
exports.default = middleware;
