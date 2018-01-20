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
var ServiceProvider_1 = require("./AutoReply/ServiceProvider");
var ServiceProvider_2 = require("./Base/ServiceProvider");
var ServiceProvider_3 = require("./Comment/ServiceProvider");
var ServiceProvider_4 = require("./DataCube/ServiceProvider");
var ServiceProvider_5 = require("./Device/ServiceProvider");
var ServiceProvider_6 = require("./Server/ServiceProvider");
var ServiceProvider_7 = require("./Menu/ServiceProvider");
var ServiceProvider_8 = require("./POI/ServiceProvider");
var ServiceProvider_9 = require("./Semantic/ServiceProvider");
var ServiceProvider_10 = require("./TemplateMessage/ServiceProvider");
var ServiceProvider_11 = require("./User/ServiceProvider");
var ServiceProvider_12 = require("../BasicService/Jssdk/ServiceProvider");
var ServiceProvider_13 = require("../BasicService/Media/ServiceProvider");
var ServiceProvider_14 = require("../BasicService/QrCode/ServiceProvider");
var ServiceProvider_15 = require("../BasicService/Url/ServiceProvider");
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application(config) {
        var _this = _super.call(this, config) || this;
        _this.providers = [
            ServiceProvider_1.default,
            ServiceProvider_2.default,
            ServiceProvider_3.default,
            ServiceProvider_4.default,
            ServiceProvider_5.default,
            ServiceProvider_6.default,
            ServiceProvider_7.default,
            ServiceProvider_8.default,
            ServiceProvider_9.default,
            ServiceProvider_10.default,
            ServiceProvider_11.default,
            ServiceProvider_12.default,
            ServiceProvider_13.default,
            ServiceProvider_14.default,
            ServiceProvider_15.default
        ];
        _this.initServices();
        return _this;
    }
    return Application;
}(ServiceContainer_1.default));
exports.default = Application;
