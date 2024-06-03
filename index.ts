import express , {Request, Response} from 'express';
import mysql from 'mysql2';
const app = express();
const port = 8000 || process.env.PORT;

app.get('/', async (req,res) =>{
    res.send("Yeah ! Server is Run")
})


//Encrypt the Data
app.use(express.json());
app.use(express.urlencoded({extended : true}))


import {connectToDataBase, pool} from './config/db'
connectToDataBase()

// Create Required Tables
import createTable from './common/common';
createTable();


// Requiring the Path of API
import route from './routes/route';
app.use('/api',route )



app.listen(port , function () {
    console.log(`Server is Run on PORT :: ${port}`)
})