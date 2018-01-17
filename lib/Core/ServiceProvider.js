"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceProvider = /** @class */ (function () {
    function ServiceProvider() {
    }
    ServiceProvider.prototype._register = function (app) {
        this._app = app;
        return this;
    };
    Object.defineProperty(ServiceProvider.prototype, "app", {
        get: function () {
            return this._app;
        },
        enumerable: true,
        configurable: true
    });
    return ServiceProvider;
}());
exports.default = ServiceProvider;
