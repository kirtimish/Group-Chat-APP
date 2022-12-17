const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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

function generateAccessToken(id) {
    return jwt.sign({userId: id},'sectoauchapp')
}

exports.login = async(req,res,next) => {
    const { email, password } = req.body;

    try {
        const userExist = await User.findAll({ where: {email}})

        if(userExist.length > 0){
            bcrypt.compare(password,userExist[0].password,(err,result) => {
                if(result == true){
                    return res.status(201).json({ success: 'User logged in successfully', token: generateAccessToken(userExist[0].id),  name:userExist.username})
                } else {
                    return res.status(401).json({ errorMessage: 'You entered wrong password', err: err})
                }
            })
        } else {
            res.status(404).json({ error: 'User not found'})
        }
    } catch (error) {
        
    }
}