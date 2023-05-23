import {AccountType} from "../model/enum/AccountType";
import {dataAccessor} from "../data-access/SqlAccessor";
import {Account} from "../model/data/Account";

export class AccountsDAO {
    public async getAccountByUsername(username: string): Promise<Account | null> {
        const resultRow = await dataAccessor.getAccountByUsername(username);
        if (resultRow == null) return null;
        return new Account(resultRow[0], resultRow[1], resultRow[2], resultRow[3]);
    }

    public async saveAccount(type: AccountType, username: string, encryptedPassword: string) {
        await dataAccessor.saveAccount(type, username, encryptedPassword);
    }
}