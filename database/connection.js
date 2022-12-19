const express = require('express');
const mysql = require('mysql');


const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs-login'
})
con.connect((err)=>{
    if (err) throw err;
    console.log("Connected!");
  });
  
  module.exports = con;