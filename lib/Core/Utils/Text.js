"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
function base64Encode(text) {
    return new buffer_1.Buffer(text).toString("base64");
}
exports.base64Encode = base64Encode;
function base64Decode(text) {
    return new buffer_1.Buffer(text, "base64").toString("utf8");
}
exports.base64Decode = base64Decode;
