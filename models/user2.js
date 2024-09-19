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
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    photoUrl: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model('User2', UserSchema2);

