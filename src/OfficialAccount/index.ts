import ServiceContainer from "../Core/ServiceContainer";
import AutoReplyServiceProvider from "./AutoReply/ServiceProvider";
import BaseServiceProvider from "./Base/ServiceProvider";
import BroadcastServiceProvider from "./Broadcast/ServiceProvider";
import CardServiceProvider from "./Card/ServiceProvider";
import CommentServiceProvider from "./Comment/ServiceProvider";
import DataCubeServiceProvider from "./DataCube/ServiceProvider";
import DeviceServiceProvider from "./Device/ServiceProvider";
import ServerServiceProvider from "./Server/ServiceProvider";
import MaterialServiceProvider from "./Material/ServiceProvider";
import MenuServiceProvider from "./Menu/ServiceProvider";
import POIServiceProvider from "./POI/ServiceProvider";
import SemanticServiceProvider from "./Semantic/ServiceProvider";
import TemplateMessageServiceProvider from "./TemplateMessage/ServiceProvider";
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
            BroadcastServiceProvider,
            CardServiceProvider,
            CommentServiceProvider,
            DataCubeServiceProvider,
            DeviceServiceProvider,
            ServerServiceProvider,
            MaterialServiceProvider,
            MenuServiceProvider,
            POIServiceProvider,
            SemanticServiceProvider,
            TemplateMessageServiceProvider,
            UserServiceProvider,
            JssdkServiceProvider,
            MediaServiceProvider,
            QrCodeServiceProvider,
            UrlServiceProvider
        ];
        this.initServices();
    }
}
