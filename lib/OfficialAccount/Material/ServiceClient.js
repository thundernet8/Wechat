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
 * Implement methods of Material management service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1494572718_WzHIY
 */
var ServiceClient = /** @class */ (function (_super) {
    __extends(ServiceClient, _super);
    function ServiceClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Allowed media types
         */
        _this.allowTypes = [
            MediaType_1.default.IMAGE,
            MediaType_1.default.VOICE,
            MediaType_1.default.VIDEO,
            MediaType_1.default.THUMB,
            MediaType_1.default.NEWS_IMAGE
        ];
        return _this;
    }
    /**
     * 上传图片永久素材
     * @param path
     */
    ServiceClient.prototype.uploadImage = function (path) {
        return this.upload(MediaType_1.default.IMAGE, path);
    };
    /**
     * 上传语音永久素材
     * @param path
     */
    ServiceClient.prototype.uploadVoice = function (path) {
        return this.upload(MediaType_1.default.VOICE, path);
    };
    /**
     * 上传缩略图永久素材
     * @param path
     */
    ServiceClient.prototype.uploadThumb = function (path) {
        return this.upload(MediaType_1.default.THUMB, path);
    };
    /**
     * 上传视频永久素材
     * @param path
     * @param title
     * @param description
     */
    ServiceClient.prototype.uploadVideo = function (path, title, description) {
        var data = {
            description: JSON.stringify({
                title: title || "",
                introduction: description || ""
            })
        };
        return this.upload(MediaType_1.default.VIDEO, path, data);
    };
    /**
     * 新增永久图文消息素材
     * @param articles
     */
    ServiceClient.prototype.uploadArticle = function (articles) {
        var data = {
            articles: articles
        };
        return this.httpPost("/cgi-bin/material/add_news", data);
    };
    /**
     * 修改永久图文素材
     * @param mediaId
     * @param article
     * @param index
     */
    ServiceClient.prototype.updateArticle = function (mediaId, article, index) {
        if (index === void 0) { index = 0; }
        var data = {
            media_id: mediaId,
            index: index,
            articles: article
        };
        return this.httpPost("/cgi-bin/material/update_news", data);
    };
    /**
     * 上传图文消息内的图片获取URL
     * @param path
     */
    ServiceClient.prototype.uploadArticleImage = function (path) {
        return this.upload(MediaType_1.default.NEWS_IMAGE, path);
    };
    /**
     * 获取永久素材
     * @param mediaId
     */
    ServiceClient.prototype.get = function (mediaId) {
        var data = {
            media_id: mediaId
        };
        return this.requestRaw("POST", "/cgi-bin/material/get_material", data).then(function (resp) { return resp.data; });
    };
    /**
     * 删除永久素材
     * @param mediaId
     */
    ServiceClient.prototype.delete = function (mediaId) {
        var data = {
            media_id: mediaId
        };
        return this.httpPost("/cgi-bin/material/del_material", data);
    };
    /**
     * 获取素材列表
     * @param type
     * @param offset
     * @param count
     */
    ServiceClient.prototype.list = function (type, offset, count) {
        if (offset === void 0) { offset = 0; }
        if (count === void 0) { count = 20; }
        var data = {
            type: type,
            offset: offset,
            count: Math.min(20, count)
        };
        return this.httpPost("/cgi-bin/material/batchget_material", data);
    };
    /**
     * 获取素材总数
     */
    ServiceClient.prototype.stats = function () {
        return this.httpGet("/cgi-bin/material/get_materialcount");
    };
    /**
     * Upload media
     * @param type
     * @param filePath
     * @param data
     */
    ServiceClient.prototype.upload = function (type, filePath, data) {
        if (!this.allowTypes.includes(type)) {
            throw new Error("Invalid media type " + type);
        }
        var endpoint = type === "news_image" ? "/cgi-bin/media/uploadimg" : "/cgi-bin/material/add_material";
        return this.httpFormUpload(endpoint, filePath, type, data);
    };
    return ServiceClient;
}(ServiceClient_1.default));
exports.default = ServiceClient;
