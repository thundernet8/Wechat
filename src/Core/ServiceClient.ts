import ServiceContainer from "./ServiceContainer";
import AccessToken from "./AccessToken";
import HttpClient from "./Http/HttpClient";
import { WX_API_BASE } from "./Constants";
import { addUrlQuery } from "./Utils/Url";

/**
 * Base Service Client
 */
export default class ServiceClient {
    private _app: ServiceContainer;
    private _accessToken: AccessToken;
    private _httpClient: HttpClient;

    public constructor(app: ServiceContainer, accessToken: AccessToken) {
        this._app = app;
        this._accessToken = accessToken;
        this._httpClient = new HttpClient({
            baseUrl: WX_API_BASE
        });
    }

    protected get app() {
        return this._app;
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
            return this._httpClient.httpGet<T>(endpoint, params);
        });
    }

    public httpPost<T>(endpoint: string, data: { [key: string]: any }): Promise<T> {
        return this.getAccessToken().then(accessToken => {
            endpoint = addUrlQuery(endpoint, { access_token: accessToken });
            return this._httpClient.httpPost<T>(endpoint, data);
        });
    }
}
