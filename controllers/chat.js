const Chat = require('../models/chat')
const User = require('../models/user')

exports.createMessage = async (req,res,next) => {
    const message = req.body.chats;

    console.log(message)

    try {
        const messageCreated = await Chat.create({
            message: message,
            userId: req.user.id
        })
        console.log(messageCreated)
        res.status(201).json({success:true})
        
    } catch (error) {
        res.status(500).json({message:"failed"})
    }
}

exports.getMessage = async (req,res,next) => {
    let msgId = req.query.msg;
    try {
        
        const data = await req.user.getChats();
        console.log(data.length)

        let index = data.findIndex(Chat => Chat.id == msgId)

        let messageTobeSend = data.slice(index+1)

        let username = await req.user.username;
        
        res.status(201).json({success:true, messageTobeSend,username})
        
    } catch (error) {
        res.status(500).json({message:"failed"})
    }
}