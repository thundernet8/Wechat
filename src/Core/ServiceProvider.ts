import ServiceContainer from "./ServiceContainer";

export default abstract class ServiceProvider {
    private _app: ServiceContainer;

    public _register(app: ServiceContainer) {
        this._app = app;
        return this;
    }

    protected get app() {
        return this._app;
    }
}
