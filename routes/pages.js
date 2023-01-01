const express = require('express');
const db = require('../database/connection');
const auth = require('./secret-route');

const Router = express.Router();

  

Router.get('/', (req, res) => {
    res.render("register");

});

Router.get('/login',(req, res) => {
    res.render("login");

});
Router.get('/dashboard',auth, (req, res) => {
    const qry = 'SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) AS total_withdraw , SUM(deposit)-SUM(withdraw) AS total_amount FROM money'
    db.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
         return res.render('dashboard',{
            data: results

        })
    }

    })
    
});

  Router.get('/deposit',auth,(req, res) => {

    const qry = 'SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) AS total_withdraw , SUM(deposit)-SUM(withdraw) AS total_amount FROM money'
    db.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
         return res.render('deposit',{
            data: results

        })
    }

    })

});
Router.get('/withdraw',auth, (req, res) => {
    const qry = 'SELECT deposit,withdraw,SUM(deposit) AS total_deposit , SUM(withdraw) AS total_withdraw , SUM(deposit)-SUM(withdraw) AS total_amount FROM money'
    db.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
         return res.render('withdraw',{
            data: results

        })
    }

    })

});

Router.get('/transection_history',auth,(req, res) => {

    const qry = 'SELECT id,deposit,withdraw FROM money'
    db.query(qry, (err, results) => {
        if(err){
          return console.log(err);
        }
        else{
         return res.render('transection_history',{
            data: results

        })
    }

    })
    
})
Router.get('/contact',auth,(req, res) => {
    res.render("contact");
})
Router.get('/account',auth,(req, res) => {
    res.render("account");
})
Router.get('/logout',auth, (req, res) => {
    req.session.destroy(error => {
      if (error) throw error
      res.redirect('/login')
    })
  })
module.exports = Router;