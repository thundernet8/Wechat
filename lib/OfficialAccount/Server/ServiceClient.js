"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceClient_1 = require("../../Core/ServiceClient");
var moment = require("moment");
var Middleware_1 = require("../../Core/Middleware");
var Response_1 = require("../../Core/Http/Response");
var Message_1 = require("../../Core/Message/Message");
var TextMessage_1 = require("../../Core/Message/TextMessage");
var MessageHelper_1 = require("../../Core/Message/MessageHelper");
/**
 * Implement methods of Server service
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.msgHandlers = [];
        return _this;
    }
    /**
     * Inject necessary middlewares to Express/Koa app
     * @param app Express/Koa app
     * @param path route path
     */
    ServiceClient.prototype.connect = function (app, path) {
        Middleware_1.default(path || null, app, this.app, this);
    };
    ServiceClient.prototype.response = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, body, originMsg, respMsg, i, handler, result, reply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resp = new Response_1.default();
                        body = this.app.request.body;
                        if (!body || !body.xml) {
                            resp.body = "";
                            return [2 /*return*/, resp];
                        }
                        originMsg = MessageHelper_1.default.fromXML(this.app.server === "koa" ? body.xml : body);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.msgHandlers.length)) return [3 /*break*/, 4];
                        handler = this.msgHandlers[i];
                        return [4 /*yield*/, handler(originMsg)];
                    case 2:
                        result = _a.sent();
                        if (result === false) {
                            return [3 /*break*/, 4];
                        }
                        respMsg = result;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (respMsg) {
                            reply = void 0;
                            if (respMsg instanceof Message_1.default) {
                                reply = respMsg;
                            }
                            else {
                                reply = new TextMessage_1.default(respMsg);
                            }
                            reply.createTime = Math.ceil(moment.now().valueOf() / 1000);
                            reply.from = originMsg.to;
                            reply.to = originMsg.from;
                            // Debug
                            // TODO remove
                            console.log(reply.toXML());
                            resp.body = reply.toXML();
                        }
                        else {
                            resp.body = "";
                        }
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    /**
     * handle message from wechat server
     */
    ServiceClient.prototype.handle = function (handler) {
        this.msgHandlers.push(handler);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
