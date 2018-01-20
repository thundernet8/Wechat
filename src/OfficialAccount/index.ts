import ServiceContainer from "../Core/ServiceContainer";
import AutoReplyServiceProvider from "./AutoReply/ServiceProvider";
import BaseServiceProvider from "./Base/ServiceProvider";
import CommentServiceProvider from "./Comment/ServiceProvider";
import ServerServiceProvider from "./Server/ServiceProvider";
import MenuServiceProvider from "./Menu/ServiceProvider";
import UserServiceProvider from "./User/ServiceProvider";
import JssdkServiceProvider from "../BasicService/Jssdk/ServiceProvider";
import MediaServiceProvider from "../BasicService/Media/ServiceProvider";
import QrCodeServiceProvider from "../BasicService/QrCode/ServiceProvider";
import UrlServiceProvider from "../BasicService/Url/ServiceProvider";
import IAppConfig from "../Core/Interface/IAppConfig";

export default class Application extends ServiceContainer {
    public constructor(config: IAppConfig) {
        super(config);
        this.providers = [
            AutoReplyServiceProvider,
            BaseServiceProvider,
            CommentServiceProvider,
            ServerServiceProvider,
            MenuServiceProvider,
            UserServiceProvider,
            JssdkServiceProvider,
            MediaServiceProvider,
            QrCodeServiceProvider,
            UrlServiceProvider
        ];
        this.initServices();
    }
}
