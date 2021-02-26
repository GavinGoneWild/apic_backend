const mongoose = require("mongoose");

const goalSchema = mongoose.Schema({
    title: { 
        type: String,
        required: true
    }, 
    description: {
        type: String
    },
    deadline: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now()
    }
    
})

exports.Goal = mongoose.model('Goal', goalSchema); 