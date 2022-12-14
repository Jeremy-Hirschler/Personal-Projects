const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        validate: {
            //use regex to validate email address
            validator: function(val){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val);
            },
            message: "Please enter a valid email"
        }
    },

    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [5, 'Password must be at least 5 characters!']
    }
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword )
    .set((value) => (this._confirmPassword = value ));

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match');
    }
    next();
});

UserSchema.pre('validate', function(next) {
    bcrypt.hash(this.password, 10)
        .then((hash) => {
        this.password = hash;
        next();
        })
        .catch((err)=> {
            console.log(err)
        });
});

module.exports = mongoose.model('User', UserSchema);