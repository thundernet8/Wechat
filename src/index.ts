import BasicService from "./BasicService";
import OfficialAccount from "./OfficialAccount";
import OpenPlatform from "./OpenPlatform";
import Payment from "./Payment";
import Message from "./Core/Message";

const Core = {
    ...Message
};

const Wechat = {
    BasicService,
    OfficialAccount,
    OpenPlatform,
    Payment,
    Core
};

export default Wechat;
