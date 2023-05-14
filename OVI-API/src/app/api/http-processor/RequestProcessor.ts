import {IncomingMessage} from "http";

export namespace RequestProcessor {

    export function log(request: IncomingMessage) {
        console.log(`[Request]:  ${request.method} ${request.url} called.`)
    }

    export function preHandle(request: IncomingMessage) {
        request.setEncoding("utf8");
    }
}