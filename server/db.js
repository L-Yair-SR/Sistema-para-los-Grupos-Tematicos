import { createPool } from "mysql2/promise";
import {createConnection} from "mysql2"

export const pool = createPool(
    {
        host: '127.0.0.1',//127.0.0.1
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'PT',
        dateStrings: true
    });

export const connection = createConnection(
    {
        host: '127.0.0.1',//127.0.0.1
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'PT',
        dateStrings: true,
    }
)