import ServiceContainer from "./ServiceContainer";
import AccessToken from "./AccessToken";
import HttpClient from "./Http/HttpClient";
import { addUrlQuery } from "./Utils/Url";
import MediaType from "./Enum/MediaType";

/**
 * Base Service Client
 */
export default class ServiceClient {
    private _app: ServiceContainer;
    private _accessToken: AccessToken;
    private _httpClient: HttpClient;

    protected apiBase: string = "https://api.weixin.qq.com";

    public constructor(app: ServiceContainer, accessToken: AccessToken) {
        this._app = app;
        this._accessToken = accessToken;
    }

    protected get app() {
        return this._app;
    }

    private get httpClient() {
        if (!this._httpClient) {
            this._httpClient = new HttpClient({
                baseUrl: this.apiBase
            });
        }
        return this._httpClient;
    }

    private getAccessToken(): Promise<string> {
        return this._accessToken
            .getToken()
            .then(accessToken => {
                // TODO log
                return accessToken;
            })
            .catch(error => {
                // TODO log
                throw error;
            });
    }

    public httpGet<T>(endpoint: string, params?: { [key: string]: any }): Promise<T> {
        return this.getAccessToken().then(accessToken => {
            params = Object.assign({}, params || {}, { access_token: accessToken });
            return this.httpClient.httpGet<T>(endpoint, params);
        });
    }

    public httpPost<T>(endpoint: string, data?: { [key: string]: any }): Promise<T> {
        return this.getAccessToken().then(accessToken => {
            endpoint = addUrlQuery(endpoint, { access_token: accessToken });
            return this.httpClient.httpPost<T>(endpoint, data || {});
        });
    }

    public httpFormUpload<T>(
        endpoint: string,
        filePath: string,
        type: MediaType,
        data?: { [key: string]: any }
    ): Promise<T> {
        return this.getAccessToken().then(accessToken => {
            endpoint = addUrlQuery(endpoint, { access_token: accessToken, type });
            return this.httpClient.httpFormUpload<T>(endpoint, filePath, data);
        });
    }
}
