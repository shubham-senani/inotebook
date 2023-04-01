const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;