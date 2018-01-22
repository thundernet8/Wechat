import axios from "axios";
import * as https from "https";
import * as fs from "fs";
import * as path from "path";
import * as formstream from "formstream";
import { IHttpClientOptions, IHttpMethod } from "../Interface/IHttpClient";
import { Stream } from "stream";

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

    private _requestRaw(
        method: IHttpMethod,
        endpoint: string,
        params: { [key: string]: any } | string | null,
        headers?: { [key: string]: string | number }
    ): Promise<any> {
        if (!endpoint.startsWith("/")) {
            endpoint = "/" + endpoint;
        }
        return this.ax.request({
            url: endpoint,
            method,
            headers: headers || {},
            params: method.toUpperCase() === "GET" ? params : null,
            data: method.toUpperCase() !== "GET" ? params : null,
            validateStatus: function(status) {
                return status >= 200 && status < 500;
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
        return this._requestRaw(method, endpoint, params, headers).then(resp => {
            // debug
            console.log(`request ${endpoint} resp:`, resp.data);
            if (resp.status >= 400) {
                throw new Error(resp.data);
            }
            if (resp.data) {
                const { errcode, errmsg } = resp.data;
                if (errcode) {
                    throw new Error(errmsg || `Error code ${errcode}`);
                } else if (errcode === 0 && Object.keys(resp.data).length === 2) {
                    return errmsg as T;
                }
            }
            return resp.data as T;
        });
    }

    public requestRaw(
        method: IHttpMethod,
        endpoint: string,
        params: { [key: string]: any } | string | null,
        headers?: { [key: string]: string | number }
    ) {
        return this._requestRaw(method, endpoint, params, headers);
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

        try {
            const stat = fs.statSync(filePath);
            data = data || {};
            const form = formstream();
            form.file("media", filePath, path.basename(filePath), stat.size);
            Object.keys(data).forEach(key => {
                form.field(key, data![key]);
            });

            return this._request("POST", endpoint, form, form.headers());
        } catch (error) {
            return Promise.reject(error.message || error.toString());
        }
    }

    public httpGetDownload(endpoint: string, params?: { [key: string]: any }, savePath?: string) {
        return this.httpDownload("GET", endpoint, params, savePath);
    }

    public httpPostDownload(endpoint: string, data?: { [key: string]: any }, savePath?: string) {
        return this.httpDownload("POST", endpoint, data, savePath);
    }

    private httpDownload(
        method: IHttpMethod,
        endpoint: string,
        data?: { [key: string]: any },
        savePath?: string
    ): Promise<Stream | void> {
        const headers = {
            responseType: "stream"
        };
        return this._request<{ data: Stream }>(method, endpoint, data || {}, headers).then(resp => {
            if (savePath) {
                resp.data.pipe(fs.createWriteStream(savePath));
                return;
            } else {
                return resp.data;
            }
        });
    }
}
