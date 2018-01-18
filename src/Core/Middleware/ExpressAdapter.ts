import validate from "./Validate";
import ServiceContainer from "../ServiceContainer";
import * as xmlParser from "express-xml-bodyparser";

export default function expressMiddleware(container: ServiceContainer, client: any) {
    const wxMiddleware = async (req, res, next) => {
        const validateResult = validate(req.query, container.token);
        if (!validateResult) {
            throw new Error("Validate request failed");
        }

        if (req.query.echostr) {
            res.send(req.query.echostr);
            return;
        } else {
            container.request = req;
            if (client.response) {
                try {
                    const resp = await client.response();
                    if (resp) {
                        res.append("Content-type", resp.contentType);
                        res.status(resp.status || 200).send(resp.body || "");
                        return;
                    }
                } catch (error) {
                    throw error;
                }
            } else {
                return next();
            }
        }
    };

    return [xmlParser(), wxMiddleware];
}
