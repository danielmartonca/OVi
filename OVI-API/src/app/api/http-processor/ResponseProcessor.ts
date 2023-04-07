import {ServerResponse} from "http";

export class ResponseProcessor {

    internalServerError(response: ServerResponse, reason: any | null = null) {

    }

    badRequest(response: ServerResponse) {
        response.writeHead(404);
        response.write('Bad Request');
    }
}
