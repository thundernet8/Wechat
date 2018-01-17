import Response from "../Http/Response";

export default interface IServiceClient {
    response?(): Promise<Response>;
};
