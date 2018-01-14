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
Object.defineProperty(exports, "__esModule", { value: true });
var AccessToken_1 = require("../../Core/AccessToken");
var AccessToken = /** @class */ (function (_super) {
    __extends(AccessToken, _super);
    function AccessToken(container) {
        var _this = _super.call(this) || this;
        _this.app = container;
        return _this;
    }
    AccessToken.prototype.getEndpoint = function () {
        return "/cgi-bin/token";
    };
    AccessToken.prototype.getCredentials = function () {
        var _a = this.app, appid = _a.appid, secret = _a.secret;
        return {
            appid: appid,
            secret: secret,
            grant_type: "client_credential"
        };
    };
    return AccessToken;
}(AccessToken_1.default));
exports.default = AccessToken;
