const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: { 
        type: String,
        required: true
    },
    lastName: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true
    }, 
    gender: {
        type: String,
        required: true
    }

    // goal: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Goal',
    //     required: true
    // }
    
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

userSchema.set('toJSON', {
    virtuals: true
});

exports.User = mongoose.model('User', userSchema); 
exports.userSchema = userSchema;