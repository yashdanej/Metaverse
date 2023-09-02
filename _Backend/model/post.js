const mongoose = require('mongoose');
const { peoples } = require('./peoples')
const { Schema } = mongoose;

const postSchema = new Schema({
    people: {
        type: mongoose.Schema.ObjectId,
        ref: peoples
    },
    post: {
        type: String
    },
    caption: {
        type: String,
        default: ''
    },
    likes: {
        type: [ String ],
        default: []
    },
    location: {
        type: String,
        default: ''
    },
    comments: [{
        getPeople: {
            type: mongoose.Schema.ObjectId,
            ref: peoples
        },
        comment: {
            type: String
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        createdAt: { type: Date, default: () => Date.now() }
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date }
})

postSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

exports.posts = mongoose.model('posts', postSchema)