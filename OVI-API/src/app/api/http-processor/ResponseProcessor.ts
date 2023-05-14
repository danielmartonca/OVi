import {ServerResponse} from "http";
import {StatusCodes} from "http-status-codes";

export namespace ResponseProcessor {

    export function internalServerError(response: ServerResponse, reason: any) {
        response.writeHead(StatusCodes.INTERNAL_SERVER_ERROR);
        response.write(`Internal Server Error: ${JSON.stringify(reason)}`);
        console.error(JSON.stringify(reason));
    }

    export function badRequest(response: ServerResponse, error: Error | null = null) {
        response.writeHead(StatusCodes.BAD_REQUEST);
        response.write('Bad Request');
        console.warn(`Bad Request ${error != null ? JSON.stringify(error) : ''}`);
    }
}
