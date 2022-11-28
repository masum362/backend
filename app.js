const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');

const app = express();

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})



db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("database connected")
    }
})

app.use(express.urlencoded({ extended:false }));
app.use(express.json()); 




app.set('view engine', 'hbs');

const publicDirectory = path.join('__dirname', 'public');


app.use(express.static(publicDirectory));

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));


app.listen(3000,()=>{
    console.log("server listening on in 3000")
})