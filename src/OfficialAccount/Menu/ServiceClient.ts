import BaseServiceClient from "../../Core/ServiceClient";
import IMenu, { IMenuButton, IConditionalMenu } from "../Interface/IMenu";

/**
 * Implement methods of Menu management service
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 查询自定义菜单的结构(包含默认菜单和个性化菜单)
     */
    public list(): Promise<IMenu> {
        return this.httpGet("/cgi-bin/menu/get");
    }

    /**
     * 创建自定义菜单
     * @param buttons 菜单列表
     */
    public create(buttons: IMenuButton[]): Promise<string> {
        return this.httpPost("/cgi-bin/menu/create", { button: buttons });
    }

    /**
     * 删除自定义菜单(会同时删除个性化菜单)
     */
    public delete(): Promise<string> {
        return this.httpGet("/cgi-bin/menu/delete");
    }

    /**
     * 创建个性化菜单
     * @param menu 个性化菜单
     * @returns menuid
     */
    public createConditional(menu: IConditionalMenu): Promise<string> {
        return this.httpPost<{ menuid: string }>("/cgi-bin/menu/addconditional", menu).then(
            resp => resp.menuid
        );
    }

    /**
     * 删除个性化菜单
     * @param menuId 菜单ID
     */
    public deleteConditional(menuId: string): Promise<string> {
        return this.httpPost("/cgi-bin/menu/delconditional", { menuid: menuId });
    }

    /**
     * 测试个性化菜单匹配结果
     * @param userId 用户ID, 可以是粉丝的OpenID，也可以是粉丝的微信号
     */
    public tryMatch(userId: string): Promise<{ button: IMenuButton[] }> {
        return this.httpPost("/cgi-bin/menu/trymatch", { user_id: userId });
    }
}
