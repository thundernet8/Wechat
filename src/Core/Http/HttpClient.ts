import axios from "axios";
import https from "https";
import { IHttpClientOptions, IHttpMethod } from "../Interface/IHttpClient";

export default class HttpClient {
    private options: IHttpClientOptions;

    /**
     * axios instance
     */
    private ax;

    public constructor(options: IHttpClientOptions) {
        this.options = options;

        const { baseUrl, timeout } = options;
        this.ax = axios.create({
            baseURL: baseUrl,
            timeout: timeout || 60000,
            withCredentials: false,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            headers: {
                Accept: "*/*"
            }
        });
    }

    private _request<T>(
        method: IHttpMethod,
        endpoint: string,
        params: { [key: string]: any } | null
    ): Promise<T> {
        if (!endpoint.startsWith("/")) {
            endpoint = "/" + endpoint;
        }
        return this.ax
            .request({
                url: endpoint,
                method,
                params: method.toUpperCase() === "GET" ? params : null,
                data: method.toUpperCase() !== "GET" ? params : null,
                validateStatus: function(status) {
                    return status >= 200 && status < 500;
                }
            })
            .then(resp => {
                if (resp.status >= 400) {
                    throw new Error(resp.data);
                }
                return resp.data as T;
            });
    }

    public httpGet<T>(endpoint: string, params: { [key: string]: any } | null): Promise<T> {
        return this._request("GET", endpoint, params);
    }

    public httpPost<T>(endpoint: string, params: { [key: string]: any } | null): Promise<T> {
        return this._request("POST", endpoint, params);
    }
}
