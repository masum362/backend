const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const db = require('./database/connection');
const auth = require('./routes/secret-route');



const app = express();

dotenv.config({ path: './.env'});

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
