import {Account, AccountType} from "../model/Account";

export class AccountsService {
    public getAccounts(): Account[] {
        return [new Account(1, 'test', 'test', AccountType.user)];
    }
}