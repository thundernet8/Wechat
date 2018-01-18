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
var ServiceProvider_1 = require("./Base/ServiceProvider");
var ServiceProvider_2 = require("./Server/ServiceProvider");
var ServiceProvider_3 = require("./Menu/ServiceProvider");
var ServiceProvider_4 = require("./User/ServiceProvider");
var ServiceProvider_5 = require("../BasicService/Media/ServiceProvider");
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application(config) {
        var _this = _super.call(this, config) || this;
        _this.providers = [
            ServiceProvider_1.default,
            ServiceProvider_2.default,
            ServiceProvider_3.default,
            ServiceProvider_4.default,
            ServiceProvider_5.default
        ];
        _this.initServices();
        return _this;
    }
    return Application;
}(ServiceContainer_1.default));
exports.default = Application;