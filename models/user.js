// models/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    ra: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', UserSchema);

