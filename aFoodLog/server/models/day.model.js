const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
    foods: {
        type: Array,
        required: [true, 'Food name is required']
    },


    total: {
        type: Number
    },


}, {timestamps: true});

module.exports = mongoose.model('DailyLog', dailyLogSchema);