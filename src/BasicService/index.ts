import ServiceContainer from "../Core/ServiceContainer";
import MediaServiceProvider from "./Media/ServiceProvider";
import IAppConfig from "../Core/Interface/IAppConfig";

export default class Application extends ServiceContainer {
    public constructor(config: IAppConfig) {
        super(config);
        this.providers = [MediaServiceProvider];
        this.initServices();
    }
}
