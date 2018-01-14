import ServiceContainer from "../ServiceContainer";
import Response from "../Http/Response";

export default interface IServiceProvider {
    register(app: ServiceContainer): IServiceProvider;
    response(): Promise<Response>;
};

export interface IServiceProviderClass {
    new (): IServiceProvider;
}
