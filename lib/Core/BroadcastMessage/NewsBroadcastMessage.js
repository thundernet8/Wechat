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
var NewsBroadcastMessage = /** @class */ (function (_super) {
    __extends(NewsBroadcastMessage, _super);
    /**
     * @param mediaId
     * @param ignoreReprint 图文消息被判定为转载时，是否继续群发。 1为继续群发（转载），0为停止群发。 该参数默认为0
     */
    function NewsBroadcastMessage(mediaId, ignoreReprint) {
        if (ignoreReprint === void 0) { ignoreReprint = false; }
        var _this = _super.call(this, BroadcastMessageType_1.default.MP_NEWS) || this;
        _this._mediaId = mediaId;
        _this._ignoreReprint = !!ignoreReprint;
        return _this;
    }
    NewsBroadcastMessage.prototype.toPOJO = function () {
        return Object.assign({}, _super.prototype.toPOJO.call(this), {
            mpnews: {
                media_id: this._mediaId
            },
            send_ignore_reprint: this._ignoreReprint ? 1 : 0
        });
    };
    return NewsBroadcastMessage;
}(BroadcastMessage_1.default));
exports.default = NewsBroadcastMessage;
