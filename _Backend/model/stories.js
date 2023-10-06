const mongoose = require('mongoose');
const { Schema } = mongoose;

const storySchema = new Schema({
    people: {
        type: mongoose.Schema.ObjectId,
        ref: 'peoples'
    },
    story: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    seen: {
        type: [mongoose.Schema.ObjectId],
        ref: 'peoples',
        default: []
    }
},
{
    timestamps: true
}
);

exports.stories = mongoose.model("stories", storySchema);