const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv');

module.exports = {

    registerUser: async (req, res) => {
        //make sure email is not registered already
        try{
            const verifyUser = await User.findOne({email: req.body.email});
            if (verifyUser){
                res.status(400).json({errMessage: 'Email already exists'});
                return;
            }
        }catch(err){
            res.status(400).json(err)
        }

        let newUser = new User(req.body)

        try{
            const newUserObject = await newUser.save();
            res.json(newUserObject)
        }catch(err){
            res.status(400).json(err)
        }
    },
    

    login: async (req, res) => {
        if (!req.body.email){
            res.status(400).json({err: 'No email provided, please provide'})
            return;
        }

        let userQuery;

        try{
            userQuery = await User.findOne({email: req.body.email})
            if (userQuery === null){
                res.status(400).json({msg: 'email not found'});
                return;
            }
        }
        catch(err){
            res.status(400).json({msg: 'email not found'})
        }


        const correctPassword = await bcrypt.compare(req.body.password, userQuery.password)
        if(!correctPassword){
            res.status(400).json({error: 'email and password do not match'});
            return;
        }
        //send user jwt if user exists and password matches
        const userToken = jwt.sign({_id: userQuery._id}, process.env.SECRET_KEY);
        res.cookie('userToken', userToken, process.env.SECRET_KEY, {
            httpOnly: true,
            expires: new Date(Date.now() + 900000000)
        }).json({msg: 'successful login'});
        // res
        //     .cookie('userToken', userToken, secret, {
        //         httpOnly: true
        //     })
        //     .json({msg:'Success'})
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

