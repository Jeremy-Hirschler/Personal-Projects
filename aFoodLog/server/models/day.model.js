const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
    foods: {
        type: Array,
        required: [true, 'Food name is required'],
        
        
    },
    totalCalories: {
        type: Number
    },
    
    newDate: {
        type: Date,
        required: [true, 'Date is required']
    }




}, {timestamps: true});

module.exports = mongoose.model('DailyLog', dailyLogSchema);