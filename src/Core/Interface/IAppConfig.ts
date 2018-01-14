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
}
