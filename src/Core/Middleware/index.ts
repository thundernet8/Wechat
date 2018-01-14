import expressMiddleware from "./ExpressAdapter";
import koaMiddleware from "./KoaAdapter";
import ServiceContainer from "../ServiceContainer";
import IServiceProvider from "../Interface/IServiceProvider";

function noop() {}

export default function middleware(container: ServiceContainer, service: IServiceProvider) {
    switch (container.server) {
        case "koa":
            return expressMiddleware(container, service);
        case "express":
            return koaMiddleware(container, service);
        default:
            return noop;
    }
}
