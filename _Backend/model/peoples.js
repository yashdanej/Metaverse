const mongoose = require('mongoose');
var fs = require('fs');
const path = require('path');
const { users } = require('./users');
const {Schema} = mongoose;


const peopleSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: users
    },
    username: {
        type: String
    },
    bio: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    profilePic: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    follower: {
        type: [mongoose.Schema.ObjectId],
        ref: 'peoples',
        default: []
    },
    following: {
        type: [mongoose.Schema.ObjectId],
        ref: 'peoples',
        default: []
    },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date }
});

peopleSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

exports.peoples = mongoose.model("peoples", peopleSchema);