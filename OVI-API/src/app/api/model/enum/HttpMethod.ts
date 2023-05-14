export namespace HttpMethod {
    export enum Type {
        GET, POST, PUT, DELETE
    }

    export function stringToType(method: string): Type {
        switch (method.toLowerCase()) {
            case "get":
                return Type.GET;
            case "post":
                return Type.POST;
            case "put":
                return Type.PUT;
            case "delete":
                return Type.DELETE;
            default:
                throw new Error(`Unsupported HTTP Method ${method}`);
        }
    }
}