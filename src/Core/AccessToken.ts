import ICredentials from "./Interface/ICredentials";
import HttpClient from "./Http/HttpClient";
import IAccessTokenResp from "./Interface/IAccessTokenResp";
import ServiceContainer from "./ServiceContainer";

export default abstract class AccessToken {
    protected app: ServiceContainer;

    protected TOKEN_CACHE_KEY: string = "_wechat_one_access_token";

    protected extInfo: { [key: string]: string | number };

    protected originalToken: IAccessTokenResp;

    /**
     * Memory cache store(if no cacher provided)
     */
    protected static store: { [key: string]: any } = {};

    protected apiBase: string = "https://api.weixin.qq.com";

    constructor(container: ServiceContainer) {
        this.app = container;
    }

    protected getStore() {
        return AccessToken.store;
    }

    protected setStore(store) {
        AccessToken.store = store;
    }

    private setCache(data) {
        if (this.app.cacher) {
            this.app.cacher.setter(this.TOKEN_CACHE_KEY, JSON.stringify(data));
            return;
        }
        this.setStore(data);
    }

    private getCache() {
        if (this.app.cacher) {
            const cache = this.app.cacher.getter(this.TOKEN_CACHE_KEY);
            return cache ? JSON.parse(cache) : null;
        }
        return this.getStore();
    }

    public setToken(token: string, expires: number, originalToken: IAccessTokenResp) {
        const data = Object.assign({}, AccessToken.store, {
            token,
            expires: Date.now() + expires * 1000,
            originalToken
        });
        this.setCache(data);
    }

    public getToken(
        fresh: boolean = false,
        extInfo?: { [key: string]: string | number }
    ): Promise<IAccessTokenResp> {
        this.extInfo = extInfo as any;

        const data = this.getCache() || {};
        const { token, expires, originalToken } = data;
        if (!fresh && token && expires - Date.now() >= 10 * 60 * 1000) {
            this.originalToken = originalToken;
            return Promise.resolve(originalToken);
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
                this.setToken(resp.access_token, resp.expires_in, resp);
                this.originalToken = resp;
                return resp;
            }
            throw new Error(resp.errmsg);
        });
    }

    public getFreshToken(extInfo?: { [key: string]: string | number }) {
        return this.getToken(true, extInfo);
    }

    protected abstract getEndpoint(): string;

    protected abstract getCredentials(): ICredentials;
}
