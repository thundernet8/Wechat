import ICredentials from "./Interface/ICredentials";
import HttpClient from "./Http/HttpClient";
import { WX_API_BASE } from "./Constants";
import IAccessTokenResp from "./Interface/IAccessTokenResp";

export default abstract class AccessToken {
    /**
     * Memory cache store
     */
    protected static store: { [key: string]: any } = {};

    constructor() {}

    public setToken(token: string, expires: number) {
        AccessToken.store = Object.assign({}, AccessToken.store, {
            token,
            expires: Date.now() + expires * 1000
        });
    }

    public getToken(fresh: boolean = false): Promise<string> {
        const { token, expires } = AccessToken.store;
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
            baseUrl: WX_API_BASE
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
