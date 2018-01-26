import ServiceContainer from "../index";
import HttpClient from "../../Core/Http/HttpClient";
import IAccessTokenResp from "../../Core/Interface/IAccessTokenResp";
import IOAuthUserInfo from "../../Core/Interface/IOAuthUserInfo";
import AbstractAccessToken from "../../Core/AccessToken";
import { IOAuthAccessTokenResp } from "../Interface/IAuth";

export default class OAuthAccessToken extends AbstractAccessToken {
    protected app: ServiceContainer;

    protected TOKEN_CACHE_KEY: string = "_wechat_one_oauth_access_token";

    /**
     * Memory cache store(if no cacher provided)
     */
    protected static store: { [key: string]: any } = {};

    protected apiBase: string = "https://api.weixin.qq.com";

    constructor(container: ServiceContainer) {
        super(container);
    }

    protected getStore() {
        return OAuthAccessToken.store;
    }

    protected setStore(store) {
        OAuthAccessToken.store = store;
    }

    public getEndpoint() {
        return "/sns/oauth2/access_token";
    }

    public getCredentials() {
        const { appid, secret } = this.app;
        return {
            appid,
            secret,
            code: this.extInfo ? this.extInfo.code : "",
            grant_type: "authorization_code"
        };
    }

    /**
     * 刷新access_token
     */
    public refreshToken(): Promise<IOAuthAccessTokenResp> {
        if (!this.originalToken || !this.originalToken.refresh_token) {
            throw new Error("refresh_token is not existed");
        }
        const { refresh_token } = this.originalToken;
        const params = {
            appid: this.app.appid,
            grant_type: "refresh_token",
            refresh_token
        };
        const httpClient = new HttpClient({ baseUrl: this.apiBase });

        return httpClient
            .httpGet<IAccessTokenResp>("/sns/oauth2/refresh_token", params)
            .then(resp => {
                if (resp.access_token && resp.expires_in) {
                    this.setToken(resp.access_token, resp.expires_in, resp);
                    this.originalToken = resp;
                    return resp as any;
                }
                throw new Error(resp.errmsg);
            });
    }

    /**
     * 检验授权凭证（access_token）是否有效
     * @param accessToken
     * @param openId
     */
    public verifyToken(accessToken: string, openId: string) {
        const params = {
            access_token: accessToken,
            openid: openId
        };
        const httpClient = new HttpClient({ baseUrl: this.apiBase });

        return httpClient
            .httpGet<string>("/sns/auth", params)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    /**
     * 拉取用户信息(需scope为 snsapi_userinfo)
     * @param lang 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
     */
    public getUserInfo(lang: string) {
        if (!this.originalToken || !this.originalToken.access_token) {
            throw new Error("access_token is not granted");
        }
        const { access_token, openid } = this.originalToken;
        const params = {
            access_token,
            openid,
            lang
        };

        const httpClient = new HttpClient({ baseUrl: this.apiBase });

        return httpClient.httpGet<IOAuthUserInfo>("/sns/userinfo", params);
    }
}
