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
var ServiceClient_1 = require("../../Core/ServiceClient");
var AccessToken_1 = require("./AccessToken");
/**
 * Implement methods of OAuth service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * OAuth第一步获取code的URI
     * @param redirect 授权后重定向的回调链接地址
     * @param scope 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
     * @param state 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
     */
    ServiceClient.prototype.grantCodeUri = function (redirect, scope, state) {
        return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.app.appid + "&redirect_uri=" + encodeURIComponent(redirect) + "&response_type=code&scope=" + scope + "&state=" + (state || "") + "#wechat_redirect";
    };
    /**
     * OAuth第二步获取access_token的URI
     * @param code OAuth第一步获取的code参数
     */
    ServiceClient.prototype.grantTokenUri = function (code) {
        return "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + this.app.appid + "&secret=" + this.app.secret + "&code=" + code + "&grant_type=authorization_code";
    };
    /**
     * 通过code换取access_token
     * @param code OAuth第一步获取的code参数
     */
    ServiceClient.prototype.grantToken = function (code) {
        if (!this.oauthToken) {
            this.oauthToken = new AccessToken_1.default(this.app);
        }
        return this.oauthToken.getToken(false, { code: code }).then(function (resp) {
            return resp;
        });
    };
    /**
     * 拉取用户信息(需scope为 snsapi_userinfo，且调用grantToken成功之后调用)
     * @param accessToken
     * @param lang 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
     */
    ServiceClient.prototype.grantUserInfo = function (lang) {
        if (lang === void 0) { lang = "zh_CN"; }
        if (!this.oauthToken) {
            this.oauthToken = new AccessToken_1.default(this.app);
        }
        return this.oauthToken.getUserInfo(lang);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
