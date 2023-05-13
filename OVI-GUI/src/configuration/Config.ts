export class Config {
    public static readonly debug: boolean = true;

    public static readonly debugNotifications: boolean = Config.debug && true;
    public static readonly debugNotificationsService: boolean = false;

    public static readonly usernameRegex
}

export namespace Regex {
    export const username = RegExp("^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$");
    export const password = RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$");
}