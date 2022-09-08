const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv');

module.exports = {

    registerUser: async (req, res) => {
        // try{
        //     const user = await User.create(req.body)
        //     const newUser = await user.save()
        //     const userToken = jwt.sign({_id: newUser._id, email: newUser.email}, process.env.SECRET_KEY)
        //     res.status(201).cookie('userToken', userToken,{
        //         httpOnly: true
        //     }).json({msg: 'sucess message'})
        // }catch(err){
        //    res.status(400).json(err)
        // }
        try{
            const newUser = await User.create(req.body);
            res.json(newUser)
        }catch(err){
            res.status(400).json(error)
        }
    },
    

    login: async (req, res) => {
        try{
            const user = await User.findOne({email: req.body.email})
            if (user === null){
                return res.sendStatus(400)
            }
            const correctPassword = await bcrypt.compare(req.body.password, user.password)
            if(!correctPassword){
                return res.sendStatus(400)
            }
            const userToken = jwt.sign({_id: user._id}, process.env.SECRET_KEY)
            res
                .cookie('userToken', userToken, secret, {
                    httpOnly: true
                })
                .json({msg:'Success'})
        }
        catch(err){
            console.log(err)
        }
    },

    logout: (req, res) => {
        res.clearCookie('userToken');
        res.sendStatus(200);
    },

    getUser: (req, res)=> {
        const user = jwt.verify(req.cookie.userToken, SECRET_KEY)
        User.findOne({_id: user._id})
        .then((user)=> {
            res.json(user)
        })
        .catch((err)=> {
            console.log(err)
        })
    }
    
}

