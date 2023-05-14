import {MissingBodyException} from "../../errors/MissingBodyException";

export class RegistrationDataDTO {
    public readonly username: string;
    public readonly password: string

    constructor(body: string | null) {
        if (body == null) throw new MissingBodyException();

        const json = JSON.parse(body);
        this.username = json.username;
        this.password = json.password;
    }
}