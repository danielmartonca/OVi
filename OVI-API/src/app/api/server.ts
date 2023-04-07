import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import {Server} from "net";
import {RequestProcessor} from './http-processor/RequestProcessor';
import {ResponseProcessor} from './http-processor/ResponseProcessor';
import {HeadersProcessor} from "./http-processor/HeadersProcessor";
import {AccountsController} from "./controllers/AccountsController";

const dotenv = require('dotenv');


class OViServer {
    private readonly host: string;
    private readonly port: number;
    private server: Server;

    private static requestProcessor: RequestProcessor = new RequestProcessor();
    private static responseProcessor: ResponseProcessor = new ResponseProcessor();
    private static headersProcessor: HeadersProcessor = new HeadersProcessor();

    private static accountsController: AccountsController = new AccountsController();

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;

        this.server = this.createServer();
    }

    private createServer(): Server {
        return http.createServer((request: IncomingMessage, response: ServerResponse) => OViServer.handle(request, response));
    }

    public startServer() {
        this.server.listen(this.port, this.host);
        console.log(`Server started at http://${this.host}:${this.port}`);
    }

    private static handle(request: IncomingMessage, response: ServerResponse) {
        OViServer.requestProcessor.log(request);
        OViServer.requestProcessor.preHandle(request);

        if (OViServer.requestProcessor.isBadRequest(request))
            return OViServer.responseProcessor.badRequest(response);

        let bodyStr = '';
        request.on('data', chunk => bodyStr += chunk);
        request.on('error', err => OViServer.responseProcessor.internalServerError(response, err));
        request.on('end', () => {
            try {
                const body = bodyStr.length != 0 ? JSON.parse(bodyStr) : null;

                if (request.url?.startsWith('/api/accounts'))
                    return this.handleAccountControllerEndpoint(request.url!, body, response);

                return OViServer.responseProcessor.badRequest(response);
            } catch (error) {
                return OViServer.responseProcessor.internalServerError(response, error);
            } finally {
                response.end();
            }
        });
    }

    private static handleAccountControllerEndpoint(url: string, body: any, response: ServerResponse) {
        if (url.startsWith('/api/accounts/get'))
            return OViServer.accountsController.get(response);
        throw new Error(`Invalid Accounts Controller Endpoint ${url}`);
    }
}

dotenv.config();

const server = new OViServer(process.env.SERVER_ADDRESS!, parseInt(process.env.PORT!));
server.startServer();