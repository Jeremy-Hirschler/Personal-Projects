const Log = require('../models/day.model');
const jwt = require('jsonwebtoken');
require('dotenv');

module.exports = {
    // findDay: (req, res) => {
    //     Log.findOne({_id: req.params.id})
    //     .then((day) => {
    //         res.json(day)
    //     })
    //     .catch((err)=> {
    //         console.log('Could not find one', err)
    //     })
    // },

    findDay: async (req, res) => {
        try{
            const day = await Log.findOne({_id: req.params.id});
            return res.json(day);
        }
        catch(err){
            console.log('Could not find one', err);
        }
    },

    findAll: async (req, res) => {
        try{
            const allDays = await Log.find({});
            return res.json(allDays);
        }
        catch(err){
            console.log('Could not find all', err);
        }
    },

    updateDay: async (req, res) => {
        try{
            const updatedDay = await Log.findOneAndUpdate({_id: req.params.id}, req.body, {
                new:true,
                runValidators: true
            });
            return res.json(updatedDay);
        }
        catch(err){
            console.log('Could not update', err);
        }
    },

    createDay: async (req, res) => {
        let newDay = new Log(req.body);
        console.log(newDay)
        console.log('afternewday')
        // let decodedjwt;
        
        // try{
        //     decodedjwt = await jwt.verify(req.cookies.userToken, process.env.SECRET_KEY)
        //     console.log('decoded', decodedjwt)
            
        //     console.log('success', req.cookies.userToken)
        //     req.body.user_id = decodedjwt._id;//CHECK if user_id is correct
            
        // }catch(err){
        //     console.log('Token error')
            
        //     res.status(400).json({errorMsg: 'You must be logged in'})
        //     return;
        // }

        console.log('reqbody', req.body)
        try{
            newDay = await newDay.save();
            res.json(newDay);
            return;
        }
        catch(err){
            res.status(401).json(err)
            console.log('Could not create day', err);
            return;
        }
    },
    

    deleteDay: async (req, res) => {
        try{
            const deleted = await Log.deleteOne({_id: req.params.id});
            return res.json(deleted);
        }
        catch(err){
            console.log('Could not delete', err);
        }
    }



}