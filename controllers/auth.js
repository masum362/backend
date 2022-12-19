const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database/connection');


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
    const {email,password}=req.body
    
    if(req.body.email.trim()===''||req.body.password.trim()===''){
        return res.render('login', {
            massage: 'email or password must not be empty'
        })
       
    
    }

    db.query("SELECT * FROM users WHERE email=?",email,(err,result)=>{

        if(err){
            return res.render('login', {
                massage:err
            })
        }

        //check whether the user with that email exists or not
        if(result.length===0){
            return res.render('login', {
                massage: 'email is incorrect'
            })
            }

           //check password
           bcrypt.compare(password,result[0].password).then(isMatch=>{
               
              if(isMatch===false){
                return res.render('login', {
                    massage: 'password is incorrect'
                })
            }

             //generate token
             const token=jwt.sign({id:result[0].email.toString()},process.env.SECRET_KEY)   
             return res.render('dashboard', {
                massage: 'logged in successfully',
                user:result[0],
                token
            })
            //    return res.status(200).send({
            //     msg:"logged in successfully",
            //     user:result[0],
            //     token
            //  })
        
          })
    })

}

    // console.log(req.body);
    // const { email} = req.body;
    // db.query('SELECT email FROM users WHERE email = ?', [email,password], async (error, match) => {
    // if (match.length==0){ 
    //             return res.render('login', {
    //                 massage: 'email does not matched'
    //             })
    //         }
    //         if(match.length>0){
    //             const password = req.body.password;
    
    //             db.query('SELECT * FROM `users` WHERE password = ?', [password], async (error ,results) => {
    //                 bcrypt.compare(password, results).then((logpass) => {
    //                     if (logpass.length>0) {
    //                         return res.render('login', {
    //                             massage: 'logged in successfully'
    //                         })
                
    //                     }
    //                     else {
    //                         return res.render('login', {
    //                             massage: 'passowrd wrong'
                
    //                         })
    //                     }
    //                 })
                
    //             })

    //         }
            
    //     })
        
        







    // if(!user){
    //     return res.render('login',{
    //         massage: 'this user does not exist',
    //     })
    // }
    // else{
    //     return res.render('login',{
    //         massage: 'logged in',
    //     })
    // }
