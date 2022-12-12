const express = require('express');
const userControllers = require('../controllers/user')
const router = express.Router();

router.post('/signup', userControllers.Signup)

module.exports = router;