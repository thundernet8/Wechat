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
var CodeServiceClient_1 = require("./CodeServiceClient");
var CoinServiceClient_1 = require("./CoinServiceClient");
var GeneralCardServiceClient_1 = require("./GeneralCardServiceClient");
var MeetingTicketServiceClient_1 = require("./MeetingTicketServiceClient");
var MemberCardServiceClient_1 = require("./MemberCardServiceClient");
var MovieTicketServiceClient_1 = require("./MovieTicketServiceClient");
var SubMerchantServiceClient_1 = require("./SubMerchantServiceClient");
var AccessToken_1 = require("../Auth/AccessToken");
/**
 * Card Service Provider
 */
var ServiceProvider = /** @class */ (function (_super) {
    __extends(ServiceProvider, _super);
    function ServiceProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServiceProvider.prototype.register = function (app) {
        _super.prototype._register.call(this, app);
        var accessToken = new AccessToken_1.default(app);
        app.setService("card", new ServiceClient_1.default(app, accessToken));
        app.setService("card.code", new CodeServiceClient_1.default(app, accessToken));
        app.setService("card.coin", new CoinServiceClient_1.default(app, accessToken));
        app.setService("card.general", new GeneralCardServiceClient_1.default(app, accessToken));
        app.setService("card.meeting", new MeetingTicketServiceClient_1.default(app, accessToken));
        app.setService("card.member", new MemberCardServiceClient_1.default(app, accessToken));
        app.setService("card.movie", new MovieTicketServiceClient_1.default(app, accessToken));
        app.setService("card.submerchant", new SubMerchantServiceClient_1.default(app, accessToken));
        return this;
    };
    return ServiceProvider;
}(ServiceProvider_1.default));
exports.default = ServiceProvider;
