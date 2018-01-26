export interface IOAuthAccessTokenResp {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    openid: string;
    scope: string;
}
