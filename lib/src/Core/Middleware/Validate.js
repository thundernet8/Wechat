"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
/**
 * Validate whether this request is from wechat official server
 *
 * @param query
 * @param wxToken
 */
function validate(query, wxToken) {
    var signature = query.signature, timestamp = query.timestamp, nonce = query.nonce, echostr = query.echostr;
    var text = crypto
        .createHash("sha1")
        .update([wxToken, timestamp, nonce].sort().join(""))
        .digest("hex");
    if (text === signature) {
        return true;
    }
    return false;
}
exports.default = validate;
