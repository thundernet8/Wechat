"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../envrc") });
exports.WX_TOKEN = process.env.WX_TOKEN || "";
