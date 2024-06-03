import mysql from 'mysql2';
import { Pool } from 'undici-types';
import {createPool} from 'mysql2/promise'
import * as dotenv from 'dotenv';

dotenv.config();

let pool :any;
function connectToDataBase() {
   pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 0,

  });
}

export { connectToDataBase , pool };
