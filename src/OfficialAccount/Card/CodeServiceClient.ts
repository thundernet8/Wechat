import BaseServiceClient from "../../Core/ServiceClient";
import {
    IDepositCodeResp,
    IGetDepositCount,
    ICheckCodeResp,
    IGetCardCodeResp,
    IUpdateCardCodeResp,
    IDisableCardCodeResp,
    IConsumeCardCodeResp,
    IDecryptCardCodeResp
} from "../Interface/ICard";

/**
 * Implement methods of Card Code service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
 */
export default class ServiceClient extends BaseServiceClient {
    /**
     * 导入自定义code
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param cardId 需要进行导入code的卡券ID
     * @param codes 需导入微信卡券后台的自定义code，上限为100个
     */
    public deposit(cardId: string, codes: string[]) {
        const data = {
            card_id: cardId,
            code: codes
        };

        return this.httpPost<IDepositCodeResp>("/card/code/deposit", data);
    }

    /**
     * 查询导入code数目
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param cardId 进行导入code的卡券ID
     */
    public getDepositedCount(cardId: string) {
        const data = {
            card_id: cardId
        };

        return this.httpPost<IGetDepositCount>("/card/code/getdepositcount", data);
    }

    /**
     * 核查code
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025062
     * @param cardId 进行导入code的卡券ID
     * @param codes 已经微信卡券后台的自定义code，上限为100个
     */
    public check(cardId: string, codes: string[]) {
        const data = {
            card_id: cardId,
            code: codes
        };

        return this.httpPost<ICheckCodeResp>("/card/code/checkcode", data);
    }

    /**
     * 查询Code接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239
     * @param code 单张卡券的唯一标准
     * @param cardId 卡券ID代表一类卡券。自定义code卡券必填
     * @param checkConsume 是否校验code核销状态，填入true和false时的code异常状态返回数据不同
     */
    public stats(code: string, cardId: string = "", checkConsume: boolean = true) {
        const data = {
            code,
            check_consume: checkConsume,
            card_id: cardId
        };

        return this.httpPost<IGetCardCodeResp>("/card/code/get", data);
    }

    /**
     * 更改Code接口
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param code 需变更的Code码
     * @param newCode 变更后的有效Code码
     * @param cardId 卡券ID。自定义Code码卡券为必填
     */
    public update(code: string, newCode: string, cardId: string = "") {
        const data = {
            code,
            new_code: newCode,
            card_id: cardId
        };

        return this.httpPost<IUpdateCardCodeResp>("/card/code/update", data);
    }

    /**
     * 设置卡券失效
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025272
     * @param code 设置失效的Code码
     * @param cardId 卡券ID
     */
    public disable(code: string, cardId: string = "", reason: string = "") {
        const data = {
            code,
            card_id: cardId,
            reason
        };

        return this.httpPost<IDisableCardCodeResp>("/card/code/unavailable", data);
    }

    /**
     * 核销Code
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239
     * @param code 需核销的Code码
     * @param cardId 卡券ID。创建卡券时use_custom_code填写true时必填。非自定义Code不必填写
     */
    public consume(code: string, cardId?: string) {
        const data = {
            code
        };

        if (cardId !== undefined) {
            data["card_id"] = cardId;
        }

        return this.httpPost<IConsumeCardCodeResp>("/card/code/consume", data);
    }

    /**
     * Code解码
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025239
     * @param encryptedCode 经过加密的Code码
     */
    public decrypt(encryptedCode: string) {
        const data = {
            encrypt_code: encryptedCode
        };

        return this.httpPost<IDecryptCardCodeResp>("/card/code/decrypt", data);
    }
}
