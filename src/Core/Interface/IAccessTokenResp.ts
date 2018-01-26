export default interface IAccessTokenResp {
    access_token?: string;
    expires_in?: number;
    refresh_token?: string; // OAuth时存在
    openid?: string; // OAuth时存在
    scope?: string; // OAuth时存在
    errcode?: number;
    errmsg?: string;
};
