const express = require('express')
const router = express.Router()
const groupControllers = require('../controllers/group')
const userGroupControllers = require('../controllers/userGroup')
const userAuthentication = require('../middleware/auth')

router.get('/getGroups', userAuthentication.authenticate, groupControllers.getGroups)
router.post('/createGroup', userAuthentication.authenticate, groupControllers.createGroup)
router.get('/fetchUsers/:groupId',userAuthentication.authenticate,userGroupControllers.fetchUsers)
module.exports = router;