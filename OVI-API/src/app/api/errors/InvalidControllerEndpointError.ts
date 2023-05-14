export class InvalidControllerEndpointError extends Error {
    constructor(url: string) {
        super();
        this.message = `Invalid Controller Endpoint: ${url}`;
    }
}