const express = require('express');
const userAuthentication = require('../middleware/auth')
const chatControllers = require('../controllers/chat')
const router = express.Router();

router.post('/allMsg/:groupId', userAuthentication.authenticate, chatControllers.createMessage)
router.get('/getMsg/:groupId', userAuthentication.authenticate, chatControllers.getMessage)

module.exports = router;