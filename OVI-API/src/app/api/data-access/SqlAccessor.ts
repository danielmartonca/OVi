import {Connection, QueryResult} from 'postgresql-client';
import {SqlQueries} from "./SqlQueries";
import {AccountType, AccountTypeUtils} from "../model/enum/AccountType";

const dotenv = require('dotenv');
dotenv.config();

export class SqlAccessor {
    private connection: Connection;

    constructor() {
        // Create connection
        this.connection = new Connection(
            {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                database: process.env.DB_DATABASE,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
            }
        );
    }

    public async connect() {
        await this.connection.connect();
        console.log('Connected to the database...');
    }

    public async close() {
        await this.connection.close();
        console.log('Connection closed...');
    }

    private async runQuery(query: string): Promise<QueryResult> {
        try {
            return await this.connection.query(query);
        } catch (e) {
            console.error(`Failed to run query '${query}'. Reason: ${e}`)
            throw e;
        }
    }

    private async runQueryAsTransaction(query: string): Promise<QueryResult> {
        await this.connection.startTransaction();
        try {
            const queryResult = await this.connection.query(query);
            await this.connection.commit();
            return queryResult;
        } catch (e) {
            console.error(`Failed to run query '${query}'. Reason: ${e}`)
            await this.connection.rollback();
            throw e;
        }
    }

    public async getAccountByUsername(username: string): Promise<any[] | null> {
        const query = SqlQueries
            .getAccountByUsername
            .replace('?1', username);

        const results = await this.runQuery(query);
        if (results.rows == null || results.rows.length == 0) return null;
        return results.rows[0];
    }

    public async saveAccount(type: AccountType, username: string, encryptedPassword: string) {
        const query = SqlQueries
            .addAccount
            .replace('?1', username)
            .replace('?2', encryptedPassword)
            .replace('?3', AccountTypeUtils.toString(type));

        await this.runQueryAsTransaction(query);
    }
}

export const dataAccessor = new SqlAccessor();