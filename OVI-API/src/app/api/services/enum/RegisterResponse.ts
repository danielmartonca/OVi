export namespace Register {
    export enum Response {
        USERNAME_TOO_SHORT,
        USERNAME_TOO_LONG,
        INVALID_USERNAME,

        PASSWORD_TOO_SHORT,
        PASSWORD_TOO_LONG,
        INVALID_PASSWORD,

        USERNAME_ALREADY_USED,

        SUCCESS
    }

    export function mapResponseToMessage(response: Response): string {
        switch (response) {
            case Response.USERNAME_TOO_SHORT:
                return "Username too short!";
            case Response.USERNAME_TOO_LONG:
                return "Username too long!";
            case Response.INVALID_USERNAME:
                return "Invalid username format!";
            case Response.PASSWORD_TOO_SHORT:
                return "Password too short!";
            case Response.PASSWORD_TOO_LONG:
                return "Password too long!";
            case Response.INVALID_PASSWORD:
                return "Invalid password format!";
            case Response.USERNAME_ALREADY_USED:
                return "Username is already used!";
            case Response.SUCCESS:
                return "Registration successful!";
            default:
                throw new Error(`Unhandled registration case ${response}`);
        }
    }
}