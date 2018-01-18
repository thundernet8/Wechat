import IServiceProvider from "../../Core/Interface/IServiceProvider";
import BaseServiceProvider from "../../Core/ServiceProvider";
import ServiceContainer from "../../Core/ServiceContainer";
import Client from "./ServiceClient";
import AccessToken from "../Auth/AccessToken";

/**
 * Msg Server Service Provider
 */
export default class ServiceProvider extends BaseServiceProvider implements IServiceProvider {
    public register(app: ServiceContainer) {
        super._register(app);
        app.setService("server", new Client(app, new AccessToken(app)));
        return this;
    }
}
