const Log = require('../models/day.model');

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
        try{
            const newDay = await Log.create(req.body);
            return res.json(newDay);
        }
        catch(err){
            console.log('Could not create day', err);
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