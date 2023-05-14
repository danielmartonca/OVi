import {RegistrationDataDTO} from "../model/client/RegistrationDataDTO";
import {AccountsDAO} from "../data/AccountsDAO";
import {AccountType} from "../model/enum/AccountType";
import {Register} from "./enum/RegisterResponse";

export namespace Regex {
    export const username = RegExp("^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$");
    export const password = RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
}

export class AuthenticationService {
    private accountsDao: AccountsDAO = new AccountsDAO();

    public register(dto: RegistrationDataDTO): Register.Response {
        // 1. Validation
        if (dto.username.length < 5) return Register.Response.USERNAME_TOO_SHORT;
        if (dto.username.length > 15) return Register.Response.USERNAME_TOO_LONG;
        if (!Regex.username.test(dto.username)) return Register.Response.INVALID_USERNAME;

        if (dto.password.length < 5) return Register.Response.PASSWORD_TOO_SHORT;
        if (dto.password.length > 15) return Register.Response.PASSWORD_TOO_LONG;
        if (!Regex.password.test(dto.password)) return Register.Response.INVALID_PASSWORD;

        // 2. Check if username is already used
        if (this.accountsDao.getAccountByUsername(dto.username) != null)
            return Register.Response.USERNAME_ALREADY_USED;

        // 3. Register
        this.accountsDao.saveAccount(AccountType.user, dto.username, dto.password);

        return Register.Response.SUCCESS;
    }
}