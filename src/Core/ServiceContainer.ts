import { IncomingMessage } from "http";
import IAppConfig from "./Interface/IAppConfig";
import IServiceProvider, { IServiceProviderClass } from "./Interface/IServiceProvider";
import ServiceClient from "./ServiceClient";

export default abstract class ServiceContainer {
    private appConfig: IAppConfig;
    private serviceClients: { [key: string]: ServiceClient } = {};
    private _request: IncomingMessage & { body: any };
    protected providers: IServiceProviderClass[] = [];

    public constructor(config: IAppConfig) {
        this.appConfig = config;
    }

    public get appid() {
        return this.appConfig.appid;
    }

    public get secret() {
        return this.appConfig.secret;
    }

    /**
     * Token for your wechat server, not access_token
     */
    public get token() {
        return this.appConfig.token;
    }

    /**
     * Server framework type(koa/express)
     */
    public get server() {
        return this.appConfig.server;
    }

    protected initServices() {
        this.providers.forEach(provider => {
            new provider().register(this);
        });
    }

    public setService(name: string, serviceClient: ServiceClient) {
        this.serviceClients[name] = serviceClient;
    }

    public getService(name: string) {
        if (this.serviceClients[name]) {
            return this.serviceClients[name];
        }
        throw new Error(`Service {${name}} is not existed or registered`);
    }

    public set request(request: IncomingMessage & { body: any }) {
        this._request = request;
    }

    /**
     * Http request from wechat server
     */
    public get request() {
        return this._request;
    }
}
