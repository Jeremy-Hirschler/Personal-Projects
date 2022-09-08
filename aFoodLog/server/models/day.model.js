const mongoose = require('mongoose');



const dailyLogSchema = new mongoose.Schema({
    // foods: [{
    //     type: Array,
    //     validate: {
    //         validator: function(v) {return v.length > 1}
    //     }
    
    // }]
    foods: {
        type: Array,
        // validate: v=> v.length > 0,
        validate: {
            validator: function(v) {
                return v.length > 0
            },
            message: 'At least one entry is required!'
        }
        
    }
        
        
    ,
    totalCalories: {
        type: Number
    },

    newDate: {
        type: Date,
        required: [true, 'Date is required']
    }




}, {timestamps: true});


module.exports = mongoose.model('DailyLog', dailyLogSchema);