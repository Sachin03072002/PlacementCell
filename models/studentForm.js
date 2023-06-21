const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
        enum: ["Placed", "Not-Placed"],
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
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    interviews: [
        {
            company: {
                type: String,
                required: true
            },
            date: {
                type: Date, // Change the type to Date for storing the interview date
                required: true
            },
            result: {
                type: String,
                enum: ["PASS", "FAIL", "Didn't Attempt", "On Hold"]
            }
        }
    ]
}, {
    timestamps: true
});
// Register the Student model
mongoose.model('Student', StudentSchema);

// Now you can use the Student model
const Student = mongoose.model('Student');
module.exports = Student;