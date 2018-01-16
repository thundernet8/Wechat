"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextMessage_1 = require("./TextMessage");
var ImageMessage_1 = require("./ImageMessage");
var VoiceMessage_1 = require("./VoiceMessage");
var VideoMessage_1 = require("./VideoMessage");
var ShortVideoMessage_1 = require("./ShortVideoMessage");
var LocationMessage_1 = require("./LocationMessage");
var LinkMessage_1 = require("./LinkMessage");
var UnknownMessage_1 = require("./UnknownMessage");
exports.default = {
    TextMessage: TextMessage_1.default,
    ImageMessage: ImageMessage_1.default,
    VoiceMessage: VoiceMessage_1.default,
    VideoMessage: VideoMessage_1.default,
    ShortVideoMessage: ShortVideoMessage_1.default,
    LocationMessage: LocationMessage_1.default,
    LinkMessage: LinkMessage_1.default,
    UnknownMessage: UnknownMessage_1.default
};
