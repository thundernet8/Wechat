"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var ConsoleWrapper = {
    log: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(console, ["[" + moment().format("YYYY-MM-DD HH:mm:ss") + "]:"].concat(args));
    },
    error: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("[" + moment().format("YYYY-MM-DD HH:mm:ss") + "]:");
        console.error.apply(console, args);
    }
};
exports.default = ConsoleWrapper;
