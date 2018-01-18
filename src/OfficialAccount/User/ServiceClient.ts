import BaseServiceClient from "../../Core/ServiceClient";
import {
    ICreateTagResp,
    IGetTagsResp,
    IGetTagUserListResp,
    IGetUserTagsResp,
    IGetUserInfoResp,
    IGetUserListResp,
    IGetUserBlackListResp
} from "../Interface/IUser";

/**
 * Implement methods of User management service
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 创建用户标签
     * @param name 用户标签名
     */
    public createTag(name: string): Promise<ICreateTagResp> {
        return this.httpPost("/cgi-bin/tags/create", {
            tag: { name }
        });
    }

    /**
     * 获取用户标签列表
     */
    public getTags(): Promise<IGetTagsResp> {
        return this.httpGet("/cgi-bin/tags/get");
    }

    /**
     * 编辑用户标签
     * @param tagId 标签ID
     * @param tagName 标签名称
     */
    public updateTag(tagId: number, tagName: string): Promise<string> {
        return this.httpPost("/cgi-bin/tags/update", { tag: { id: tagId, name: tagName } });
    }

    /**
     * 删除用户标签
     * @param tagId 标签ID
     */
    public deleteTag(tagId: number): Promise<string> {
        return this.httpPost("/cgi-bin/tags/delete", { tag: { id: tagId } });
    }

    /**
     * 获取标签下粉丝列表
     * @param tagId 标签ID
     * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
     */
    public getTagUserList(tagId: number, nextOpenId?: string): Promise<IGetTagUserListResp> {
        return this.httpGet("/cgi-bin/user/tag/get", {
            tagid: tagId,
            next_openid: nextOpenId || ""
        });
    }

    /**
     * 批量为用户打标签
     * @param tagId 标签ID
     * @param userList 用户列表(OpenId)
     */
    public tagUsers(tagId: number, userList: string[]): Promise<string> {
        return this.httpPost("/cgi-bin/tags/members/batchtagging", {
            openid_list: userList,
            tagid: tagId
        });
    }

    /**
     * 批量为用户取消标签
     * @param tagId 标签ID
     * @param userList 用户列表(OpenId)
     */
    public untagUsers(tagId: number, userList: string[]): Promise<string> {
        return this.httpPost("/cgi-bin/tags/members/batchuntagging", {
            openid_list: userList,
            tagid: tagId
        });
    }

    /**
     * 获取用户身上的标签列表
     * @param userId 用户ID(OpenId)
     */
    public getUserTags(userId: string): Promise<IGetUserTagsResp> {
        return this.httpPost("/cgi-bin/tags/getidlist", {
            openid: userId
        });
    }

    /**
     * 设置用户备注名(该接口暂时开放给微信认证的服务号)
     * @param userId 用户ID(OpenId)
     * @param remark 备注名
     */
    public setRemark(userId: string, remark: string): Promise<string> {
        return this.httpPost("/cgi-bin/user/info/updateremark", {
            openid: userId,
            remark
        });
    }

    /**
     * 获取用户基本信息
     * @param userId 用户ID(OpenId)
     * @param lang 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
     */
    public getInfo(userId: string, lang: string = "zh_CN"): Promise<IGetUserInfoResp> {
        return this.httpGet("/cgi-bin/user/info", {
            openid: userId,
            lang
        });
    }

    /**
     * 批量获取用户基本信息
     * @param userList
     */
    public batchGetInfo(
        userList: { openid: string; lang: string }[]
    ): Promise<{ user_info_list: IGetUserInfoResp[] }> {
        return this.httpPost("/cgi-bin/user/info/batchget", {
            user_list: userList
        });
    }

    /**
     * 获取用户列表
     * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
     */
    public list(nextOpenId?: string): Promise<IGetUserListResp> {
        return this.httpGet("/cgi-bin/user/get", { next_openid: nextOpenId || "" });
    }

    /**
     * 获取黑名单用户列表
     * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
     */
    public blacklist(nextOpenId?: string): Promise<IGetUserBlackListResp> {
        return this.httpPost("/cgi-bin/tags/members/getblacklist", {
            begin_openid: nextOpenId || ""
        });
    }

    /**
     * 拉黑用户
     * @param userList 用户ID列表(OpenId)
     */
    public drop(userList: string[]): Promise<string> {
        return this.httpPost("/cgi-bin/tags/members/batchblacklist", {
            openid_list: userList
        });
    }

    /**
     *  取消拉黑用户
     * @param userList 用户ID列表(OpenId)
     */
    public recover(userList: string[]): Promise<string> {
        return this.httpPost("/cgi-bin/tags/members/batchunblacklist", {
            openid_list: userList
        });
    }
}
