import BaseServiceClient from "../../Core/ServiceClient";
import OAuthAccessToken from "./AccessToken";
import IOAuthUserInfo from "../../Core/Interface/IOAuthUserInfo";
import { IOAuthAccessTokenResp } from "../Interface/IAuth";

/**
 * Implement methods of OAuth service
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
 */
export default class ServiceClient extends BaseServiceClient {
    private oauthToken: OAuthAccessToken;

    /**
     * OAuth第一步获取code的URI
     * @param redirect 授权后重定向的回调链接地址
     * @param scope 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
     * @param state 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
     */
    public grantCodeUri(
        redirect: string,
        scope: "snsapi_base" | "snsapi_userinfo",
        state?: string
    ): string {
        return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
            this.app.appid
        }&redirect_uri=${encodeURIComponent(
            redirect
        )}&response_type=code&scope=${scope}&state=${state || ""}#wechat_redirect`;
    }

    /**
     * OAuth第二步获取access_token的URI
     * @param code OAuth第一步获取的code参数
     */
    public grantTokenUri(code: string) {
        return `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.app.appid}&secret=${
            this.app.secret
        }&code=${code}&grant_type=authorization_code`;
    }

    /**
     * 通过code换取access_token
     * @param code OAuth第一步获取的code参数
     */
    public grantToken(code: string): Promise<IOAuthAccessTokenResp> {
        if (!this.oauthToken) {
            this.oauthToken = new OAuthAccessToken(this.app);
        }

        return this.oauthToken.getToken(false, { code }).then(resp => {
            return resp as any;
        });
    }

    /**
     * 拉取用户信息(需scope为 snsapi_userinfo，且调用grantToken成功之后调用)
     * @param accessToken
     * @param lang 返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
     */
    public grantUserInfo(lang: string = "zh_CN") {
        if (!this.oauthToken) {
            this.oauthToken = new OAuthAccessToken(this.app);
        }

        return this.oauthToken.getUserInfo(lang);
    }
}
