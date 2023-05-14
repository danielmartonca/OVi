export class MissingBodyException extends Error {
    constructor() {
        super();
        this.message = `Missing request body!`;
    }
}