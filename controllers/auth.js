const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, confirmpassword } = req.body;
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render('register', {
                massage: 'that email is already taken'
            })
        }
        else if (password !== confirmpassword) {
            return res.render('register', {
                massage: 'password does not match'
            })
        }

        const hashedpassword = await bcrypt.hash(password, 8);
        console.log({hashedpassword});

        db.query('INSERT INTO users SET ?',{name:name,email:email,password:hashedpassword},(error, result) => {
            if (error) {
                console.log(error);
            }
            else{console.log(result)
             return res.render('login',{
                    massage: 'User Registration Successfully'
                })
            }

        })




    })




}