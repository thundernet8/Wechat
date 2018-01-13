import AbstractAccessToken from "../../Core/AccessToken";

export default class AccessToken extends AbstractAccessToken {
    public getEndpoint() {
        return "/token";
    }

    public getCredentials() {
        return {
            appid: "",
            secret: "",
            grant_type: "client_credential"
        };
    }
}
