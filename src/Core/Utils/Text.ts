import { Buffer } from "buffer";

export function base64Encode(text: string) {
    return new Buffer(text).toString("base64");
}

export function base64Decode(text: string) {
    return new Buffer(text, "base64").toString("utf8");
}
