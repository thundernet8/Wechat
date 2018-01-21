import BasicService from "./BasicService";
import OfficialAccount from "./OfficialAccount";
import OpenPlatform from "./OpenPlatform";
import Payment from "./Payment";
import Reply from "./Core/Reply";
import BroadcastMessage from "./Core/BroadcastMessage";

const Core = {
    ...Reply,
    ...BroadcastMessage
};

const Wechat = {
    BasicService,
    OfficialAccount,
    OpenPlatform,
    Payment,
    Core
};

export default Wechat;
