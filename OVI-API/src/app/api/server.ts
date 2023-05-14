import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import {Server} from "net";
import {ResponseProcessor} from './http-processor/ResponseProcessor';
import {AuthenticationController} from "./controllers/AuthenticationController";
import {HttpMethod} from "./model/enum/HttpMethod";
import {RequestProcessor} from "./http-processor/RequestProcessor";
import {InvalidControllerEndpointError} from "./errors/InvalidControllerEndpointError";
import {MissingBodyException} from "./errors/MissingBodyException";

const dotenv = require('dotenv');


class OViServer {
    private readonly host: string;
    private readonly port: number;
    private readonly server: Server;

    private static readonly authenticationController: AuthenticationController = new AuthenticationController();

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
        RequestProcessor.log(request);
        RequestProcessor.preHandle(request);

        let bodyStr = '';
        request.on('data', chunk => bodyStr += chunk);
        request.on('error', err => ResponseProcessor.internalServerError(response, err));
        request.on('end', () => OViServer.work(request, response, bodyStr));
    }

    private static work(request: IncomingMessage, response: ServerResponse, body: string | null) {
        try {
            const method = HttpMethod.stringToType(request.method!);
            if (body == '') body = null;

            if (request.url?.startsWith('/api/auth'))
                return OViServer.authenticationController.mapEndpoints(method, request.url!, body, response);

            ResponseProcessor.badRequest(response, new InvalidControllerEndpointError(method, `${request.url!} does not match any controller`));
        } catch (error) {
            if (error instanceof InvalidControllerEndpointError ||
                error instanceof MissingBodyException
            ) return ResponseProcessor.badRequest(response, error);

            return ResponseProcessor.internalServerError(response, error);
        } finally {
            response.end();
        }
    }
}

dotenv.config();

const server = new OViServer(process.env.SERVER_ADDRESS!, parseInt(process.env.PORT!));
server.startServer();