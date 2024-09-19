// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user2');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { ra, password, name, email, phoneNumber, photoUrl } = req.body;
    try {
        let user = await User.findOne({ ra });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ ra, password, name, email, phoneNumber, photoUrl });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ ...user._doc, token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { ra, password } = req.body;
    try {
        let user = await User.findOne({ ra });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ ...user._doc, token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
