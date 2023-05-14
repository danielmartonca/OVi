import {Account} from "../model/data/Account";
import {AccountType} from "../model/enum/AccountType";

export class AccountsService {
    public getAccounts(): Account[] {
        return [new Account(1, 'test', 'test', AccountType.user)];
    }
}