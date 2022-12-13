const Message = require('../models/nessage')

exports.createMessage = async (req,res,next) => {
    const message = req.body.chats;

    console.log(message)

    try {
        const messageCreated = await Message.create({
            message: message,
            userId: req.user.id
        })
        res.status(201).json({success:true, data: messageCreated})
        
    } catch (error) {
        res.status(500).json({message:"failed"})
    }
}