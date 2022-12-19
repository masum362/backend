const express = require('express');
const authController =  require('../controllers/auth'); 
const Router = express.Router();
const auth = require('./secret-route');

Router.get('/', (req, res) => {
    res.render("register");

});
Router.post('/register',authController.register);
Router.post('/login',authController.login);
// Router.get('/secret-route',auth, (req, res, next) => {
//     console.log(req.id);
//     res.redirect('This is the secret content. Only logged in users can see this!');
//   });
module.exports = Router;