import ServiceContainer from "../Core/ServiceContainer";
import BaseServiceProvider from "./Base/ServiceProvider";
import ServerServiceProvider from "./Server/ServiceProvider";
import MenuServiceProvider from "./Menu/ServiceProvider";
import UserServiceProvider from "./Menu/ServiceProvider";
import MediaServiceProvider from "../BasicService/Media/ServiceProvider";
import IAppConfig from "../Core/Interface/IAppConfig";

export default class Application extends ServiceContainer {
    public constructor(config: IAppConfig) {
        super(config);
        this.providers = [
            BaseServiceProvider,
            ServerServiceProvider,
            MenuServiceProvider,
            UserServiceProvider,
            MediaServiceProvider
        ];
        this.initServices();
    }
}
