import {ServerResponse} from "http";
import {StatusCodes} from "http-status-codes";

export namespace ResponseProcessor {

    export function internalServerError(response: ServerResponse, reason: any) {
        response.writeHead(StatusCodes.INTERNAL_SERVER_ERROR);
        response.write(`Internal Server Error: ${JSON.stringify(reason)}`);
        console.error(`Internal Server Error: ${JSON.stringify(reason)}`);
    }

    export function badRequest(response: ServerResponse, error: Error | null = null) {
        response.writeHead(StatusCodes.BAD_REQUEST);
        response.write(`Bad Request ${error != null ? JSON.stringify(error) : ''}`);
        console.warn(`Bad Request ${error != null ? JSON.stringify(error) : ''}`);
    }
    export function end(response: ServerResponse, statusCode: StatusCodes, body: any | null = null, json: boolean = true) {
        response.writeHead(statusCode);
        if (body != null) response.write(json ? JSON.stringify(body) : body);
        console.info(`[Response]: ${statusCode} with payload: ${json ? JSON.stringify(body) : body}`)
    }
}
