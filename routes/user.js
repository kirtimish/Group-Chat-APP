const express = require('express');
const userControllers = require('../controllers/user')
const userAuthentication = require('../middleware/auth')
const messageControllers = require('../controllers/message')
const router = express.Router();

router.post('/signup', userControllers.Signup)
router.post('/login', userControllers.login)

router.post('/chatNow', userAuthentication.authenticate, messageControllers.createMessage)
router.get('/getChats', userAuthentication.authenticate, messageControllers.getMessage)

module.exports = router;