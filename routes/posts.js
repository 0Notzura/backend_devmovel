// routes/posts.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');
const User = require('../models/user');

const router = express.Router();

// Middleware de verificação de login
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, 'yourSecretKey');
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Create post
router.post('/', auth, async (req, res) => {
    const { contact, url, title, description } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const newPost = new Post({
            user: user.id,
            contact,
            url,
            title,
            description,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get  posts 
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({ });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get posts user
router.get('/user', auth, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/search', async (req, res) => {
    const { title } = req.query;
    try {
        const posts = await Post.find({ title: { $regex: title, $options: 'i' } });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;
