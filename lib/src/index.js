"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicService_1 = require("./BasicService");
var OfficialAccount_1 = require("./OfficialAccount");
var OpenPlatform_1 = require("./OpenPlatform");
var Payment_1 = require("./Payment");
var Wechat = {
    BasicService: BasicService_1.default,
    OfficialAccount: OfficialAccount_1.default,
    OpenPlatform: OpenPlatform_1.default,
    Payment: Payment_1.default
};
exports.default = Wechat;
