import ServiceContainer from "../ServiceContainer";

export default interface IServiceProvider {
    register(app: ServiceContainer): IServiceProvider;
};

export interface IServiceProviderClass {
    new (): IServiceProvider;
}
