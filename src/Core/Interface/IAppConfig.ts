export default interface IAppConfig {
    appid: string;
    secret: string;
    token: string;
    aesKey?: string;
    server?: "express" | "koa";
    deviceType?: string; // IOT required, 设备类型，目前为“公众账号原始 ID”
    log?: {
        level: "error" | "debug" | "info";
        file: string;
    };
    cacher?: {
        getter: (key: string) => string;
        setter: (key: string, data: string) => void;
    };
};
