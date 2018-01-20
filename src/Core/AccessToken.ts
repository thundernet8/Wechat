import ICredentials from "./Interface/ICredentials";
import HttpClient from "./Http/HttpClient";
import IAccessTokenResp from "./Interface/IAccessTokenResp";
import ServiceContainer from "./ServiceContainer";

export default abstract class AccessToken {
    protected app: ServiceContainer;

    private TOKEN_CACHE_KEY: string = "_wechat_one_access_token";

    /**
     * Memory cache store(if no cacher provided)
     */
    protected static store: { [key: string]: any } = {};

    protected apiBase: string = "https://api.weixin.qq.com";

    constructor(container: ServiceContainer) {
        this.app = container;
    }

    private setCache(data) {
        if (this.app.cacher) {
            this.app.cacher.setter(this.TOKEN_CACHE_KEY, JSON.stringify(data));
            return;
        }
        AccessToken.store = data;
    }

    private getCache() {
        if (this.app.cacher) {
            const cache = this.app.cacher.getter(this.TOKEN_CACHE_KEY);
            return cache ? JSON.parse(cache) : null;
        }
        return AccessToken.store;
    }

    public setToken(token: string, expires: number) {
        const data = Object.assign({}, AccessToken.store, {
            token,
            expires: Date.now() + expires * 1000
        });
        this.setCache(data);
    }

    public getToken(fresh: boolean = false): Promise<string> {
        const data = this.getCache() || {};
        const { token, expires } = data;
        if (!fresh && token && expires - Date.now() >= 10 * 60 * 1000) {
            return Promise.resolve(token);
        }

        const endpoint = this.getEndpoint();
        if (!endpoint) {
            throw new Error("Access token request should have a endpoint");
        }

        const credentials = this.getCredentials();
        if (!credentials || !credentials.appid || !credentials.secret) {
            throw new Error("Access token request requires APPID and APPSECRET information");
        }

        const httpClient = new HttpClient({
            baseUrl: this.apiBase
        });

        return httpClient.httpGet<IAccessTokenResp>(endpoint, credentials).then(resp => {
            if (resp.access_token && resp.expires_in) {
                console.log(`${new Date().toISOString()}: Get access token ${resp.access_token}`);
                this.setToken(resp.access_token, resp.expires_in);
                return resp.access_token;
            }
            throw new Error(resp.errmsg);
        });
    }

    public getFreshToken() {
        return this.getToken(true);
    }

    protected abstract getEndpoint(): string;

    protected abstract getCredentials(): ICredentials;
}
