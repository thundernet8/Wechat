import expressMiddleware from "./ExpressAdapter";
import koaMiddleware from "./KoaAdapter";
import ServiceContainer from "../ServiceContainer";
import ServiceClient from "../ServiceClient";

function noop() {}

export default function middleware(container: ServiceContainer, client: ServiceClient) {
    switch (container.server) {
        case "express":
            return expressMiddleware(container, client);
        case "koa":
            return koaMiddleware(container, client);
        default:
            return noop;
    }
}
