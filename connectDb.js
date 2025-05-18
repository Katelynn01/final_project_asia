import pgPromise from "pg-promise";
import dotenv from "dotenv";

export function connect(){
    dotenv.config();
    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT;
    const dbUser = process.env.DB_USER;
    const dbPasswd = process.env.DB_PASSWORD;
    const dbName = process.env.DB_NAME;

    const pgp = pgPromise();
    const db = pgp(`postgres://${dbUser}:${dbPasswd}@${dbHost}:${dbPort}/${dbName}`);

    return db;
}

// export const connect = connect();