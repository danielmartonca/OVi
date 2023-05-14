import {HttpMethod} from "../model/enum/HttpMethod";

export class InvalidControllerEndpointError extends Error {
    constructor(method: HttpMethod.Type, url: string) {
        super();
        this.message = `Invalid Controller Endpoint: ${HttpMethod.typeToString(method)} ${url}`;
    }
}