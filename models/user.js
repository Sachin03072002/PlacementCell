const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


// validate the password with passed on user password
userSchema.methods.isValidatePassword = async function (userSentPassword) {
    return this.password === userSentPassword;
};

const User = mongoose.model('User', userSchema);
module.exports = User;