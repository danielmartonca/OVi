export enum AccountType {
    user,
    admin
}

export namespace AccountTypeUtils {
    export function toString(type: AccountType): string {
        switch (type) {
            case AccountType.admin:
                return "ADMIN";
            default:
                return "USER";
        }
    }
}