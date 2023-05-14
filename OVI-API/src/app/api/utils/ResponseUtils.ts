import {ServerResponse} from "http";
import {StatusCodes} from "http-status-codes";

export namespace ResponseUtils {
    export function writeResponse(response: ServerResponse, statusCode: StatusCodes, body: any | null = null, json: boolean = true) {
        response.writeHead(statusCode);
        if (body != null) response.write(json ? JSON.stringify(body) : body);
    }
}