export class AuthenticationService {
    private logged: boolean;
    private admin: boolean;
    private jwt: string | null;

    constructor() {
        this.logged = false;
        this.jwt = null;
    }

    public get isLogged(): boolean {
        return this.logged;
    }

    public get token(): string | null {
        return this.jwt;
    }

    public get isAdmin(): boolean {
        return this.admin;
    }

    public login(jwt: string): void {
        this.jwt = jwt;
        this.logged = true;

        //  TODO parse JWT for user type
        this.admin = true;
    }

    public logout(): void {
        this.jwt = null;
        this.logged = true;
    }
}