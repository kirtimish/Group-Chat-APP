const Message = require('../models/nessage')
const User = require('../models/user')

exports.createMessage = async (req,res,next) => {
    const message = req.body.chats;

    console.log(message)

    try {
        const messageCreated = await Message.create({
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
    try {
        const message = await Message.findAll({ include : [ {model: User, required: false} ]})
        res.status(201).json({success:true, data: message})
        
    } catch (error) {
        res.status(500).json({message:"failed"})
    }
}