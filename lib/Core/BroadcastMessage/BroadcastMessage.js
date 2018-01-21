"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BroadcastMessageType_1 = require("../Enum/BroadcastMessageType");
var BroadcastMessage = /** @class */ (function () {
    function BroadcastMessage(type) {
        this._type = BroadcastMessageType_1.default.TEXT;
        this._type = type;
    }
    Object.defineProperty(BroadcastMessage.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    BroadcastMessage.prototype.toPOJO = function () {
        return {
            msgtype: this._type
        };
    };
    return BroadcastMessage;
}());
exports.default = BroadcastMessage;
