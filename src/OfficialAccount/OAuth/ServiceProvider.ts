import IServiceProvider from "../../Core/Interface/IServiceProvider";
import ServiceContainer from "../../Core/ServiceContainer";
import BaseServiceProvider from "../../Core/ServiceProvider";
import Client from "./ServiceClient";
import AccessToken from "../Auth/AccessToken";

/**
 * OAuth Service Provider
 */
export default class ServiceProvider extends BaseServiceProvider implements IServiceProvider {
    public register(app: ServiceContainer) {
        super._register(app);
        app.setService("oauth", new Client(app, new AccessToken(app)));
        return this;
    }
}
