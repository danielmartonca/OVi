import {ServerResponse} from "http";
import {AccountsService} from "../services/AccountsService";

export class AccountsController {
    private accountsService: AccountsService = new AccountsService();

    get(response: ServerResponse) {
        const accounts = this.accountsService.getAccounts();
        response.writeHead(200);
        response.write(JSON.stringify(accounts));
    }
}