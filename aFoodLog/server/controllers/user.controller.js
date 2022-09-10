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
                res.status(400).json({errors: {
                    message: 'Email already exists!'
                }
            });
                return;
            }
        }catch(err){
            res.status(400).json(err)
        }

        let newUser = new User(req.body)
        
        try{
            const newUserObject = await newUser.save();
            console.log('newuserobject', newUserObject)
            res.json(newUserObject)
        }catch(error){
            res.status(400).json(error)
        }
    },
    

    login: async (req, res) => {

        
        if (!req.body.email){
            res.status(400).json({error: 'No email provided, please provide'})
            return;
        }

        let userQuery;
        
        try{
            
            userQuery = await User.findOne({email: req.body.email})
            console.log('reqbody', req.body)
            console.log('userQuery', userQuery)
            console.log('userQuery id from login', userQuery._id)
            if (userQuery === null){
                res.status(400).json({error: 'email not found'});
                return;
            }
            const correctPassword = bcrypt.compareSync(req.body.password, userQuery.password)
            if(!correctPassword){
                res.status(400).json({error: 'email and password do not match'});
                return;
            }
            const userToken = jwt.sign({_id: userQuery._id}, process.env.SECRET_KEY);
            res.cookie('userToken', userToken, process.env.SECRET_KEY, {
                httpOnly: true,
                expires: new Date(Date.now() + 900000000)
            }).json({msg: 'successful login'})
        }
        catch(err){
            res.status(400).json({error: 'email not found'})
        }

        console.log('userquery', userQuery)
        //send user jwt if user exists and password matches
        //SAME COOKIE BEING SENT TO DIFF USERS
        // res
        //     .cookie('userToken', userToken, secret, {
        //         httpOnly: true
        //     })
        //     .json({msg:'Success'})
    },
    
    logout: (req, res) => {
        res.clearCookie('userToken', {
            sameSite: 'none',
            secure: true
        });
        res.json({msg: 'logout successful'});
    },

    getUser: (req, res)=> {
        const user = jwt.verify(req.cookie.userToken, SECRET_KEY)
        User.findOne({_id: user._id})
        .then((user)=> {
            res.json(user)
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    
}

