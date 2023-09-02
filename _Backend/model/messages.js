const mongoose = require('mongoose');
const { peoples } = require('./peoples');
const {Schema} = mongoose;

const mongooseSchema = new Schema(
    {
        message: {
            text: {
                type: String,
                required: true
            },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: peoples,
            require: true
        },
    },
    {
        timestamps: true
    }
)

exports.messages = mongoose.model("messages", mongooseSchema);