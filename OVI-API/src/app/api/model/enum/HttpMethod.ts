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

    export function typeToString(method: Type): string {
        switch (method) {
            case HttpMethod.Type.GET:
                return "GET";
            case HttpMethod.Type.POST:
                return "POST";
            case HttpMethod.Type.PUT:
                return "PUT";
            case HttpMethod.Type.DELETE:
                return "DELETE";
            default:
                throw new Error(`Unsupported HTTP Method ${method}`);
        }
    }
}