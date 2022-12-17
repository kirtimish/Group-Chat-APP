const express = require('express');
const userControllers = require('../controllers/user')
const userAuthentication = require('../middleware/auth')
const chatControllers = require('../controllers/chat')
const router = express.Router();

router.post('/signup', userControllers.Signup)
router.post('/login', userControllers.login)

// router.post('/chatNow', userAuthentication.authenticate, chatControllers.createMessage)
// router.get('/getChats', userAuthentication.authenticate, chatControllers.getMessage)

module.exports = router;