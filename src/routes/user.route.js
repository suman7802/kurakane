const userRoute = require('express').Router();
const authenticate = require('../models/user.model.js');

userRoute.post('/login', authenticate);

module.exports = userRoute;
