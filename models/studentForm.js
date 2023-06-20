const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        requried: true
    },
    college: {
        type: String,
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dsaScore: {
        type: Number,
        required: true
    },
    webdevScore: {
        type: Number,
        required: true
    },
    reactScore: {
        type: Number,
        requried: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;