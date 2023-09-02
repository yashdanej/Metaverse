const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router
    .post('/signup', userController.SignUp)
    .post('/login', userController.LogIn)

exports.router = router;