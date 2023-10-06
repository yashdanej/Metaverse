const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return emailRegex.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Password must be at least 6 characters long'],
    },

});

userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

exports.users = mongoose.model("users", userSchema);
