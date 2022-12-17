const Group = require('../models/group')
const Chat = require('../models/chat')
const User = require('../models/user')

exports.fetchUsers = async(req,res,next) => {
    try {
        let groupId = req.params.groupId;
        console.log(groupId)

        const group = await Group.findByPk(groupId)

        if(!group){
            return res.status(400).json({message:'No group found'})
        }

        let users = await group.getUsers()
        let data = users.filter(user => user.id != req.user.id)

        return res.status(data)
    } catch (error) {
        console.log(error)
    }
}