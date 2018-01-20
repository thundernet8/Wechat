export default interface IAppConfig {
    appid: string;
    secret: string;
    token: string;
    aesKey?: string;
    server?: "express" | "koa";
    log?: {
        level: "error" | "debug" | "info";
        file: string;
    };
    cacher?: {
        getter: (key: string) => string;
        setter: (key: string, data: string) => void;
    };
};
