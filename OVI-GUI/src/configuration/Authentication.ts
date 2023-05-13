export class Authentication {
    private static jwt: string | undefined;

    public static get isAuthenticated() {
        return this.jwt != undefined;
    }

    public static set token(token: string) {
        this.jwt = token;
    }

    public static reset() {
        this.jwt = undefined;
    }
}