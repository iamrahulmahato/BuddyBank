const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller')


// users/sign-up
router.get('/sign-up', userController.showSignUpForm);

module.exports = router;