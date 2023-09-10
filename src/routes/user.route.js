const userRoute = require('express').Router();
const user = require('../models/user.model.js');

userRoute.post('/registration', user.registration);
userRoute.post('/login', user.login);

module.exports = userRoute;
