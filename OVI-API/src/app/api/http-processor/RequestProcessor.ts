import {IncomingMessage} from "http";

export class RequestProcessor {

    log(request:IncomingMessage){
        console.log(`[${request.method}] ${request.url} called.`)
    }
    preHandle(request: IncomingMessage) {
        request.setEncoding("utf8");
    }

    isBadRequest(request: IncomingMessage): boolean {
        return false;
    }
}