"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Response = /** @class */ (function () {
    function Response() {
        this._status = 200;
        this._contentType = "application/xml";
        this._body = "";
    }
    Object.defineProperty(Response.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (status) {
            this._status = status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "contentType", {
        get: function () {
            return this._contentType;
        },
        set: function (contentType) {
            this._contentType = contentType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Response.prototype, "body", {
        get: function () {
            return this._body;
        },
        set: function (body) {
            this._body = body;
        },
        enumerable: true,
        configurable: true
    });
    return Response;
}());
exports.default = Response;
