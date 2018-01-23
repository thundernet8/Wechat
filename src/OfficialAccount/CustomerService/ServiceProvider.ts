import IServiceProvider from "../../Core/Interface/IServiceProvider";
import ServiceContainer from "../../Core/ServiceContainer";
import BaseServiceProvider from "../../Core/ServiceProvider";
import Client from "./ServiceClient";
import SessionClient from "./SessionClient";
import AccessToken from "../Auth/AccessToken";

/**
 * CustomerService Service Provider
 */
export default class ServiceProvider extends BaseServiceProvider implements IServiceProvider {
    public register(app: ServiceContainer) {
        super._register(app);
        const accessToken = new AccessToken(app);
        app.setService("kf", new Client(app, accessToken));
        app.setService("kfsession", new SessionClient(app, accessToken));
        return this;
    }
}
