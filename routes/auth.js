const express = require('express');
const authController =  require('../controllers/auth'); 
const Router = express.Router();

Router.get('/', (req, res) => {
    res.render("register");

});

Router.post('/register',authController.register);
module.exports = Router;