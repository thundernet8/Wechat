import * as url from "url";
import * as qs from "querystring";

export function addUrlQuery(_url: string, kvs: { [key: string]: string | number }) {
    const urlObj = url.parse(_url);
    const queryKvs = Object.assign({}, qs.parse(urlObj.query || ""), kvs);
    const query =
        "?" +
        Object.keys(queryKvs)
            .map(key => `${key}=${queryKvs[key]}`)
            .join("&");
    const { protocol, hostname, port, pathname } = urlObj;
    return `${protocol ? protocol + "//" : ""}${hostname || ""}${pathname || "/"}${query}`;
}
