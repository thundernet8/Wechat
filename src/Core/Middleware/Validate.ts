import * as crypto from "crypto";

/**
 * Validate whether this request is from wechat official server
 *
 * @param query
 * @param wxToken
 */
export default function validate(query, wxToken: string) {
    const { signature, timestamp, nonce, echostr } = query;
    const text = crypto
        .createHash("sha1")
        .update([wxToken, timestamp, nonce].sort().join(""))
        .digest("hex");

    if (text === signature) {
        return true;
    }
    return false;
}
