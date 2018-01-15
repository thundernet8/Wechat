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
var ServiceContainer_1 = require("../Core/ServiceContainer");
var ServiceProvider_1 = require("./Server/ServiceProvider");
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application(config) {
        var _this = _super.call(this, config) || this;
        _this.providers = [ServiceProvider_1.default];
        _this.initServices();
        return _this;
    }
    return Application;
}(ServiceContainer_1.default));
exports.default = Application;
