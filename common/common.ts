import { Request, Response } from 'express';
import { pool } from '../config/db';


async function createTable() {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phoneNumber VARCHAR(15),
        email VARCHAR(255),
        linkedId INT,
        linkPrecedence ENUM('secondary', 'primary') NOT NULL,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL,
        deletedAt DATETIME
    );`
    await pool.query(createTableQuery);
}



export default  createTable;