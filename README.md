# Identity Reconciliation

`Identity Reconciliation` This repository contains the source code for a RESTful API built for a Identity Reconciliation using Node.js, TypeScript, MYSQL. The goal of this project is to provide a well-structured backend API for managing tasks, enabling users.

## Installation
Get started quickly by installing the package using npm:
npm install


### Tech Stack Used: 
- Backend: Node.js, TypeScript
- Database: MySQL (hosted on AWS RDS)
- Deployment: Render


### Features :
The `Identity Reconciliation` API allows users to:

1. Start the server with the command `npm start`, which automatically creates the `Contacts` table in the database.
2. Create an account by providing an email and phone number.
3. Link a new account with an existing email or phone number as a secondary account.
4. Provide at least one identifier (email or phone number) to retrieve related information.
5. Link accounts with different email and phone number combinations, treating the email as primary and the phone number as secondary.


### Database Schema : 
When Server is Start the DataBase is connect to Server and a table `Contacts` create automtically. The application automatically connect the database and create table name `Contacts` on server start.The Schema of the table is ` (id INT AUTO_INCREMENT PRIMARY KEY,phoneNumber VARCHAR(15),email VARCHAR(255),linkedId INT,linkPrecedence ENUM('secondary', 'primary') NOT NULL,createdAt DATETIME NOT NULL,updatedAt DATETIME NOT NULL,deletedAt DATETIME)` .Then, Database is connnected to the server and table is also created Successfully.


### start :
You can start the server by using this command `npm start`

### API Documentation :
For detailed information on how to use the API, refer to the API documentation. You can access the documentation at: `http://localhost:3000/docs`

## License
node-cron is under [ISC License](https://github.com/001Sagar/Task_Management_System/blob/master/LICENSE.md).




