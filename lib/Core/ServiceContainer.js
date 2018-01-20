"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceContainer = /** @class */ (function () {
    function ServiceContainer(config) {
        this.serviceClients = {};
        this.providers = [];
        this.appConfig = config;
    }
    Object.defineProperty(ServiceContainer.prototype, "appid", {
        get: function () {
            return this.appConfig.appid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceContainer.prototype, "secret", {
        get: function () {
            return this.appConfig.secret;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceContainer.prototype, "token", {
        /**
         * Token for your wechat server, not access_token
         */
        get: function () {
            return this.appConfig.token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceContainer.prototype, "server", {
        /**
         * Server framework type(koa/express)
         */
        get: function () {
            return this.appConfig.server;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServiceContainer.prototype, "cacher", {
        /**
         * Cache data provider
         */
        get: function () {
            return this.appConfig.cacher;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Query other config
     * @param key
     */
    ServiceContainer.prototype.getConfig = function (key) {
        if (this.appConfig[key]) {
            return this.appConfig[key];
        }
        return null;
    };
    ServiceContainer.prototype.initServices = function () {
        var _this = this;
        this.providers.forEach(function (provider) {
            new provider().register(_this);
        });
    };
    ServiceContainer.prototype.setService = function (name, serviceClient) {
        this.serviceClients[name] = serviceClient;
    };
    ServiceContainer.prototype.getService = function (name) {
        if (this.serviceClients[name]) {
            return this.serviceClients[name];
        }
        throw new Error("Service {" + name + "} is not existed or registered");
    };
    Object.defineProperty(ServiceContainer.prototype, "request", {
        /**
         * Http request from wechat server
         */
        get: function () {
            return this._request;
        },
        set: function (request) {
            this._request = request;
        },
        enumerable: true,
        configurable: true
    });
    return ServiceContainer;
}());
exports.default = ServiceContainer;
