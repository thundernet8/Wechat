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
var MediaType_1 = require("../../Core/Enum/MediaType");
/**
 * Implement methods of Media resources management service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 上传图片临时素材
     * @param filePath 图片路径
     * @return string media_id
     */
    ServiceClient.prototype.uploadImage = function (filePath) {
        return this.httpFormUpload("/cgi-bin/media/upload", filePath, MediaType_1.default.IMAGE).then(function (resp) { return resp.media_id; });
    };
    /**
     * 上传语音临时素材
     * @param filePath 语音文件路径
     * @return string media_id
     */
    ServiceClient.prototype.uploadVoice = function (filePath) {
        return this.httpFormUpload("/cgi-bin/media/upload", filePath, MediaType_1.default.VOICE).then(function (resp) { return resp.media_id; });
    };
    /**
     * 上传视频临时素材
     * @param filePath 视频路径
     * @return string media_id
     */
    ServiceClient.prototype.uploadVideo = function (filePath, title, description) {
        return this.httpFormUpload("/cgi-bin/media/upload", filePath, MediaType_1.default.VIDEO, {
            title: title,
            description: description
        }).then(function (resp) { return resp.media_id; });
    };
    /**
     * 上传缩略图临时素材
     * @param filePath 缩略图路径
     * @return string media_id
     */
    ServiceClient.prototype.uploadThumb = function (filePath) {
        return this.httpFormUpload("/cgi-bin/media/upload", filePath, MediaType_1.default.THUMB).then(function (resp) { return resp.media_id; });
    };
    // public uploadVideoForBroadcasting(path: string, title: string, description?: string) {
    //     // TODO
    // }
    // public createVideoForBroadcasting(mediaId: string, title: string, description?: string) {
    //     // TODO
    // }
    /**
     * 获取临时素材
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738727
     * @param mediaId
     */
    ServiceClient.prototype.getMediaStream = function (mediaId) {
        var _this = this;
        var params = {
            media_id: mediaId
        };
        return this.requestRaw("GET", "/cgi-bin/media/get", params).then(function (resp) {
            if (resp.headers["content-type"].indexOf("text") > -1) {
                return _this.httpGetDownload(resp.data.video_url);
            }
            return resp.data;
        });
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
