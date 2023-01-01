const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database/connection');
const cookieParser = require('cookie-parser')
const auth = require('../routes/secret-route');

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
        console.log({ hashedpassword });

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedpassword }, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result)
                return res.render('login', {
                    msg: 'User Registration Successfully'
                })
            }
        })
    })
}



exports.login = (req, res,) => {
    const { email, password } = req.body

    if (req.body.email.trim() === '' || req.body.password.trim() === '') {
        return res.render('login', {
            massage: 'email or password must not be empty'
        })
    }

    db.query("SELECT * FROM users WHERE email=?", email, (err, result) => {

        if (err) {
            return res.render('login', {
                massage: err
            })
        }

        //check whether the user with that email exists or not
        if (result.length === 0) {
            return res.render('login', {
                massage: 'email is incorrect'
            })
        }

        //check password
        bcrypt.compare(password, result[0].password).then(isMatch => {

            if (isMatch === false) {
                return res.render('login', {
                    massage: 'password is incorrect'
                })
            }

            //generate token
            else {
                const token = jwt.sign({ id: result[0].email.toString() }, process.env.SECRET_KEY)
                res.cookie('token', token, { httpOnly: true }).render('dashboard',{
                    massage: 'logged in successfully',
                    user: result[0],
                    token
                })
                
            }
        })
    })
}

exports.deposit = (req, res) => {
    const deposit = req.body.deposit;
    const sql = `INSERT INTO money (deposit) VALUES(?)`;

    db.query(sql, [deposit], (error, result) => {
        if (error) throw error;
        else {
            if (deposit == '' || deposit == undefined) {
                return res.render('deposit', {
                    msgdeposit1: 'Insert a deposit Amount'
                })
            }
            else {
                return res.render('deposit', {
                    msgdeposit2: 'Deposit Successfully',
                    data: result
                })
            }
        }
    })
}

exports.withdraw = (req, res) => {
    const withdraw = req.body.withdraw;
    const sql = 'INSERT INTO money (withdraw) VALUES (?)';
    const sql2 = `SELECT SUM(deposit) -SUM(withdraw) AS total_amount FROM money`;

    db.query(sql, [withdraw], (error, result, sql2) => {
        if (error) throw error;
        else {
            if (withdraw == '' || withdraw == undefined) {
                return res.render('withdraw', {
                    msgwithdraw2: 'Insert a withdraw Amount'
                })
            }
            if (sql2 <= 0) {
                return res.render('withdraw', {
                    msgwithdraw3: 'You Not Have This Amount'
                })
            }
            else {
                return res.render('withdraw', {
                    msgwithdraw1: 'withdraw Successfully',
                })

            }
        }
    })
}

exports.contact = (req, res) => {
    const { name, email, subject, message } = req.body;
    const sql = 'INSERT INTO contact (name,email,subject,massage) VALUES(?,?,?,?)';
    db.query(sql, [name, email, subject, message], (error, results) => {

        if (error) throw error;
        else {
            if (name === undefined || name === '' ||
                email === undefined || email === '' ||
                subject === undefined || subject === '' ||
                message === undefined || message === '') {
                return res.render('contact', {
                    msgcontact1: 'please fill the form correctly'
                })
            }
            else {
                res.render('contact', {
                    msgcontact2: 'massage sent Successfully'
                })
            }
        }
    })
}

// exports.dashboard=(req,res,next)=>{
//     const qry = 'SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) AS total_withdraw , SUM(deposit)-SUM(withdraw) AS total_amount FROM money'
//     db.query(qry, (err, results) => {
//         if(err){
//           return console.log(err);
//         }
//         else{
//          return res.render('../dashboard',{
//             data: results

//         })
//     }

//     })
// }






