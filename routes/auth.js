const express = require('express');
const authController =  require('../controllers/auth'); 
const con = require('../database/connection')
const Router = express.Router();
const auth = require('./secret-route');

Router.post('/register',authController.register);
Router.post('/login',authController.login);
Router.post('/deposit_amount',authController.deposit);

Router.post('/withdraw_amount',authController.withdraw);
Router.post('/contact-form_submit',authController.contact);

module.exports = Router;