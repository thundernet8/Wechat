import IServiceProvider from "../../Core/Interface/IServiceProvider";
import ServiceContainer from "../../Core/ServiceContainer";
import BaseServiceProvider from "../../Core/ServiceProvider";
import Client from "./ServiceClient";
import CodeClient from "./CodeServiceClient";
import CoinClient from "./CoinServiceClient";
import GeneralCardClient from "./GeneralCardServiceClient";
import MeetingTicketClient from "./MeetingTicketServiceClient";
import MemberCardClient from "./MemberCardServiceClient";
import MovieTicketClient from "./MovieTicketServiceClient";
import SubMerchantClient from "./SubMerchantServiceClient";
import AccessToken from "../Auth/AccessToken";

/**
 * Card Service Provider
 */
export default class ServiceProvider extends BaseServiceProvider implements IServiceProvider {
    public register(app: ServiceContainer) {
        super._register(app);
        const accessToken = new AccessToken(app);

        app.setService("card", new Client(app, accessToken));
        app.setService("card.code", new CodeClient(app, accessToken));
        app.setService("card.coin", new CoinClient(app, accessToken));
        app.setService("card.general", new GeneralCardClient(app, accessToken));
        app.setService("card.meeting", new MeetingTicketClient(app, accessToken));
        app.setService("card.member", new MemberCardClient(app, accessToken));
        app.setService("card.movie", new MovieTicketClient(app, accessToken));
        app.setService("card.submerchant", new SubMerchantClient(app, accessToken));
        return this;
    }
}
