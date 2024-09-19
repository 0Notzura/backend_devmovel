// models/user.js
const mongoose = require('mongoose');

const UserSchema2 = new mongoose.Schema({
    ra: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User2', UserSchema2);

