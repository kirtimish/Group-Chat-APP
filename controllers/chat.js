const Chat = require('../models/chat')
const User = require('../models/user')

exports.createMessage = async (req,res,next) => {
    const message = req.body.chats;
    const groupId = req.params.groupId;
    console.log(message)

    try {
        if(!message || !groupId){
            return res.status(201).json({ message: 'nothing entered'})
        } else {
            const data = await req.user.createChat({message, groupId})
            const name = req.user.username;

            const arr = [];
            const details = {
                id: data.id,
                groupId: data.groupId,
                name: req.user.username,
                message: data.message,
                createdAt: data.createdAt
            }

            arr.push(details);
            res.status(201).json({arr, message: 'successfully created message'})
        }

        
    } catch (error) {
        res.status(500).json({message:"failed"})
    }
}

exports.getMessage = async (req,res,next) => {
    let msgId = req.query.msg;
    let groupId = req.params.groupId;

    try {
        
        const data = await Chat.findAll({ where:{groupId}})

        console.log(data.length)

        let index = data.findIndex(chat => chat.id == msgId)

        let messageTobeSend = data.slice(index+1)

        let arr = [];

        for(let i=0;i<messageTobeSend.length;i++){
            const user = await User.findByPk(messageTobeSend[i].userId)
            
            const details = {
                id: messageTobeSend[i].id,
                groupId: messageTobeSend[i].groupId,
                name: user.username,
                message: messageTobeSend[i].message,
                createdAt: messageTobeSend[i].createdAt
            }
            arr.push(details);

        }
        
        res.status(201).json({arr});
        
    } catch (error) {
        res.status(500).json({message:"failed"})
    }
}