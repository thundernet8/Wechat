"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var route = require("koa-route");
var cors = require("@koa/cors");
var crypto = require("crypto");
var xmlParser = require("koa-xml-body");
var ConsoleWrapper_1 = require("./utils/ConsoleWrapper");
var env_1 = require("./env");
var app = new Koa();
app.use(xmlParser());
// x-response-time
app.use(function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var start, ms;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                start = Date.now();
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                ms = Date.now() - start;
                ctx.set("X-Response-Time", ms + "ms");
                return [2 /*return*/];
        }
    });
}); });
// cors
app.use(cors({ credentials: true }));
// 微信开发服务器验证
// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319
app.use(route.get("/", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var query, signature, timestamp, nonce, echostr, text;
    return __generator(this, function (_a) {
        try {
            query = ctx.query;
            signature = query.signature, timestamp = query.timestamp, nonce = query.nonce, echostr = query.echostr;
            text = crypto
                .createHash("sha1")
                .update([env_1.WX_TOKEN, timestamp, nonce].sort().join(""))
                .digest("hex");
            if (text === signature) {
                ctx.status = 200;
                ctx.body = echostr;
            }
            else {
                throw new Error("Verify failed");
            }
        }
        catch (err) {
            ctx.throw(err.message || err.toString(), 500);
        }
        return [2 /*return*/];
    });
}); }));
// 接收消息
app.use(route.post("/", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ConsoleWrapper_1.default.log(ctx.url);
        ConsoleWrapper_1.default.log(ctx.request.body.xml);
        ctx.status = 200;
        ctx.body = "";
        return [2 /*return*/];
    });
}); }));
app.on("error", function (err) {
    ConsoleWrapper_1.default.error(err);
});
app.listen(8801, "127.0.0.1", function () {
    ConsoleWrapper_1.default.log("Server Is Listening at http://127.0.0.1:8801");
});
process.on("exit", function (code) {
    ConsoleWrapper_1.default.log("Process about to exit with code: " + code);
});
