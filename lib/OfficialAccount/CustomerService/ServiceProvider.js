"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceProvider_1 = require("../../Core/ServiceProvider");
var ServiceClient_1 = require("./ServiceClient");
var AccessToken_1 = require("../Auth/AccessToken");
/**
 * CustomerService Service Provider
 */
var ServiceProvider = /** @class */ (function (_super) {
    __extends(ServiceProvider, _super);
    function ServiceProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServiceProvider.prototype.register = function (app) {
        _super.prototype._register.call(this, app);
        app.setService("customerservice", new ServiceClient_1.default(app, new AccessToken_1.default(app)));
        return this;
    };
    return ServiceProvider;
}(ServiceProvider_1.default));
exports.default = ServiceProvider;
