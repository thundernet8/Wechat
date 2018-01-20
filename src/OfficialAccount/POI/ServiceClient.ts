import BaseServiceClient from "../../Core/ServiceClient";
import {
    IGetPOIResp,
    IGetPOIListResp,
    ICreatePOIReq,
    ICreatePOIResp,
    IUpdatePOIReq,
    IGetPOICategoryListResp
} from "../Interface/IPOI";

/**
 * Implement methods of POI service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444378120
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 查询门店信息
     * @param id
     */
    public getPOI(id: number) {
        const data = {
            poi_id: id.toString()
        };
        return this.httpPost<IGetPOIResp>("/cgi-bin/poi/getpoi", data);
    }

    /**
     * 查询门店列表
     * @param offset
     * @param limit
     */
    public list(offset: number = 0, limit: number = 10) {
        const data = {
            begin: offset,
            limit
        };
        return this.httpPost<IGetPOIListResp>("/cgi-bin/poi/getpoilist", data);
    }

    /**
     * 创建门店
     * @param poi
     */
    public create(poi: ICreatePOIReq) {
        const data = {
            business: poi
        };
        return this.httpPost<ICreatePOIResp>("/cgi-bin/poi/addpoi", data);
    }

    /**
     * 修改门店服务信息
     * @param id
     * @param poi
     */
    public update(id: number, poi: IUpdatePOIReq) {
        poi["base_info"]["poi_id"] = id.toString();
        const data = {
            business: poi
        };
        return this.httpPost<string>("/cgi-bin/poi/updatepoi", data);
    }

    /**
     * 删除门店
     * @param poi
     */
    public delete(id: number) {
        const data = {
            poi_id: id.toString()
        };
        return this.httpPost<string>("/cgi-bin/poi/delpoi", data);
    }

    /**
     * 获取门店类目表
     */
    public categories() {
        return this.httpGet<IGetPOICategoryListResp>("/cgi-bin/poi/getwxcategory");
    }
}
