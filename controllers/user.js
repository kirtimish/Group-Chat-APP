const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.Signup = async (req,res,next) => {
    const { username,email,phoneNumber,password } = req.body;

    try {
        const userExist = await User.findAll({where: {email}})
        
        if(userExist > 0){
            res.status(207).json({ message: 'User already exist' })
        } else {
            bcrypt.hash(password,10,async(err,hash) => {
                const userDetails = await User.create({
                    username: username,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: hash
                })
                res.status(201).json({ message: 'User created successfully' , userDetails})
            })
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }
}