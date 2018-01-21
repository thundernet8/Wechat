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
var BroadcastMessage_1 = require("./BroadcastMessage");
var BroadcastMessageType_1 = require("../Enum/BroadcastMessageType");
var CardBroadcastMessage = /** @class */ (function (_super) {
    __extends(CardBroadcastMessage, _super);
    function CardBroadcastMessage(cardId) {
        var _this = _super.call(this, BroadcastMessageType_1.default.WX_CARD) || this;
        _this._cardId = cardId;
        return _this;
    }
    CardBroadcastMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            wxcard: {
                card_id: this._cardId
            }
        });
    };
    return CardBroadcastMessage;
}(BroadcastMessage_1.default));
exports.default = CardBroadcastMessage;
