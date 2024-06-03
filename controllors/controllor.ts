import { Request, Response } from 'express';
import { pool } from '../config/db';

interface Contact {
    id: number;
    email: string;
    phoneNumber: string;
    linkedId: number | null;
    linkPrecedence: 'primary' | 'secondary';
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

interface ResponseBody {
    contact: {
        primaryContactId: number | null;
        emails: string[];
        phoneNumbers: string[];
        secondaryContactIds: number[];
    };
}

async function identify(req: Request, res: Response): Promise<Response> {
    try {
        const { email, phoneNumber } = req.body as { email: string, phoneNumber: string };

        // Check for existing data
        const existingDataQuery = `SELECT * FROM contacts WHERE email = ? OR phoneNumber = ?`;
        const [existingData] = await pool.query(existingDataQuery, [email, phoneNumber]);

        if (existingData.length === 0) {
            // Insert new primary contact if no existing data
            const insertPrimaryContactQuery = `INSERT INTO contacts (phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt, deletedAt)
                                               VALUES (?, ?, NULL, 'primary', ?, ?, NULL)`;
            await pool.query(insertPrimaryContactQuery, [phoneNumber, email, new Date(), new Date()]);
        } else {
            // Handle existing data
            const newPhoneNumber = phoneNumber || existingData[0].phoneNumber || null;
            const newEmail = email || existingData[0].email || null;

            const checkemail = 'SELECT * FROM contacts WHERE email = ?';
            const checkphn = 'SELECT * FROM contacts WHERE phoneNumber = ?';
            const [emailData] = await pool.query(checkemail, [email]);
            const [phnData] = await pool.query(checkphn, [phoneNumber]);

            if ((emailData.length == 0 && email != null) || (phnData.length == 0 && phoneNumber != null)) {
                const insertSecondaryContactQuery = `INSERT INTO contacts (phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt, deletedAt)
                VALUES (?, ?, ?, 'secondary', ?, ?, NULL)`;
                const add_new_data = await pool.query(insertSecondaryContactQuery, [newPhoneNumber, newEmail, existingData[0].id, new Date(), new Date()]);
            }

            // Chcek and make the primary contact secondary if both phone number and email are different in the DataBase
            if (existingData.length >= 2) {
                const primary_query = `SELECT DISTINCT id FROM contacts WHERE email = ?`;
                const [primary_id] = await pool.query(primary_query, [email]);

                const updateContactQuery = `UPDATE contacts SET linkedId = ?, linkPrecedence = 'secondary' WHERE phoneNumber = ?`;
                const update_data = await pool.query(updateContactQuery, [primary_id[0].id, phoneNumber]);

            }
        }

        // Fetch IDs and details for the response
        const primaryContactIdQuery = `SELECT id FROM contacts WHERE linkPrecedence = 'primary' AND (email = ? OR phoneNumber = ?)`;
        const secondaryContactIdQuery = `SELECT id FROM contacts WHERE linkPrecedence = 'secondary' AND (email = ? OR phoneNumber = ?)`;
        const [primaryContactId] = await pool.query(primaryContactIdQuery, [email, phoneNumber]);
        const [secondaryContactId] = await pool.query(secondaryContactIdQuery, [email, phoneNumber]);
        0
        const emailQuery = `SELECT DISTINCT email FROM contacts WHERE email = ? OR phoneNumber = ?`;
        const phoneNumberQuery = `SELECT DISTINCT phoneNumber FROM contacts WHERE email = ? OR phoneNumber = ?`;
        const [emailData] = await pool.query(emailQuery, [email, phoneNumber]);
        const [phoneNumberData] = await pool.query(phoneNumberQuery, [email, phoneNumber]);

        // Construct the output
        const output = {
            contact: {
                primaryContactId: primaryContactId[0]?.id || null,
                emails: emailData.map((contact: { email: string }) => contact.email),
                phoneNumbers: phoneNumberData.map((contact: { phoneNumber: string }) => contact.phoneNumber),
                secondaryContactIds: secondaryContactId.map((contact: { id: number }) => contact.id),
            }
        };

        return res.status(200).json(output);
    } catch (error) {
        console.log("Error in the SignUP ", error);
        return res.status(500).json({
            status: 500,
            success: false,
            error: error,
            message: "Get Server Errror"
        })
    }
}



export default { identify };