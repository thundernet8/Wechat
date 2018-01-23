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
var ServiceClient_1 = require("../../Core/ServiceClient");
var TextBroadcastMessage_1 = require("../../Core/BroadcastMessage/TextBroadcastMessage");
var VoiceBroadcastMessage_1 = require("../../Core/BroadcastMessage/VoiceBroadcastMessage");
var ImageBroadcastMessage_1 = require("../../Core/BroadcastMessage/ImageBroadcastMessage");
var CardBroadcastMessage_1 = require("../../Core/BroadcastMessage/CardBroadcastMessage");
var NewsBroadcastMessage_1 = require("../../Core/BroadcastMessage/NewsBroadcastMessage");
/**
 * Implement methods of Broadcast service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481187827_i0l21
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 根据OpenID列表群发【订阅号不可用，服务号认证后可用】
     * @param message
     * @param to user openId list
     */
    ServiceClient.prototype.sendToList = function (message, to) {
        var data = Object.assign({}, message.toPOJO(), to);
        return this.httpPost("/cgi-bin/message/mass/send", data);
    };
    /**
     * 根据标签进行群发【订阅号与服务号认证后均可用】
     * @param message
     */
    ServiceClient.prototype.send = function (message, tagId, toAll) {
        var filter = {
            is_to_all: !!toAll
        };
        if (tagId !== undefined && tagId !== null) {
            filter["tag_id"] = tagId;
        }
        var data = Object.assign({
            filter: filter
        }, message.toPOJO());
        return this.httpPost("/cgi-bin/message/mass/sendall", data);
    };
    /**
     * 群发消息预览【订阅号与服务号认证后均可用】
     * @param message
     */
    ServiceClient.prototype.preview = function (message, to, filter) {
        var data = message.toPOJO();
        if (!to && !filter) {
            filter = {
                is_to_all: true
            };
            data = Object.assign({}, data, { filter: filter });
        }
        else if (filter) {
            data = Object.assign({}, data, { filter: filter });
        }
        else {
            data = Object.assign({}, data, to);
        }
        return this.httpPost("/cgi-bin/message/mass/preview", data);
    };
    /**
     * 删除群发消息
     * @param msgId
     */
    ServiceClient.prototype.delete = function (msgId, articleIndex) {
        var data = {
            msg_id: msgId
        };
        if (articleIndex !== undefined) {
            data["article_idx"] = articleIndex;
        }
        return this.httpPost("/cgi-bin/message/mass/delete", data);
    };
    /**
     * 获取群发消息
     * @param msgId
     */
    ServiceClient.prototype.stats = function (msgId) {
        var data = {
            msg_id: msgId
        };
        return this.httpPost("/cgi-bin/message/mass/get", data);
    };
    ServiceClient.prototype.sendText = function (content, reception) {
        var message = new TextBroadcastMessage_1.default(content);
        return this.sendMessage(message, reception);
    };
    ServiceClient.prototype.sendVoice = function (mediaId, reception) {
        var message = new VoiceBroadcastMessage_1.default(mediaId);
        return this.sendMessage(message, reception);
    };
    ServiceClient.prototype.sendImage = function (mediaId, reception) {
        var message = new ImageBroadcastMessage_1.default(mediaId);
        return this.sendMessage(message, reception);
    };
    ServiceClient.prototype.sendVideo = function (mediaId, reception) {
        var message = new ImageBroadcastMessage_1.default(mediaId);
        return this.sendMessage(message, reception);
    };
    ServiceClient.prototype.sendCard = function (cardId, reception) {
        var message = new CardBroadcastMessage_1.default(cardId);
        return this.sendMessage(message, reception);
    };
    ServiceClient.prototype.sendNews = function (mediaId, reception) {
        var message = new NewsBroadcastMessage_1.default(mediaId);
        return this.sendMessage(message, reception);
    };
    ServiceClient.prototype.sendMessage = function (message, reception) {
        if (Array.isArray(reception)) {
            return this.sendToList(message, { touser: reception });
        }
        else if (typeof reception === "number") {
            return this.send(message, reception, false);
        }
        return this.send(message, null, true);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
