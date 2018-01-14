import AbstractAccessToken from "../../Core/AccessToken";
import ServiceContainer from "../../Core/ServiceContainer";

export default class AccessToken extends AbstractAccessToken {
    private app: ServiceContainer;

    public constructor(container: ServiceContainer) {
        super();
        this.app = container;
    }

    public getEndpoint() {
        return "/cgi-bin/token";
    }

    public getCredentials() {
        const { appid, secret } = this.app;
        return {
            appid,
            secret,
            grant_type: "client_credential"
        };
    }
}
