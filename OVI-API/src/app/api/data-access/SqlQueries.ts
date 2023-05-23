export class SqlQueries {
    public static getAccountByUsername: string = `SELECT *
                                                  FROM ovi."Accounts"
                                                  WHERE username = '?1'`;

    public static addAccount: string = `insert into ovi."Accounts" (username, password, type)
                                        values ('?1', '?2', '?3')`;
}