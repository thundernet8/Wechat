import ServiceContainer from "../Core/ServiceContainer";
import ServerProvider from "./Server/ServiceProvider";
import IAppConfig from "../Core/Interface/IAppConfig";

export default class Application extends ServiceContainer {
    public constructor(config: IAppConfig) {
        super(config);
        this.providers = [ServerProvider];
        this.initServices();
    }
}
