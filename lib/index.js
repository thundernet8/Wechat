"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var OfficialAccount_1 = require("./OfficialAccount");
var OpenPlatform_1 = require("./OpenPlatform");
var Payment_1 = require("./Payment");
var Reply_1 = require("./Core/Reply");
var BroadcastMessage_1 = require("./Core/BroadcastMessage");
var Core = __assign({}, Reply_1.default, BroadcastMessage_1.default);
var Wechat = {
    OfficialAccount: OfficialAccount_1.default,
    OpenPlatform: OpenPlatform_1.default,
    Payment: Payment_1.default,
    Core: Core
};
exports.default = Wechat;
