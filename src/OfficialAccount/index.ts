import ServiceContainer from "../Core/ServiceContainer";
import ServerProvider from "./Server/ServiceProvider";

export default class Application extends ServiceContainer {
    protected providers = [ServerProvider];
}
