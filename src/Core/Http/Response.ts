export default class Response {
    private _status: number = 200;
    private _contentType: string = "application/xml";
    private _body: string = "";

    public constructor() {}

    public set status(status: number) {
        this._status = status;
    }

    public get status() {
        return this._status;
    }

    public set contentType(contentType: string) {
        this._contentType = contentType;
    }

    public get contentType() {
        return this._contentType;
    }

    public set body(body: string) {
        this._body = body;
    }

    public get body() {
        return this._body;
    }
}
