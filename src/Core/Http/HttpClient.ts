import axios from "axios";
import * as https from "https";
import * as fs from "fs";
import * as FormData from "form-data";
import * as qs from "querystring";
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
        params: { [key: string]: any } | string | null,
        headers?: { [key: string]: string | number }
    ): Promise<T> {
        if (!endpoint.startsWith("/")) {
            endpoint = "/" + endpoint;
        }
        return this.ax
            .request({
                url: endpoint,
                method,
                headers: headers || {},
                params: method.toUpperCase() === "GET" ? params : null,
                data: method.toUpperCase() !== "GET" ? params : null,
                validateStatus: function(status) {
                    return status >= 200 && status < 500;
                }
            })
            .then(resp => {
                // debug
                console.log(`request ${endpoint} resp:`, resp);
                if (resp.status >= 400) {
                    throw new Error(resp.data);
                }
                if (resp.data) {
                    const { errcode, errmsg } = resp.data;
                    if (errcode) {
                        throw new Error(errmsg);
                    }
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

    public httpFormUpload<T>(
        endpoint: string,
        filePath: string,
        data?: { [key: string]: any }
    ): Promise<T> {
        if (!fs.existsSync(filePath)) {
            return Promise.reject(`File on path: ${filePath} is not exist`);
        }

        const rs = fs.createReadStream(filePath);
        rs.on("error", error => {
            return Promise.reject(error.message || error.toString());
        });
        data = data || {};
        const formData = new FormData();
        formData.append("media", rs);
        Object.keys(data).forEach(key => {
            formData.append(key, data![key]);
        });

        return this._request("POST", endpoint, qs.stringify(formData), formData.getHeaders());
    }
}
