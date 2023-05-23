import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import {Server} from "net";
import {ResponseProcessor} from './http-processor/ResponseProcessor';
import {AuthenticationController} from "./controllers/AuthenticationController";
import {HttpMethod} from "./model/enum/HttpMethod";
import {RequestProcessor} from "./http-processor/RequestProcessor";
import {InvalidControllerEndpointError} from "./errors/InvalidControllerEndpointError";
import {MissingBodyException} from "./errors/MissingBodyException";
import {dataAccessor, SqlAccessor} from "./data-access/SqlAccessor";

const dotenv = require('dotenv');
dotenv.config();

export class OViServer {
    public readonly host: string;
    public readonly port: number;

    public get address(): string {
        return `http://${this.host}:${this.port}`;
    }

    private dataAccessor: SqlAccessor;
    private readonly server: Server;

    private static readonly authenticationController: AuthenticationController = new AuthenticationController();

    constructor(host: string, port: number, dataAccessor: SqlAccessor) {
        this.host = host;
        this.port = port;

        this.dataAccessor = dataAccessor;
        this.server = this.createServer();

        this.server.on('listening', () => console.log(`OVI-API started...`));
        this.server.on('close', async () => await this.dataAccessor.close());
    }

    private createServer(): Server {
        return http.createServer((request: IncomingMessage, response: ServerResponse) => OViServer.handle(request, response));
    }

    public async startServer() {
        await this.dataAccessor.connect();
        this.server.listen(this.port, this.host);
    }

    private static handle(request: IncomingMessage, response: ServerResponse) {
        RequestProcessor.log(request);
        RequestProcessor.preHandle(request);

        let bodyStr = '';
        request.on('data', chunk => bodyStr += chunk);
        request.on('error', err => ResponseProcessor.internalServerError(response, err));
        request.on('end', async () => await OViServer.work(request, response, bodyStr));
    }

    private static async work(request: IncomingMessage, response: ServerResponse, body: string | null) {
        try {
            const method = HttpMethod.stringToType(request.method!);
            if (body == '') body = null;

            if (request.url?.startsWith('/api/auth'))
                return await OViServer.authenticationController.mapEndpoints(method, request.url!, body, response);

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


const host = process.env.SERVER_ADDRESS!;
const port = parseInt(process.env.PORT!);

const server = new OViServer(host, port, dataAccessor);
server.startServer().then(() => `Server started at ${server.address}`);