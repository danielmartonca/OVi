export class Account {

    constructor(id: number, username: string, password: string, type: AccountType) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.type = type;
    }

    public id: number;
    public username: string;
    public password: string;
    public type: AccountType;

}

export enum AccountType {
    user,
    admin
}