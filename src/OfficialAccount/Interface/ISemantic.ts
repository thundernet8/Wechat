export interface ISemanticQueryResp {
    errcode: number;
    query: string;
    type: string;
    semantic: any;
    result?: any[];
    answer?: string;
    text?: string;
}
