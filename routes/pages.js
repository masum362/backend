const express = require('express');

const Router = express.Router();

Router.get('/', (req, res) => {
    res.render("register");

});

Router.get('/login', (req, res) => {
    res.render("login");

});
Router.get('/dashboard', (req, res) => {
    res.render("dashboard");

});
module.exports = Router;