import {AccountType} from "../enum/AccountType";

export class AccountDTO {
    constructor(public username: string, public password: string, public type: AccountType) {
    }
}